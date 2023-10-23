"use client"
import { Container } from "@mantine/core"
import { TeamRocketGrunts } from "@/components/TeamRocketGrunts"
import { NavBar } from "@/components/NavBar"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full md:w-4/5">
      <NavBar/>
      <TeamRocketGrunts />
    </Container>
  )
}
