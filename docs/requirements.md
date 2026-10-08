# CyberSafe Requirements and Risk Analysis

## Overview
CyberSafe is a browser-first community awareness project designed for everyday internet users. It combines educational content, learning activities, interactive tools, and anonymous data collection in a single static application.

## Risks addressed
The campaign explicitly addresses the following user risks:

- Weak or reused passwords
- Lack of two-factor authentication (2FA)
- Excessive sharing of personal information
- Phishing links and fake messages
- Fraudulent messages and scam requests
- Suspicious downloads and malware behaviour
- Online scams and social engineering
- Unsafe payment practices and insecure digital transactions

## Core requirements from the project brief
1. Build a static HTML/CSS/JavaScript-only website with no external dependencies.
2. Provide all 16 educational and interactive modules in separate pages.
3. Keep the site guest-friendly, with no forced login requirement.
4. Use localStorage with a single data-service module as the persistence boundary.
5. Include a responsive shared header, footer, and navigation injected via JavaScript.
6. Support quiz attempts, password strength analysis, personal-data checklist, and optional account management.
7. Track anonymous visitor activity and module engagement without exposing private data.
8. Provide aggregated statistics with charts and anonymised export/import for facilitators.
9. Ensure strong privacy rules, safe input handling, and sanitisation.
10. Support a facilitator-led awareness workflow with pre/post assessment and printable resources.

## Assumptions
- Browser-only storage is acceptable for demo and local education use.
- The project is designed as a static site for classroom use, community outreach, and local event facilitation.
- The optional sign-up system is demo-level and not intended to be production secure against a real attacker.

## Acceptance checklist
- The site can be opened from the filesystem or served by a simple static server.
- The slogan “Think Before You Click. Protect Before You Share.” is visible on the homepage and footer.
- All required modules are reachable and cover the four awareness areas.
- Guest users can access all quiz, tools, campaigns, and statistics without login.
- Aggregated public statistics remain anonymous and do not expose personal data.
- Sensitive data such as passwords and private answers remain stored only in local browser storage and never shown in public views.
