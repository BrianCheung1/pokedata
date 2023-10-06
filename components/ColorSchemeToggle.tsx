"use client"

import { Button, Group, useMantineColorScheme } from "@mantine/core"

export function ColorSchemeToggle() {
  const {setColorScheme } = useMantineColorScheme()

  return (
    <Group justify="center" mt="sm">
      <Button
        variant="filled"
        color="blue" // Adjust color values as needed
        onClick={() => setColorScheme("light")}
      >
        Light
      </Button>
      <Button
        variant="filled"
        color="blue" // Adjust color values as needed
        onClick={() => setColorScheme("dark")}
      >
        Dark
      </Button>
    </Group>
  )
}
