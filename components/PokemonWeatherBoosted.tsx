import { Text, Image, Stack, Title, Group } from "@mantine/core"
import { weather } from "@/libs/utils"

interface PokemonWeatherBoostedProps {
  pokemon: Record<string, any>
}

export const PokemonWeatherBoosted: React.FC<PokemonWeatherBoostedProps> = ({
  pokemon : {pokemon_weather_boosted},
}) => {
  const renderWeather = () => {
    const list: any = []
    pokemon_weather_boosted?.forEach((boost: string) => {
      const weatherCondition = weather[boost.toLowerCase()]
      list.push(
        <Image
          src={weatherCondition}
          w={30}
          fit="contain"
          alt="weather"
        ></Image>
      )
    })
    return list
  }

  return (
    <Stack justify="center" align="center">
      <Title order={5}>Boosted in</Title>
      <Group>{renderWeather()}</Group>
    </Stack>
  )
}
