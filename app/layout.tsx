import "./globals.css"
import type { Metadata } from "next"
import { MantineProvider, ColorSchemeScript } from "@mantine/core"
import "@mantine/core/styles.css"

export const metadata: Metadata = {
  title: "PokeData",
  description: "Pokemon Go Database",
  openGraph: {
    title: "PokeData",
    description: "Pokemon Go Database",
    images: "/images/pokemon-go-logo.png",
    url: "https://pokedata-rose.vercel.app/",
    siteName: "PokeData",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  )
}
