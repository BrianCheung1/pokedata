import { Text, Grid, Image, Badge, Title } from "@mantine/core"
import { capitalize } from "@/libs/utils"

interface PokemonMoves {
  pokemon: Record<string, any>
}

export const PokemonMoves: React.FC<PokemonMoves> = ({
  pokemon: { type_effectiveness, moves },
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
      if (type_effectiveness[key].length === 0) {
        list.push(
          <Grid.Col>
            <Text size="md" c="dimmed" key={key + type_effectiveness[key]}>
              N/A
            </Text>
          </Grid.Col>
        )
      }
      for (const key2 in type_effectiveness[key]) {
        list.push(
          <Grid.Col>
            <Text
              size="md"
              c="dimmed"
              key={key + key2 + type_effectiveness[key][key2]}
            >{`Effective against ${type_effectiveness[key][key2]} types`}</Text>
          </Grid.Col>
        )
      }
    }
    return list
  }

  const renderMoves = () => {
    const list: any[] = []

    list.push(<Grid.Col>Fast Moves</Grid.Col>)
    moves?.fast_moves?.map((move:any) => {
      list.push(
        <Grid.Col>
          Move Name: {move.name} Dps: {move.dps} Type: {move.type}
        </Grid.Col>
      )
    })
    list.push(<Grid.Col>Charged Moves</Grid.Col>)
    moves?.charged_moves?.map((move:any) => {
      list.push(
        <Grid.Col>
          Move Name: {move.name} Dps: {move.dps} Type: {move.type}
        </Grid.Col>
      )
    })

    return list
  }
  return (
    <>
      <Grid>
        {renderTypeEffectiveness()} {renderMoves()}
      </Grid>
    </>
  )
}
