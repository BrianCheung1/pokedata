"use client"
import { Container } from "@mantine/core"
import { NavBar } from "@/components/NavBar"
import { TeamRocketGrunts } from "@/components/TeamRocketGrunts"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full">
      <NavBar />
      <TeamRocketGrunts />
    </Container>
  )
}
