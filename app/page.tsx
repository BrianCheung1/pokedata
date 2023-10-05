"use client"
import { SearchBar } from "@/components/searchBar"
import useTypes from "@/hooks/usePokemon"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="">
        <SearchBar />
      </div>
    </main>
  )
}
