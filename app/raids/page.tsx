"use client"
import { Container } from "@mantine/core"
import { NavBar } from "@/components/NavBar"
import { Raids} from "@/components/Raids"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full md:w-4/5">
      <NavBar />
      <Raids />
    </Container>
  )
}
