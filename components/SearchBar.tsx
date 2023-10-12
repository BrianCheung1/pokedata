"use client"
import { useState, useRef } from "react"
import { Autocomplete, CloseButton, Container, Stack } from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { useRouter, usePathname } from "next/navigation"
import { CopyURL } from "./CopyURL"

export const SearchBar = () => {
  let currentPage = usePathname()
  currentPage = currentPage
    .split("/")
    .pop()
    ?.replace(/[^a-zA-Z]/g, "") as string
  const [value, setValue] = useState(currentPage)
  const { data: allPokemons = [], isLoading: isPokemonsLoading } =
    useAllPokemons()
  const router = useRouter()

  const handleClear = () => {
    setValue("")
  }

  if (isPokemonsLoading) {
    return (
      <Container fluid className="mt-5 flex items-center justify-center pb-5">
        <Stack className="w-full md:w-2/3 lg:w-1/2">
          <Autocomplete
            value={value}
            className="flex items-center justify-center"
            placeholder="Search term..."
            data={[]}
            onChange={(value) => {
              setValue(value)
            }}
            maxDropdownHeight={200}
            onOptionSubmit={(value) => {
              router.push(`/pokemons/${value}`)
            }}
            leftSection={
              <CopyURL/>
            }
            rightSection={
              value && <CloseButton onClick={handleClear}></CloseButton>
            }
          />
        </Stack>
      </Container>
    )
  }

  return (
    <Container fluid className="mt-5 flex items-center justify-center pb-5">
      <Stack className="w-full md:w-2/3 lg:w-1/2">
        <Autocomplete
          value={value}
          className="flex items-center justify-center"
          placeholder="Search term..."
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
          leftSection={
            <CopyURL/>
          }
          rightSection={
            value && (
              <CloseButton
                onClick={handleClear}
                className="cursor-pointer outline-none focus:outline-none"
              ></CloseButton>
            )
          }
        />
      </Stack>
    </Container>
  )
}
