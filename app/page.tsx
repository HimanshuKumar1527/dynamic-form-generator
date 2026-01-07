'use client'

import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError('')

    try {
      // Form generation logic will be implemented here
      console.log('Generating form from prompt:', prompt)
    } catch (err) {
      setError('Failed to generate form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dynamic Form Generator</h1>
      <p>Describe a form in plain English and watch it come to life with AI</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the form you want to create..."
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '10px',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px'
          }}
        >
          {loading ? 'Generating...' : 'Generate Form'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
