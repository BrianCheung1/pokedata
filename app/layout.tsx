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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
