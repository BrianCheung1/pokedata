"use client"
import { useState } from "react"
import usePokemon from "@/hooks/usePokemon"
import { PokemonCard } from "./PokemonCard"
import { Autocomplete } from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { Container, Stack } from "@mantine/core"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [submittedTerm, setSubmittedTerm] = useState("")
  const { data: pokemon = [], isLoading } = usePokemon(submittedTerm)
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()

  const handleSubmit = () => {
    setSubmittedTerm(searchTerm)
  }

  return (
    <Container
      size="responsive"
      className="mt-5 flex items-center justify-center "
    >
      <Stack className="w-56 md:w-96 ">
        <Autocomplete
          placeholder="Search term..."
          data={
            isPokemonsLoading
              ? []
              : allPokemons.pokemons.map((pokemon: { name: any }) => pokemon.name)
          }
          limit={5}
          onChange={(value) => {
            setSearchTerm(value)
          }}
          onOptionSubmit={(value) => {
            setSubmittedTerm(value)
          }}
        />
          <PokemonCard pokemon={pokemon} isLoading={isLoading}/>
      </Stack>
    </Container>
  )
}
