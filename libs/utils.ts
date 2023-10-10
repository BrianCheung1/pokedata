export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const colors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

export const weather: Record<string, string> = {
  sunny: "/images/sunny.png",
  clear: "/images/clear.png",
  rainy: "/images/rainy.png",
  partly_cloudy: "/images/partly_cloudy.png",
  overcast: "/images/cloudy.png",
  windy: "/images/windy.png",
  snow: "/images/snow.png",
  fog: "/images/fog.png",
}
