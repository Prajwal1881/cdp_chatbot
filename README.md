# SupportAgent-Chatbot

# CDP Knowledge Assistant

A chatbot application that answers "how-to" questions related to four major Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap.

![CDP Knowledge Assistant Screenshot](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)

## Live Demo

Check out the live demo: [CDP Knowledge Assistant](https://superlative-biscochitos-213d47.netlify.app)

## Features

- **Answer "How-to" Questions**: Provides step-by-step instructions for performing tasks in each CDP
- **Platform-Specific Knowledge**: Contains documentation from Segment, mParticle, Lytics, and Zeotap
- **Cross-CDP Comparisons**: Can compare features and approaches between different CDPs
- **Advanced Question Handling**: Supports complex queries about advanced configurations and integrations
- **Responsive UI**: Works on desktop and mobile devices

## Example Questions

- "How do I set up a new source in Segment?"
- "How can I create a user profile in mParticle?"
- "How do I build an audience segment in Lytics?"
- "How can I integrate my data with Zeotap?"
- "How does Segment's audience creation process compare to Lytics'?"
- "What's the difference between mParticle and Zeotap for identity resolution?"

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/cdp-knowledge-assistant.git
   cd cdp-knowledge-assistant
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
cdp-knowledge-assistant/
├── public/
│   └── vite.svg
├── src/
│   ├── services/
│   │   └── cdpService.ts    # CDP data and question processing logic
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # TypeScript declarations
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## How It Works

1. The application simulates a knowledge base containing documentation from four major CDPs
2. When a user asks a question, the system:
   - Analyzes the question to identify the relevant CDP and feature
   - Extracts the appropriate information from the simulated documentation
   - Formats and returns a helpful response
3. The system can handle various types of questions including:
   - Basic how-to questions
   - Comparison questions between CDPs
   - Advanced implementation questions
   - Edge cases and irrelevant questions

## Deployment

The application is deployed on Netlify. To deploy your own version:

1. Build the application
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service

## Future Enhancements

- Integration with actual CDP documentation APIs
- User authentication for personalized responses
- History tracking of previous questions
- Feedback mechanism to improve responses
- Support for additional CDPs

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Documentation sources:
  - [Segment Documentation](https://segment.com/docs/?ref=nav)
  - [mParticle Documentation](https://docs.mparticle.com/)
  - [Lytics Documentation](https://docs.lytics.com/)
  - [Zeotap Documentation](https://docs.zeotap.com/home/en-us/)
