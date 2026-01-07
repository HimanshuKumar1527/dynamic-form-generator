# Complete Code Snippets for Dynamic Form Generator

## File 1: types/form.ts

```typescript
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormConfig {
  fields: FormField[];
}
```

## File 2: lib/gemini.ts

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateFormSchema(description: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Convert this description into JSON form schema: "${description}"
  Return ONLY valid JSON:
  { "fields": [{"name": "fieldName", "label": "Field", "type": "text|email|number|textarea|select|checkbox|radio|date", "required": true/false, "placeholder": "text", "options": ["opt1"]}] }`;
  
  const result = await model.generateContent(prompt);
  const jsonMatch = result.response.text().match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid response');
  return JSON.parse(jsonMatch[0]);
}
```

## File 3: app/api/generate-form/route.ts

```typescript
import { generateFormSchema } from '@/lib/gemini';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();
    if (!description?.trim()) {
      return NextResponse.json({ error: 'Description required' }, { status: 400 });
    }
    const formConfig = await generateFormSchema(description);
    return NextResponse.json(formConfig);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate form' }, { status: 500 });
  }
}
```

## File 4: components/FormField.tsx

```typescript
import { FormField as FormFieldType } from '@/types/form';

interface Props {
  field: FormFieldType;
  value: any;
  onChange: (value: any) => void;
}

export function FormField({ field, value, onChange }: Props) {
  const baseClasses = 'w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-400';

  switch (field.type) {
    case 'textarea':
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
          <textarea value={value || ''} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} className={baseClasses} rows={4} required={field.required} />
        </div>
      );
    case 'select':
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
          <select value={value || ''} onChange={e => onChange(e.target.value)} className={baseClasses} required={field.required}>
            <option value="">Select {field.label}</option>
            {field.options?.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
      );
    default:
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
          <input type={field.type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={field.placeholder} className={baseClasses} required={field.required} />
        </div>
      );
  }
}
```

## File 5: components/DynamicForm.tsx

```typescript
'use client';

import { FormConfig } from '@/types/form';
import { FormField } from './FormField';
import { useState } from 'react';

export function DynamicForm({ config }: { config: FormConfig }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!config.fields?.length) return <p className="text-gray-400">No form configured</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {config.fields.map(field => (
        <FormField key={field.name} field={field} value={formData[field.name]} onChange={v => setFormData({...formData, [field.name]: v})} />
      ))}
      <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg">Submit</button>
      {submitted && <div className="p-4 bg-green-900 border border-green-700 rounded-lg text-green-300">Form submitted!</div>}
    </form>
  );
}
```

## File 6: app/page.tsx

```typescript
'use client';

import { DynamicForm } from '@/components/DynamicForm';
import { FormConfig } from '@/types/form';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

const EXAMPLES = [
  'Tech conference registration with Name, Email, Company, Job Title, T-shirt size',
  'Job application with Name, Email, Phone, Resume, Experience, Motivation',
  'Feedback form with Name, Email, Rating 1-5, Product, Feedback'
];

export default function Home() {
  const [description, setDescription] = useState('');
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateForm = async () => {
    if (!description.trim()) { setError('Describe your form'); return; }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) throw new Error();
      setFormConfig(await response.json());
    } catch { setError('Failed to generate form'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4"><div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-3 rounded-2xl"><Sparkles className="w-8 h-8 text-slate-900" /></div></div>
          <h1 className="text-5xl font-bold text-cyan-400 mb-4">Dynamic Form Generator</h1>
          <p className="text-gray-300">Describe your form in plain English and watch AI build it</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-200">Describe your form</h2>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="E.g., registration form with Name, Email..." className="w-full h-64 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-400 resize-none" />
            <div className="flex gap-3">
              <button onClick={generateForm} disabled={loading} className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold py-3 rounded-lg">{loading ? 'Generating...' : 'Generate Form'}</button>
              <button onClick={() => { setDescription(''); setFormConfig(null); }} className="bg-slate-700 text-white py-3 px-6 rounded-lg">Reset</button>
            </div>
            {error && <div className="p-3 bg-red-900 text-red-300 rounded-lg text-sm">{error}</div>}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <p className="text-yellow-400 mb-3 text-sm">💡 Try examples</p>
              {EXAMPLES.map((ex, i) => <button key={i} onClick={() => setDescription(ex)} className="text-left text-sm text-gray-300 hover:text-cyan-400 p-2 w-full">{ex}</button>)}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Form Preview</h2>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 min-h-96 shadow-xl">
              {formConfig ? <DynamicForm config={formConfig} /> : <p className="text-center py-12 text-gray-400">Form will appear here</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Installation Summary

1. Run: `npm create next-app@latest . --typescript --tailwind --skip-git`
2. Install: `npm install google-generative-ai lucide-react`
3. Create all files above in their respective directories
4. Add `.env.local` with your Gemini API key
5. Run: `npm run dev`
6. Deploy to Vercel with environment variable
