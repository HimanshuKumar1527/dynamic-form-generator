import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dynamic Form Generator',
  description: 'AI-powered dynamic form generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
