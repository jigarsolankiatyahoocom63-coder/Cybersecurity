# CyberSafe Design and System Plan

## Site map
- Home
- Learning modules
- Campaign page
- Interactive tools
- Statistics page
- About page
- Optional sign in / sign up
- Admin / facilitator view
- Quiz and assessment pages

## Shared components
- Header with brand, navigation, mobile menu, CTA, optional auth controls
- Footer with slogan and quick links
- Module cards and resource cards
- Section heading blocks
- Info callouts and key takeaways
- Tabs, accordions, and helper panels for interactive learning

## Layout approach
- Mobile-first design using CSS custom properties and semantic HTML
- Dense but readable content with accessible contrast
- Cards and panels for educational modules
- Strong visual distinction between module sections and campaign content

## Data model
- User
- QuizAttempt
- WebsiteVisit
- ModuleActivity
- CampaignPulse

## Browser storage architecture
- All persistence goes through a single dataService module.
- UI code consumes entities and service methods, never localStorage directly.
- Data can be exported/imported to combine anonymised data from multiple devices.

## Privacy model
- Public pages show aggregated, anonymised data only.
- Private user data is stored in the browser for optional authenticated accounts.
- Passwords are hashed in-browser using PBKDF2 before storage.
- Statistics exclude personal data, passwords, and individual answers.

## Development phases covered in this project
1. Requirements and risk analysis
2. Research and content planning
3. System and website planning
4. Website development
5. Feature development
6. Testing and debugging
7. Community engagement support
8. Data collection and analysis support
9. Evaluation support
10. Deployment and documentation
