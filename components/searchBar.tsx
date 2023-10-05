import { useState } from "react"
import usePokemon from "@/hooks/usePokemon"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [submittedTerm, setSubmittedTerm] = useState("")
  const { data: pokemon = [], isLoading } = usePokemon(submittedTerm)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmittedTerm(searchTerm)
  }

  const renderTypeEffectiveness = () => {
    const list = []
    for (const key in pokemon?.type_effectiveness) {
      list.push(<div>{`${key} Moves`}:</div>)
      for (const key2 in pokemon?.type_effectiveness[key]) {
        list.push(
          <div>{`${pokemon?.type_effectiveness[key][key2]}x more dmg to ${key2}`}</div>
        )
      }
    }
    if (!list) {
      return null
    }
    return list
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
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
            <button type="submit" className="text-[#D9D9D9]">search</button>
          </div>
        </form>

        {Object.keys(pokemon).length > 0 && (
          <div className="flex md:flex-row flex-col rounded-lg bg-[#3C6E71] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <img
              className="object-fit rounded-lg p-4"
              src={`${pokemon?.sprite}`}
              alt=""
            />
            <div className="flex flex-col p-4">
              <h5 className="mb-2 text-xl font-medium text-[#FFFFFF] dark:text-neutral-50">
                {searchTerm}
              </h5>
              <p className="mb-4 text-base text-[#D9D9D9] ">
                {pokemon?.pokemon_types &&
                  `Type: ${pokemon?.pokemon_types?.join(", ")}`}
                {renderTypeEffectiveness()}
              </p>
              <p className="mb-4 text-base text-[#284B63]">{}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
