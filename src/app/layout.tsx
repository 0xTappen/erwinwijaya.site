// src/app/layout.tsx

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import LoadingScreen from "@/components/LoadingScreen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Erwin Wijaya",
  description: "Cyber Security Enthusiast & CTF Player",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-framework="nextjs-tailwind-shadcn">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="Erwin Wijaya Portfolio" />
        <meta name="generator" content="Next.js + TailwindCSS + shadcn/ui + Framer Motion" />
        <meta name="ui-library" content="shadcn/ui" />
        <meta name="framework" content="shadcn/ui" />
        <meta name="built-with" content="Next.js, TailwindCSS, shadcn/ui" />

        {/* ✅ Favicon lengkap & SEO-friendly */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        {/* === Trick supaya Wappalyzer detect via SSR === */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // shadcn/ui framework marker
              window.__SHADCN__ = true;
              document.documentElement.setAttribute("data-shadcn-ui", "true");
              console.log("shadcn/ui active");
            `,
          }}
        />
      </head>

      <body className={inter.className} data-library="shadcn-ui">
        {/* Marker untuk Wappalyzer DOM scan */}
        <div id="__shadcn-ui" data-library="shadcn/ui" className="hidden">
          shadcn/ui
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
