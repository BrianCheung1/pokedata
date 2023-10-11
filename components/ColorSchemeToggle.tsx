"use client"

import { Group, useMantineColorScheme, Button } from "@mantine/core"

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Group justify="center" mt="sm">
      <Button onClick={() => setColorScheme("light")}>Light</Button>
      <Button onClick={() => setColorScheme("dark")}>Dark</Button>
    </Group>
  )
}
