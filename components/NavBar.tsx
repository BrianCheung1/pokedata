"use client"
import { NavLink, Box, Drawer, Burger, Container } from "@mantine/core"
import { IconNotebook, IconSearch, IconPokeball } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

const data = [
  {
    label: "Search Pokemon",
    description: "Item with description",
    leftSection: <IconSearch size="1rem" stroke={1.5} />,
    url: "/",
  },
  {
    label: "Pokedex",
    leftSection: <IconPokeball size="1rem" stroke={1.5} />,
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
  const items = data.map((item, index) => (
    <Link href={item.url} key={item.label}>
      <NavLink
        active={item.url === pathName}
        label={item.label}
        leftSection={item.leftSection}
        variant="subtle"
      />
    </Link>
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
