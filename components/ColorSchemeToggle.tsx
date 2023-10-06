"use client"

import { Button, Group, useMantineColorScheme } from "@mantine/core"

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Group justify="center" mt="sm">
      <Button
        variant="filled"
        color="rgba(4, 0, 255, 1)"
        onClick={() => setColorScheme("light")}
      >
        Light
      </Button>
      <Button
        variant="filled"
        color="rgba(4, 0, 255, 1)"
        onClick={() => setColorScheme("dark")}
      >
        Dark
      </Button>
    </Group>
  )
}
