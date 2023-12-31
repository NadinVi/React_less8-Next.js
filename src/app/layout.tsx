import type { Metadata } from 'next'
//import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '@/providers/ThemeRegistry'
import { ReactNode } from 'react'
import { Footer } from '@/components/Footer/Footer'
import { Container } from '@mui/material'
import { Header } from '@/components/Header/Header'

//const inter = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <div className='layout'>
            <Header />
            <main className='main'>
              <Container>
                {children}
              </Container>
            </main>
            <Footer />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  )
}
