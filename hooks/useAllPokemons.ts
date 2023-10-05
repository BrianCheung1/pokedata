import useSwr from 'swr'
import fetcher from '@/libs/fetcher'

const useAllPokemons = () => {
    const {data, error, isLoading} = useSwr(`/api/pokemons/`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data, error, isLoading
    }
}

export default useAllPokemons