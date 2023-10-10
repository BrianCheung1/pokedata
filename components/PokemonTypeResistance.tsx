import { Badge, Text, Title } from "@mantine/core"

import { colors } from "@/libs/utils"
interface PokemonTypeResistanceProps {
  pokemon: Record<string, any>
}

export const PokemonTypeResistance: React.FC<PokemonTypeResistanceProps> = ({
  pokemon : {type_resistant},
}) => {
  const renderTypeResistances = () => {
    const list: any = []
    type_resistant?.sort().forEach((element: string) => {
      list.push(
        <Badge
          key={element}
          className="mr-2"
          color={colors[element.toLowerCase()]}
        >
          {element}
        </Badge>
      )
    })
    if(list.length === 0){
        return <Badge>N/A</Badge>
    }
    return list
  }

  return (
    <>
      <Title order={5}>Resistant To</Title>
      {renderTypeResistances()}
    </>
  )
}
