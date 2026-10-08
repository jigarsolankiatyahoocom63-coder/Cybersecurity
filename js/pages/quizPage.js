import { quizQuestions, awarenessCategories } from '../config/constants.js';
import { createQuizAttempt } from '../entities/QuizAttempt.js';
import { dataService } from '../services/dataService.js';
import { mapToAwarenessCategory } from '../utils/helpers.js';

export function initQuizPage() {
  const form = document.querySelector('[data-quiz-form]');
  const results = document.querySelector('[data-quiz-results]');
  const prePostToggle = document.querySelector('[data-assessment-mode]');

  if (!form) return;

  const questions = quizQuestions.map((question, index) => {
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    const optionsHtml = question.options.map((option, optionIndex) => `
      <label class="answer-option">
        <input type="radio" name="q-${index}" value="${optionIndex}" required>
        <span>${option}</span>
      </label>
    `).join('');

    questionEl.innerHTML = `
      <h3>${index + 1}. ${question.question}</h3>
      <div class="answer-list">${optionsHtml}</div>
      <p class="error-message"></p>
    `;
    return questionEl;
  });

  form.prepend(...questions);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    let score = 0;
    let answered = 0;
    const answerMap = [];

    quizQuestions.forEach((question, index) => {
      const selected = Number(formData.get(`q-${index}`));
      const isCorrect = selected === question.answer;
      if (selected !== null && selected !== undefined && selected !== '') {
        answered += 1;
      }
      if (isCorrect) score += 1;
      answerMap.push({
        questionId: question.id,
        selected,
        correct: question.answer,
        isCorrect,
        explanation: question.explanation,
      });
    });

    let percentage = answered ? (score / answered) * 100 : 0;
    if (answered < quizQuestions.length) {
      percentage = (score / quizQuestions.length) * 100;
    }

    const category = mapToAwarenessCategory(Math.round(percentage));
    const attempt = createQuizAttempt({
      userId: dataService.getCurrentUserId(),
      score,
      totalQuestions: quizQuestions.length,
      answers: answerMap,
      mode: prePostToggle ? prePostToggle.value : 'standard',
    });

    attempt.awarenessCategory = category;
    dataService.addQuizAttempt(attempt);

    const categoryMarkup = awarenessCategories.map((item) => `
      <div class="row-line">
        <span>${item.label}</span>
        <strong>${item.min}% - ${item.max}%</strong>
      </div>
    `).join('');

    const feedback = quizQuestions.map((question, index) => {
      const selected = answerMap[index].selected;
      const correct = question.answer;
      const correctText = question.options[correct];
      const selectedText = selected !== undefined && selected !== null && selected !== '' ? question.options[selected] : 'No answer';
      return `
        <div class="card">
          <h4>${index + 1}. ${question.question}</h4>
          <p><strong>Your answer:</strong> ${selectedText}</p>
          <p><strong>Correct answer:</strong> ${correctText}</p>
          <p>${question.explanation}</p>
        </div>
      `;
    }).join('');

    results.innerHTML = `
      <div class="quiz-card">
        <h2>Quiz result</h2>
        <p>You scored <strong>${score}/${quizQuestions.length}</strong> and your awareness level is <strong>${category}</strong>.</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.round(percentage)}%"></div></div>
        <div class="table-like">${categoryMarkup}</div>
        <h3>Question-by-question feedback</h3>
        ${feedback}
        <button type="button" class="primary-btn focus-ring" data-retake>Retake the quiz</button>
      </div>
    `;

    const retakeButton = results.querySelector('[data-retake]');
    retakeButton?.addEventListener('click', () => {
      form.reset();
      results.innerHTML = '';
    });
  });
}
