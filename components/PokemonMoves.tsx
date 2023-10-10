import { Text, Grid, Image, Badge, Title } from "@mantine/core"
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
          <Grid.Col>
            <Title order={5} key={type_effectiveness[key]}>
              {`${capitalize(key)} Moves`}:
            </Title>
          </Grid.Col>
        )
      for (const key2 in type_effectiveness[key]) {
        list.push(
          <Grid.Col>
            <Text size="md" c="dimmed"
              key={key + key2 + type_effectiveness[key][key2]}
            >{`Effective against ${type_effectiveness[key][key2]} types`}</Text>
          </Grid.Col>
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
