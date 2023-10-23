import { Text, Image, Group, Stack, Grid } from "@mantine/core"
import { capitalize } from "@/libs/utils"
import { useRouter } from "next/navigation"
import { useWindowScroll } from "@mantine/hooks"
import { useState } from "react"

interface PokemonEvolutionsProps {
  pokemon: Record<string, any>
}

const ImageWithHideOnError = (props: any) => {
  const [hideImage, setHideImage] = useState(false)

  return (
    !hideImage && (
      <>
        <Image
          {...props}
          alt="Error"
          onError={() => {
            setHideImage(true)
          }}
        />
        <Text size="xs" c="dimmed" className="text-center">
          {capitalize(props.name)}
        </Text>
      </>
    )
  )
}

export const PokemonEvolutions: React.FC<PokemonEvolutionsProps> = ({
  pokemon: { pokemon_name, evolution_family },
}) => {
  const router = useRouter()
  const renderEvolutions = () => {
    if (!evolution_family || evolution_family.length === 0) {
      return null // Return null if no evolutions are present
    }

    return evolution_family.map(
      (element: {
        id: string
        sprite: string
        name: string
        sprite_shiny: string
        other_forms: any[]
      }) => (
        <Grid.Col key={element.sprite} span={4}>
          <Image
            src={element.sprite}
            fit="contain"
            alt="Pokemon"
            className="cursor-pointer"
            h="10rem"
            onClick={() => router.push(element.id)}
          />
          <Text size="xs" c="dimmed" className="text-center">
            {capitalize(element.name)}
          </Text>
          <Image
            src={element.sprite_shiny}
            fit="contain"
            alt="Pokemon"
            h="10rem"
            className="cursor-pointer"
            onClick={() => router.push(element.id)}
          />
          <Text size="xs" c="dimmed" className="text-center">
            {capitalize(element.name)} Shiny
          </Text>
          {element.other_forms.map((form) => {
            return (
              <>
                <ImageWithHideOnError
                  src={form.sprite}
                  fit="contain"
                  alt="Pokemon"
                  h="15rem"
                  className="cursor-pointer"
                  onClick={() => router.push(element.id)}
                  name={capitalize(form.name)}
                />
                <ImageWithHideOnError
                  src={form.sprite_shiny}
                  fit="contain"
                  alt="Pokemon"
                  h="15rem"
                  className="cursor-pointer"
                  onClick={() => router.push(element.id)}
                  name={`${capitalize(form.name)} Shiny`}
                />
              </>
            )
          })}
        </Grid.Col>
      )
    )
  }

  return (

      <Grid justify="space-around">
        {renderEvolutions()}
      </Grid>

  )
}
