"use client"
import { NavLink, Box } from "@mantine/core"
import { IconNotebook, IconSearch } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { Drawer, Burger, Container } from "@mantine/core"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const data = [
  {
    label: "Search Pokemon",
    description: "Item with description",
    leftSection: <IconSearch size="1rem" stroke={1.5} />,
    url: "/",
  },
  {
    label: "Pokedex",
    leftSection: <IconNotebook size="1rem" stroke={1.5} />,
    url: "/pokedex",
  },
  {
    label: "Team Rocket Lineups",
    leftSection: <IconNotebook size="1rem" stroke={1.5} />,
    url: "/teamrocket",
  },
]

export const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const pathName = usePathname()
  const router = useRouter()
  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={item.url === pathName}
      label={item.label}
      leftSection={item.leftSection}
      onClick={() => {
        router.push(item.url)
      }}
      variant="subtle"
    />
  ))

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Menu">
        <Box w={220}>{items}</Box>

        <ColorSchemeToggle />
      </Drawer>
      <Container h={50}>
        <Burger
          onClick={open}
          aria-label="Toggle navigation"
          className="absolute left-4 top-4"
        ></Burger>
      </Container>
    </>
  )
}
