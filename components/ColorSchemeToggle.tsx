"use client"

import { Button, Group, useMantineColorScheme } from "@mantine/core"

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Group justify="center" mt="sm">
      <Button
        variant="outline"
        color="rgba(0, 0, 0, 1)"
        onClick={() => setColorScheme("light")}
      >
        Light
      </Button>
      <Button
        variant="filled"
        color="rgba(0, 0, 0, 1)"
        onClick={() => setColorScheme("dark")}
      >
        Dark
      </Button>
    </Group>
  )
}
