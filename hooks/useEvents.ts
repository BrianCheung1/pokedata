import useSwr from "swr"
import fetcher from "@/libs/fetcher"

const useEvents = (userTimezone: string) => {
  const { data, error, isLoading, mutate } = useSwr(`/api/events?timezone=${userTimezone}`, fetcher, {
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
