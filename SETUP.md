# Dynamic Form Generator - Complete Setup Guide

## Overview
An AI-powered form generator that converts natural language descriptions into fully functional forms using Google Gemini AI.

## Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Google Gemini API key (free from https://ai.google.dev/)

### Step 1: Clone & Setup
```bash
git clone https://github.com/HimanshuKumar1527/dynamic-form-generator.git
cd dynamic-form-generator
npm create next-app@latest . --typescript --tailwind --skip-git
```

### Step 2: Install Dependencies
```bash
npm install google-generative-ai lucide-react
```

### Step 3: Create Environment File
Copy `.env.example` to `.env.local` and add your API key:
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_from_google
```

### Step 4: Create Project Files
Follow the file structure below and create all required files.

### Step 5: Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

## Project Structure
```
app/
├── page.tsx
├── layout.tsx
└── api/
    └── generate-form/
        └── route.ts
components/
├── DynamicForm.tsx
└── FormField.tsx
lib/
└── gemini.ts
types/
└── form.ts
```

## Required Files (Copy Full Code Below)

### 1. `types/form.ts`
Defines TypeScript interfaces for form fields and configuration.

### 2. `lib/gemini.ts`
Handles Gemini AI integration for converting natural language to JSON schema.

### 3. `app/api/generate-form/route.ts`
API endpoint that processes form generation requests.

### 4. `components/FormField.tsx`
Renders individual form fields based on type.

### 5. `components/DynamicForm.tsx`
Main form component that renders all fields dynamically.

### 6. `app/page.tsx`
Home page with form description input and examples.

## Deploy to Vercel

### Option 1: Direct GitHub Integration
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`
5. Deploy!

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

## Features
- Natural language form description
- AI-powered form generation
- Support for multiple field types: text, email, number, textarea, select, checkbox, radio, date
- Beautiful Tailwind CSS styling
- Real-time form preview
- Example prompts for quick testing

## Supported Field Types
- **text**: Single line text input
- **email**: Email validation
- **number**: Numeric input
- **textarea**: Multi-line text
- **select**: Dropdown menu
- **checkbox**: Boolean toggle
- **radio**: Single choice from options
- **date**: Date picker

## Example Prompts
1. "I need a registration form for a tech conference with Name, Email, Company, Job Title, and T-shirt size"
2. "Create a job application form with Name, Email, Phone, Resume description, Years of Experience, and Why you want this job"
3. "Customer feedback form with Name, Email, Rating (1-5), Product purchased, and detailed feedback"

## Troubleshooting

### API Key Issues
- Get free key at https://ai.google.dev/
- Ensure `NEXT_PUBLIC_` prefix in environment variable name
- Check that `.env.local` is NOT in .gitignore

### Form Generation Fails
- Ensure description is clear and detailed
- Check browser console for error messages
- Verify API key is valid

### Styling Issues
- Run `npm install tailwindcss` if Tailwind classes aren't working
- Check `tailwind.config.ts` exists

## Next Steps
1. Customize colors in Tailwind config
2. Add form submission backend
3. Implement form data persistence
4. Add more validation rules
5. Deploy to your domain

## Support
For issues, check the GitHub repository or visit Google's Gemini documentation.
