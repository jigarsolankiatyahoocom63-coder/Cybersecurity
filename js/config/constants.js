export const APP_NAME = 'CyberSafe';
export const SLOGAN = 'Think Before You Click. Protect Before You Share.';

export const awarenessThresholds = {
  beginner: 0,
  aware: 60,
  champion: 80,
};

export const awarenessCategories = [
  { key: 'beginner', label: 'Beginner Awareness', min: 0, max: 39 },
  { key: 'needs-improvement', label: 'Needs Improvement', min: 40, max: 59 },
  { key: 'moderately-aware', label: 'Moderately Aware', min: 60, max: 79 },
  { key: 'highly-aware', label: 'Highly Aware', min: 80, max: 100 },
];

export const moduleCatalog = [
  { id: 'intro-password-hygiene', title: 'Introduction to Password Hygiene', area: 'Password Hygiene', page: 'pages/introduction-to-password-hygiene.html' },
  { id: 'creating-strong-passwords', title: 'Creating Strong Passwords', area: 'Password Hygiene', page: 'pages/creating-strong-passwords.html' },
  { id: 'password-management', title: 'Password Management', area: 'Password Hygiene', page: 'pages/password-management.html' },
  { id: 'two-factor-authentication', title: 'Two-Factor Authentication (2FA)', area: 'Password Hygiene', page: 'pages/two-factor-authentication.html' },
  { id: 'personal-data-protection', title: 'Personal Data Protection', area: 'Personal Data Protection', page: 'pages/personal-data-protection.html' },
  { id: 'online-privacy', title: 'Online Privacy', area: 'Personal Data Protection', page: 'pages/online-privacy.html' },
  { id: 'social-media-safety', title: 'Social Media Safety', area: 'Personal Data Protection', page: 'pages/social-media-safety.html' },
  { id: 'safe-online-transactions', title: 'Safe Online Transactions', area: 'Online Threats', page: 'pages/safe-online-transactions.html' },
  { id: 'phishing-social-engineering', title: 'Phishing and Social Engineering', area: 'Online Threats', page: 'pages/phishing-and-social-engineering.html' },
  { id: 'malware-downloads', title: 'Malware and Suspicious Downloads', area: 'Online Threats', page: 'pages/malware-and-suspicious-downloads.html' },
  { id: 'common-cyber-scams', title: 'Common Cyber Scams', area: 'Online Threats', page: 'pages/common-cyber-scams.html' },
  { id: 'compromise-response', title: 'Responding to Account or Data Compromise', area: 'Online Threats', page: 'pages/compromise-response.html' },
  { id: 'cybersecurity-quiz', title: 'Cyber Safety Quiz', area: 'Campaign & Awareness', page: 'pages/cybersecurity-quiz.html' },
  { id: 'password-strength-checker', title: 'Password Strength Checker', area: 'Password Hygiene', page: 'pages/password-strength-checker.html' },
  { id: 'data-protection-checklist', title: 'Personal Data Protection Checklist', area: 'Personal Data Protection', page: 'pages/data-protection-checklist.html' },
  { id: 'campaign-resources', title: 'Campaign Resources', area: 'Campaign & Awareness', page: 'pages/campaign-resources.html' },
];

export const navItems = [
  { label: 'Home', href: 'index.html', page: 'home' },
  { label: 'Learning', href: 'pages/learning.html', page: 'learning' },
  { label: 'Campaign', href: 'pages/campaign.html', page: 'campaign' },
  { label: 'Tools', href: 'pages/tools.html', page: 'tools' },
  { label: 'Statistics', href: 'pages/statistics.html', page: 'statistics' },
  { label: 'About', href: 'pages/about.html', page: 'about' },
];

export const quizQuestions = [
  {
    id: 'password-reuse',
    question: 'Why is reusing the same password across multiple accounts risky?',
    options: [
      'It makes password managers less useful',
      'If one account is compromised, attackers may try the same password elsewhere',
      'It prevents websites from logging you in',
      'It protects you from phishing'
    ],
    answer: 1,
    explanation: 'Password reuse means a single breach can unlock several accounts. Unique passwords reduce the blast radius.'
  },
  {
    id: 'mfa',
    question: 'Which of these is the best reason to enable 2FA?',
    options: [
      'It blocks all viruses',
      'It adds a second verification step in case a password is stolen',
      'It eliminates the need for a password entirely',
      'It makes online shops accept your payment faster'
    ],
    answer: 1,
    explanation: 'Two-factor authentication adds a second proof of identity, making stolen passwords less useful.'
  },
  {
    id: 'phishing',
    question: 'What is the safest response to a message asking you to click a link and confirm a payment?',
    options: [
      'Click immediately because the message is urgent',
      'Open the official website yourself and verify the request',
      'Forward the message to everyone you know',
      'Reply with your password to confirm identity'
    ],
    answer: 1,
    explanation: 'Verification through an official channel is safer than acting on a link in an unexpected message.'
  },
  {
    id: 'personal-data',
    question: 'Which behaviour is most risky for personal data protection?',
    options: [
      'Using privacy settings on social media',
      'Sharing your home address in a public profile',
      'Keeping banking notifications enabled',
      'Reviewing app permissions regularly'
    ],
    answer: 1,
    explanation: 'Public personal details can be used for scams, stalking, or impersonation.'
  },
  {
    id: 'download',
    question: 'What should you do before downloading a file from an unfamiliar website?',
    options: [
      'Install it immediately to test it',
      'Check the source, review the file type, and scan it with trusted tools',
      'Share it with friends first',
      'Rename it to look more trusted'
    ],
    answer: 1,
    explanation: 'Unverified downloads can carry malware or trojans. Confirm the source and safer file handling.'
  },
  {
    id: 'safe-payment',
    question: 'Which payment habit is recommended?',
    options: [
      'Use public Wi-Fi to complete transactions faster',
      'Only pay through trusted, verified channels and secure connections',
      'Send OTP codes to anyone who asks',
      'Use one payment app for all purchases regardless of source'
    ],
    answer: 1,
    explanation: 'Safe transactions rely on trusted providers, secure links, and verification of payment requests.'
  },
  {
    id: 'social-media',
    question: 'What is a better way to protect your social media account?',
    options: [
      'Accept all follow requests without checking',
      'Use strong passwords, privacy settings, and be careful about recognizable personal details',
      'Post your full date of birth publicly for identity verification',
      'Ignore security alerts because they are often fake'
    ],
    answer: 1,
    explanation: 'Strong passwords and careful privacy settings reduce exposure while still allowing safe social engagement.'
  },
  {
    id: 'response',
    question: 'After noticing a suspicious account compromise, what is the best next step?',
    options: [
      'Ignore it if the account still works',
      'Immediately lock the account, change credentials, and check for other exposed services',
      'Tell everyone you know the account was hacked',
      'Delete the account without checking linked devices'
    ],
    answer: 1,
    explanation: 'A prompt response helps contain damage and prevent the compromise from spreading to linked systems.'
  }
];

export const defaultSettings = {
  demoDataSeeded: false,
};
