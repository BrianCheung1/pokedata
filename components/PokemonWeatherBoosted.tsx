import { Text, Image, Stack, Title, Group } from "@mantine/core"
import { weather } from "@/libs/utils"

interface PokemonWeatherBoostedProps {
  pokemon: Record<string, any>
}

export const PokemonWeatherBoosted: React.FC<PokemonWeatherBoostedProps> = ({
  pokemon: { pokemon_weather_boosted },
}) => {
  const renderWeather = () => {
    const list: any = []
    console.log(pokemon_weather_boosted)
    pokemon_weather_boosted?.forEach((boost: string) => {
      if (boost === "Partly Cloudy") boost = "Partly"
      const weatherCondition = weather[boost.toLowerCase()]
      list.push(
        <Image
          src={weatherCondition}
            w={35}
          fit="fill"
          alt="weather"
        ></Image>
      )
    })
    return list
  }

  return (
    <Stack justify="center" align="center">
      <Title order={5}>Boosted in</Title>
      <Group justify="center">{renderWeather()}</Group>
    </Stack>
  )
}
