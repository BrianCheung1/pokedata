"use client"
import { Container } from "@mantine/core"
import { EventList } from "@/components/EventList"
import { NavBar } from "@/components/NavBar"

export default function PokemonName() {
  return (
    <Container fluid className="overflow-hidden w-full md:w-3/4 lg:w-3/5">
      <NavBar />
      <EventList />
    </Container>
  )
}
