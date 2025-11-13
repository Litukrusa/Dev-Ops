import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevOps - Вводный Курс',
  description: 'Интерактивный курс по основам DevOps для студентов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen text-white">
        {children}
      </body>
    </html>
  )
}

