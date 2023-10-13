"use client"
import { Badge, NavLink } from "@mantine/core"
import {
  IconNotebook,
  IconSearch,
} from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { Drawer, Burger, Container } from "@mantine/core"
import { ColorSchemeToggle } from "./ColorSchemeToggle"
import { useRouter } from "next/navigation"

export const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()
  return (
    <>
      <Drawer opened={opened} onClose={close} title="Menu">
        <NavLink
          label="Search"
          leftSection={<IconSearch size="1rem" stroke={1.5} />}
          onClick={() => router.push("/")}
        />
        <NavLink
          label="Pokedex"
          leftSection={<IconNotebook size="1rem" stroke={1.5} />}
          onClick={() => router.push("/pokedex")}
        />
        <ColorSchemeToggle />
      </Drawer>
      <Container fluid h={50}>
        <Burger onClick={open} aria-label="Toggle navigation" className="absolute left-4 top-4"></Burger>
      </Container>
    </>
  )
}
