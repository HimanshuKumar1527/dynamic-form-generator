# Quick Start Guide - 5 Minutes to Running

## Step 1: Clone the Repository
```bash
git clone https://github.com/HimanshuKumar1527/dynamic-form-generator.git
cd dynamic-form-generator
```

## Step 2: Create Next.js App
```bash
npm create next-app@latest . --typescript --tailwind --skip-git
```
Choose default options for all prompts.

## Step 3: Install Dependencies
```bash
npm install google-generative-ai lucide-react
```

## Step 4: Get Gemini API Key
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create a new API key
4. Copy the key

## Step 5: Create .env.local
```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

## Step 6: Create Project Files

### Create directories:
```bash
mkdir -p app/api/generate-form
mkdir -p components
mkdir -p lib
mkdir -p types
```

### Copy code from CODE_SNIPPETS.md
- Create `types/form.ts` - Copy from CODE_SNIPPETS.md
- Create `lib/gemini.ts` - Copy from CODE_SNIPPETS.md  
- Create `app/api/generate-form/route.ts` - Copy from CODE_SNIPPETS.md
- Create `components/FormField.tsx` - Copy from CODE_SNIPPETS.md
- Create `components/DynamicForm.tsx` - Copy from CODE_SNIPPETS.md
- Replace `app/page.tsx` - Copy from CODE_SNIPPETS.md

## Step 7: Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser

## Step 8: Test It
1. Type: "Registration form with Name, Email, Company, Job Title"
2. Click "Generate Form"
3. Watch the magic happen!

## Deploy to Vercel

### Option A: GitHub Integration (Easiest)
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Then:
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add Environment Variable:
   - Name: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: Your API key
4. Click Deploy

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel
```

Add environment variable during deployment.

## Troubleshooting

### "API key not found"
- Check .env.local has NEXT_PUBLIC_GEMINI_API_KEY
- Ensure key is pasted correctly
- Restart dev server after changing .env.local

### "Form generation failed"
- Check browser console for errors
- Ensure description is detailed (e.g., "form with Name, Email, Phone")
- Verify API key is valid at https://ai.google.dev/

### "Styles not working"
- Run: `npm install -D tailwindcss postcss autoprefixer`
- Restart dev server

## Success!
Your dynamic form generator is now running! 🎉

Next steps:
- Customize colors in `tailwind.config.ts`
- Add form validation
- Connect to a backend database
- Deploy to your domain

For more details, see SETUP.md and CODE_SNIPPETS.md
