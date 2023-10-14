"use client"
import { useState, useEffect } from "react"
import { Autocomplete, CloseButton, Flex } from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { useRouter, usePathname } from "next/navigation"
import { CopyURL } from "./CopyURL"

export const SearchBar = () => {
  const [value, setValue] = useState("")
  const currentPage = usePathname().split("/").pop() || ""
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const router = useRouter()

  useEffect(() => {
    setValue(currentPage)
  }, [currentPage])

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
            (pokemon: { pokemon_name: string }) => pokemon.pokemon_name
          )
        }
        onChange={(newValue) => setValue(newValue)}
        maxDropdownHeight={200}
        onOptionSubmit={(newValue) => router.push(`/pokemons/${newValue}`)}
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
