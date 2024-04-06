import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Plotly Demo'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href='/'>Home</Link>
        {children}
      </body>
    </html>
  )
}
