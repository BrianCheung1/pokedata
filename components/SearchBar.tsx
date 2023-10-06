"use client"
import { useState } from "react"
import usePokemon from "@/hooks/usePokemon"
import { PokemonCard } from "./PokemonCard"
import { Autocomplete } from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { Container, Stack } from "@mantine/core"

export const SearchBar = () => {
  const [submittedTerm, setSubmittedTerm] = useState("")
  const { data: pokemon = [], isLoading } = usePokemon(submittedTerm)
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()

  if (isPokemonsLoading) {
    return null
  }

  return (
    <Container
      size="responsive"
      className="mt-5 flex items-center justify-center "
    >
      <Stack className="w-56 md:w-2/3 lg:w-1/2">
        <Autocomplete
          className="flex items-center justify-center"
          placeholder="Search term..."
          data={
            isPokemonsLoading
              ? []
              : allPokemons.pokemons.map(
                  (pokemon: { name: any }) => pokemon.name
                )
          }
          limit={5}
          onOptionSubmit={(value) => {
            setSubmittedTerm(value)
          }}
        />
        {submittedTerm && (
          <PokemonCard pokemon={pokemon} isLoading={isLoading} />
        )}
      </Stack>
    </Container>
  )
}
