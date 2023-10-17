import useSwr from "swr"
import fetcher from "@/libs/fetcher"

const useEvents = () => {
  const { data, error, isLoading, mutate } = useSwr(`/api/events`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
  }
}

export default useEvents
