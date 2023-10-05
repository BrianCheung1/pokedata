import { capitalize } from "@/libs/utils"

interface PokemonCardProps {
  pokemon: Record<string, any>
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const renderTypeEffectiveness = () => {
    const list = []
    for (const key in pokemon?.type_effectiveness) {
      if (key) list.push(<div>{`${key} Moves`}:</div>)

      for (const key2 in pokemon?.type_effectiveness[key]) {
        list.push(
          <div>{`${pokemon?.type_effectiveness[key][key2]}x more dmg to ${key2}`}</div>
        )
      }
      list.push(
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      )
    }
    if (!list) {
      return null
    }

    return list
  }

  const renderTypeWeakness = () => {
    const list = []
    for (const key in pokemon?.type_weakness) {
      if (key) list.push(<div>{`${key} Weakness`}:</div>)

      for (const key2 in pokemon?.type_weakness[key]) {
        list.push(
          <div>{`${pokemon?.type_weakness[key][key2]}x less dmg to ${key2}`}</div>
        )
      }
      list.push(
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      )
    }
    return pokemon?.type_weakness.join(", ")
    if (!list) {
      return null
    }

    return list
  }

  if (Object.keys(pokemon).length === 0) {
    return null
  }

  return (
    <div className="flex w-auto p-8 md:flex-row flex-col rounded-lg justify-center items-center bg-[#3C6E71] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div>
        <div className="flex justify-center items-center">
          <img className="rounded-lg p-4" src={`${pokemon?.sprite}`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <h1 className="mb-2 text-2xl font-medium text-[#FFFFFF] dark:text-neutral-50">
              {capitalize(pokemon?.pokemon_name)}
            </h1>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p className="text-base text-[#D9D9D9] ">
            {pokemon?.pokemon_types && `${pokemon?.pokemon_types?.join(", ")}`}
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            {renderTypeEffectiveness()}
            {renderTypeWeakness()}
          </p>
        </div>
      </div>
    </div>
  )
}
