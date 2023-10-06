import "./globals.css"
import type { Metadata } from "next"
import { MantineProvider, ColorSchemeScript } from "@mantine/core"
import "@mantine/core/styles.css"
import { theme } from "../theme"



export const metadata: Metadata = {
  title: "PokeData",
  description: "Pokemon Go Data",
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
