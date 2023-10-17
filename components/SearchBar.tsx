"use client"
import { useState, useEffect } from "react"
import { Autocomplete, CloseButton, Flex } from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { useRouter, usePathname } from "next/navigation"
import { CopyURL } from "./CopyURL"

export const SearchBar = () => {
  const [value, setValue] = useState("")
  const currentPage =
    decodeURIComponent(usePathname()).split("/").pop()?.split("%20")[0] || ""
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const router = useRouter()

  useEffect(() => {
    const foundPokemon = allPokemons?.pokemons?.find(
      (pokemon: { pokemon_id: number }) =>
        pokemon.pokemon_id === Number(currentPage)
    )

    setValue(foundPokemon?.pokemon_name ?? "")
  }, [allPokemons?.pokemons, currentPage])
  const handleClear = () => {
    setValue("")
  }

  return (
    <Flex justify="center" align="center" direction="column" className="mb-5">
      <Autocomplete
        value={value}
        className="flex items-center justify-center"
        placeholder="Search Pokemon..."
        data={
          !isPokemonsLoading &&
          allPokemons?.pokemons?.map(
            (pokemon: {
              pokemon_id: number
              pokemon_name: string
              form: string
            }) => {
              return {
                label: `${pokemon.pokemon_name}`
                ,
                value: `${pokemon.pokemon_id} ${pokemon.pokemon_name} ${
                  pokemon.form === "Normal" ? "" : pokemon.form
                }`,
              }
            }
          )
        }
        onChange={(newValue) => setValue(newValue)}
        maxDropdownHeight={200}
        onOptionSubmit={(newValue) => {
          router.push(`/pokemons/${newValue.split(" ")[0]}`)
          setValue(newValue)
        }}
        leftSection={<CopyURL />}
        rightSection={
          value && (
            <CloseButton
              onClick={handleClear}
              className="cursor-pointer outline-none focus:outline-none"
            />
          )
        }
      />
    </Flex>
  )
}
