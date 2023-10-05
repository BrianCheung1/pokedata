import { useState } from "react"
import usePokemon from "@/hooks/usePokemon"
import { PokemonCard } from "./PokemonCard"
import { BiSearchAlt } from "react-icons/bi"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [submittedTerm, setSubmittedTerm] = useState("")
  const { data: pokemon = [], isLoading } = usePokemon(submittedTerm)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmittedTerm(searchTerm)
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-12 justify-center text-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value)
              setSubmittedTerm("")
            }}
            className="w-full h-10 px-4 pr-10 text-sm bg-[#3C6E71] border border-[#284B63] rounded-lg lg:w-80 outline-none focus:outline-none text-[#FFFFFF]"
            placeholder="Search term..."
          />
          <div>
            <button type="submit" className="text-[#D9D9D9]">
              search
            </button>
          </div>
        </div>
      </form>
      <div className="mb-12 w-full flex justify-center items-center">
        <PokemonCard pokemon={pokemon} />
      </div>
    </div>
  )
}
