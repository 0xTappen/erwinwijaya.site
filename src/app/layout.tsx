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
    icon: "/logo/logo.png",
  },
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

        {/* ✅ Favicon langsung (agar muncul saat LoadingScreen) */}
        <link rel="icon" href="/logo/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />

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
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
