"use client"
import { SearchBar } from "@/components/searchBar"
import useTypes from "@/hooks/usePokemon"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SearchBar />
      </div>
    </main>
  )
}
