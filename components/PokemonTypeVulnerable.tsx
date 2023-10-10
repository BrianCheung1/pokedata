import { Badge, Text, Title } from "@mantine/core"

import { colors } from "@/libs/utils"
interface PokemonTypeVulnerableProps {
  pokemon: Record<string, any>
}

export const PokemonTypeVulnerable: React.FC<PokemonTypeVulnerableProps> = ({
  pokemon : {type_vulnerable},
}) => {
  const renderTypeVulnerable = () => {
    const list: any = []
    type_vulnerable?.sort().forEach((element: string) => {
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
    return list
  }

  return (
    <>
      <Title order={5}>Vulnerable To</Title>
      {renderTypeVulnerable()}
    </>
  )
}
