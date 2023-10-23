"use client"
import { Container } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { useParams } from "next/navigation"
import { PokemonCard } from "@/components/PokemonCard"
import usePokemon from "@/hooks/usePokemon"
import { NavBar } from "@/components/NavBar"

export default function PokemonName() {
  const { pokemon_name } = useParams()
  const { data: pokemon = [], isLoading } = usePokemon(pokemon_name as string)

  return (
    <Container fluid className="overflow-hidden w-full md:w-3/4 lg:w-7/12">
      <NavBar/>
      <SearchBar />
      {pokemon_name && <PokemonCard pokemon={pokemon} isLoading={isLoading} />}
    </Container>
  )
}
