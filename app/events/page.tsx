"use client"
import { Container } from "@mantine/core"
import { NavBar } from "@/components/NavBar"
import { EventList } from "@/components/EventList"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full md:w-3/4 lg:w-1/2">
      <NavBar />
      <EventList />
    </Container>
  )
}
