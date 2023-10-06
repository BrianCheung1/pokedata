"use client"

import { Group, useMantineColorScheme } from "@mantine/core"

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Group justify="center" mt="sm">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white  font-semibold py-1 px-2 rounded"
        onClick={() => setColorScheme("light")}
      >
        Light
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded"
        onClick={() => setColorScheme("dark")}
      >
        Dark
      </button>
    </Group>
  )
}
