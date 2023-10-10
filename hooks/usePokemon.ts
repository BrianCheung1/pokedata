import useSwr from 'swr'
import fetcher from '@/libs/fetcher'

const usePokemon = (pokemon_name: string) => {
    const {data, error, isLoading, mutate} = useSwr(pokemon_name ? `/api/pokemons/pokemon/${pokemon_name}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data, error, isLoading, mutate
    }
}

export default usePokemon