import useSwr from "swr"
import fetcher from "@/libs/fetcher"

const useGrunts = () => {
  const { data, error, isLoading, mutate } = useSwr(`/api/grunts`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useGrunts
