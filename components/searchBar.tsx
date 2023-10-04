import { useState } from "react"
import usePokemon from "@/hooks/usePokemon"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: pokemon = [], isLoading } = usePokemon(searchTerm)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    console.log(`Searching for ${searchTerm}`)
  }

  const renderTypeEffectiveness = () => {
    const list = []
    for (const key in pokemon?.type_effectiveness) {
      list.push(<div>{`${key} Moves`}:</div>)
      for (const key2 in pokemon?.type_effectiveness[key]) {
        list.push(<div className="text-xl">{`${pokemon?.type_effectiveness[key][key2]}x more dmg to ${key2}`}</div>)
      }
    }
    if(!list){
      return null
    }
    return list
  }

  return (
    <div className="container mx-auto mt-20">
      <div className="flex flex-col items-center justify-center">
        <div className="">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full h-10 px-4 pr-10 text-sm bg-white border border-gray-300 rounded-lg lg:w-80 focus:outline-none"
            placeholder="Search term..."
          />
        </div>
        <div className="mt-10 text-2xl flex flex-col justify-center items-center">
          {pokemon?.pokemon_types && "Type:"} <div className="text-xl">{pokemon?.pokemon_types?.join(", ")}</div>
        </div>
        <div className="mt-10 text-2xl flex flex-col justify-center items-center">
          {renderTypeEffectiveness()}
        </div>
      </div>
    </div>
  )
}
