import {
  Text,
  Image,
  Group,
  Stack,
  Affix,
  Transition,
  Button,
  rem,
} from "@mantine/core"
import { capitalize } from "@/libs/utils"
import { useRouter } from "next/navigation"
import { IconArrowUp } from "@tabler/icons-react"
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
  const [scroll, scrollTo] = useWindowScroll()
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
        <Stack key={element.sprite} align="center">
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
              {console.log(form)}
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
        </Stack>
      )
    )
  }

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={
                <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
      <Group justify="space-around" align="left">
        {renderEvolutions()}
      </Group>
    </>
  )
}
