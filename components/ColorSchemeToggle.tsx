"use client"

import { Button, Group, useMantineColorScheme } from "@mantine/core"

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Group justify="center" mt="sm">
      <Button variant="filled" onClick={() => setColorScheme("light")}>Light</Button>
      <Button variant="filled" onClick={() => setColorScheme("dark")}>Dark</Button>
    </Group>
  )
}
