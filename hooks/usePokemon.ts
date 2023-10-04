import useSwr from 'swr'
import fetcher from '@/libs/fetcher'

const useTypes = (pokemon_name: string) => {
    const {data, error, isLoading} = useSwr(`/api/pokemon/${pokemon_name}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data, error, isLoading
    }
}

export default useTypes