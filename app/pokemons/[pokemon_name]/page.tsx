"use client"
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle"
import { Container } from "@mantine/core"
import { SearchBar } from "@/components/SearchBar"
import { useParams } from "next/navigation"
import { PokemonCard } from "@/components/PokemonCard"
import usePokemon from "@/hooks/usePokemon"

export default function PokemonName() {
  const { pokemon_name } = useParams()
  const { data: pokemon = [], isLoading } = usePokemon(pokemon_name as string)

  return (
    <Container fluid className="overflow-hidden w-full md:w-3/4 lg:w-1/2">
      <ColorSchemeToggle />
      <div className="mb-2">
        <SearchBar />
      </div>
      {pokemon_name && <PokemonCard pokemon={pokemon} isLoading={isLoading} />}
    </Container>
  )
}
