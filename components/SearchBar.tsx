"use client"
import { useState, useRef } from "react"
import { Autocomplete } from "@mantine/core"
import useAllPokemons from "@/hooks/useAllPokemons"
import { Container, Stack } from "@mantine/core"
import { useRouter, usePathname } from "next/navigation"

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
      <Container fluid className="mt-5 flex items-center justify-center">
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
            rightSection={
              value && (
                <button
                  onClick={handleClear}
                  className="cursor-pointer outline-none focus:outline-none"
                >
                  &#10006;
                </button>
              )
            }
          />
        </Stack>
      </Container>
    )
  }

  return (
    <Container fluid className="mt-5 flex items-center justify-center">
      <Stack className="w-full md:w-2/3 lg:w-1/2">
        <Autocomplete
          value={value}
          className="flex items-center justify-center"
          placeholder="Search term..."
          data={
            isPokemonsLoading
              ? []
              : allPokemons.pokemons.map(
                  (pokemon: { name: any }) => pokemon.name
                )
          }
          onChange={(value) => {
            setValue(value)
          }}
          maxDropdownHeight={200}
          onOptionSubmit={(value) => {
            router.push(`/pokemons/${value}`)
          }}
          rightSection={
            value && (
              <button
                onClick={handleClear}
                className="cursor-pointer outline-none focus:outline-none"
              >
                &#10006;
              </button>
            )
          }
        />
      </Stack>
    </Container>
  )
}
