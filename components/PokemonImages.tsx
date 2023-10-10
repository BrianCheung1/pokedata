import { Text, Grid, Image, Badge } from "@mantine/core"

interface PokemonImagesProps {
  pokemon: Record<string, any>
}

export const PokemonImages: React.FC<PokemonImagesProps> = ({
  pokemon: { sprite, shiny, sprite_shiny },
}) => {
  return (
    <Grid justify="space-around">
      <Grid.Col span="content" className="text-center">
        <Image src={sprite} h={200} fit="contain" alt="Pokemon" />
        <Badge>Base</Badge>
      </Grid.Col>

      {shiny && (
        <Grid.Col span="content" className="text-center">
          <Image src={sprite_shiny} h={200} fit="contain" alt="Pokemon" />
          <Badge color="#F7D02C">Shiny</Badge>
        </Grid.Col>
      )}
    </Grid>
  )
}
