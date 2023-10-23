"use client"
import { Container } from "@mantine/core"
import { PokemonList } from "@/components/PokemonList"
import { NavBar } from "@/components/NavBar"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full md:w-3/4 lg:w-1/2">
      <NavBar />
      <PokemonList />
    </Container>
  )
}
