"use client"
import { useState, useRef } from "react"
import {
  Autocomplete,
  CloseButton,
  Container,
  Flex,
  Stack,
  Center,
} from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { useRouter, usePathname } from "next/navigation"
import { CopyURL } from "./CopyURL"

export const SearchBar = () => {
  let currentPage = usePathname()
  currentPage = currentPage.split("/").pop() as string
  const [value, setValue] = useState(currentPage)
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const router = useRouter()

  const handleClear = () => {
    setValue("")
  }

  if (isPokemonsLoading) {
    return (
      <>
        <Autocomplete
          value={value}
          className="flex items-center justify-center"
          placeholder="Search Pokemon..."
          data={[]}
          onChange={(value) => {
            setValue(value)
          }}
          maxDropdownHeight={200}
          onOptionSubmit={(value) => {
            router.push(`/pokemons/${value}`)
          }}
          leftSection={<CopyURL />}
          rightSection={
            value && <CloseButton onClick={handleClear}></CloseButton>
          }
        />
      </>
    )
  }

  return (
    <Flex justify="center" align="center" direction="column" className="mb-5">
        <Autocomplete
          value={value}
          className="flex items-center justify-center"
          placeholder="Search Pokemon..."
          data={
            isPokemonsLoading
              ? []
              : allPokemons?.pokemons?.map(
                  (pokemon: { pokemon_name: any }) => pokemon.pokemon_name
                )
          }
          onChange={(value) => {
            setValue(value)
          }}
          maxDropdownHeight={200}
          onOptionSubmit={(value) => {
            router.push(`/pokemons/${value}`)
          }}
          leftSection={<CopyURL />}
          rightSection={
            value && (
              <CloseButton
                onClick={handleClear}
                className="cursor-pointer outline-none focus:outline-none"
              ></CloseButton>
            )
          }
        />
    </Flex>
  )
}
