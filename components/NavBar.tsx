"use client"
import { NavLink, Box, Drawer, Burger, Container } from "@mantine/core"
import { IconNotebook, IconSearch, IconPokeball, IconCalendarEvent } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { usePathname, useRouter } from "next/navigation"

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
  {
    label: "Events",
    leftSection: <IconCalendarEvent size="1rem" stroke={1.5} />,
    url: "/events",
  },
]

export const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const pathName = usePathname()
  const router = useRouter()
  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={item.url === pathName}
      label={item.label}
      leftSection={item.leftSection}
      variant="subtle"
      onClick={() => router.push(item.url)}
    />
  ))

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Menu"
        size="xs"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
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
