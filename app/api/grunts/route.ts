import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

const POKEAPI = "https://pokeapi.co/api/v2";

interface Grunt {
  active: boolean;
  character: {
    template: string;
    type: { name: string };
  };
  lineup: {
    team: { template: string }[][];
  };
}

interface PokemonDetail {
  name: string;
  sprite: string;
}

export async function GET(req: Request) {
  try {
    const gruntsResponse: AxiosResponse<Record<string, Grunt>> = await axios.get(
      "https://raw.githubusercontent.com/ccev/pogoinfo/v2/active/grunts.json"
    );

    const gruntsActive: Grunt[] = Object.values(gruntsResponse.data).filter(
      (grunt) => grunt.active
    );

    const gruntLineUpDetails = await Promise.all(
      gruntsActive.map(async (grunt) => {
        const gruntTeams = grunt.lineup.team.map((team) =>
          team.map((pokemon) =>
            pokemon.template.replace("_NORMAL", "").toLowerCase()
          )
        );

        const pokemonDetails = await getPokemonDetails(gruntTeams);

        return {
          name: grunt.character.template,
          team: pokemonDetails,
          type: grunt.character.type.name,
        };
      })
    );

    return NextResponse.json(
      {
        msg: "Success",
        grunts: gruntLineUpDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Error in Grunts GET" }, { status: 500 });
  }
}

async function getPokemonDetails(pokemonTeams: string[][]): Promise<PokemonDetail[][]> {
  const flattenTeams: string[] = pokemonTeams.flat(); // Flatten the nested array

  const pokemonDetails = await Promise.all(
    flattenTeams.map(async (pokemonName) => {
      const response = await axios.get(`${POKEAPI}/pokemon/${pokemonName}`);
      return {
        name: response.data.name,
        sprite: `https://img.pokemondb.net/sprites/go/normal/${response.data.name}.png`,
      };
    })
  );

  // Rearrange the results back into the original structure
  return pokemonTeams.map((team) => team.map(() => pokemonDetails.shift() as PokemonDetail));
}