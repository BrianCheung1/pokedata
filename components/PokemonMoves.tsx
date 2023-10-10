import { Text, Grid, Image, Badge } from "@mantine/core"
import { capitalize } from "@/libs/utils"

interface PokemonMoves {
  pokemon: Record<string, any>
}

export const PokemonMoves: React.FC<PokemonMoves> = ({
  pokemon: { type_effectiveness },
}) => {
  const renderTypeEffectiveness = () => {
    const list = []

    for (const key in type_effectiveness) {
      if (key)
        list.push(
          <Grid.Col key={type_effectiveness[key]}>
            {`${capitalize(key)} Moves`}:
          </Grid.Col>
        )
      for (const key2 in type_effectiveness[key]) {
        list.push(
          <Grid.Col
            key={key + key2 + type_effectiveness[key][key2]}
          >{`Effective against ${type_effectiveness[key][key2]} types`}</Grid.Col>
        )
      }
    }
    return list
  }

  return (
    <>
      <Grid>{renderTypeEffectiveness()}</Grid>
    </>
  )
}
