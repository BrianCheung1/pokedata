import useSwr from "swr"
import fetcher from "@/libs/fetcher"

const useRaids = () => {
  const { data, error, isLoading } = useSwr(`/api/raids`, fetcher, {
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

export default useRaids
