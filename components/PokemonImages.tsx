import { Text, Grid, Image, Badge } from "@mantine/core"

interface PokemonImagesProps {
  pokemon: Record<string, any>
}

export const PokemonImages: React.FC<PokemonImagesProps> = ({
  pokemon: { sprite, shiny, sprite_shiny },
}) => {
  const renderImageCol = (src: string, label: string, badgeColor?: string) => (
    <Grid.Col span={6} className="text-center">
      <Image src={src} h="10rem" fit="contain" alt="Pokemon" />
      <Badge color={badgeColor}>{label}</Badge>
    </Grid.Col>
  )

  return (
    <Grid justify="space-around">
      {renderImageCol(sprite, "Base")}
      {renderImageCol(sprite_shiny, "Shiny", "#F7D02C")}
    </Grid>
  )
}
