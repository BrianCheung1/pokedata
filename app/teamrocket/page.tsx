"use client"
import { Container } from "@mantine/core"
import { TeamRocketGrunts } from "@/components/TeamRocketGrunts"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full md:w-4/5">
      <TeamRocketGrunts />
    </Container>
  )
}
