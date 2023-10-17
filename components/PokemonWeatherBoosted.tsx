import React from "react"
import { Image, Stack, Title, Group } from "@mantine/core"
import { weather } from "@/libs/utils"

interface PokemonWeatherBoostedProps {
  pokemon: {
    pokemon_weather_boosted?: string[]
  }
}

export const PokemonWeatherBoosted: React.FC<PokemonWeatherBoostedProps> = ({
  pokemon: { pokemon_weather_boosted = [] },
}) => {
  const renderWeather = () => {
    return pokemon_weather_boosted.map((boost: string) => {
      const adjustedBoost = boost === "Partly Cloudy" ? "Partly" : boost
      const weatherCondition = weather[adjustedBoost.toLowerCase()]

      return (
        <Image
          key={boost}
          src={weatherCondition}
          w={35}
          fit="fill"
          alt="weather"
        />
      )
    })
  }

  return (
    <>
      {pokemon_weather_boosted.length > 0 && (
        <Stack justify="center" align="center">
          <Title order={5}>Boosted in</Title>
          <Group justify="center" wrap="nowrap" gap="xs">
            {renderWeather()}
          </Group>
        </Stack>
      )}
    </>
  )
}
