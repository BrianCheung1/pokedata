import axios from "axios"
import { NextResponse } from "next/server"

const leekData =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/raids.json"
export async function GET(req: Request) {
  try {
    const leekRaids = await axios.get(leekData)

    // Filter raids into different tiers
    const tier1Raids = filterRaidsByTier(leekRaids.data, "Tier 1")
    const tier2Raids = filterRaidsByTier(leekRaids.data, "Tier 2")
    const tier3Raids = filterRaidsByTier(leekRaids.data, "Tier 3")
    const tier4Raids = filterRaidsByTier(leekRaids.data, "Tier 4")
    const tier5Raids = filterRaidsByTier(leekRaids.data, "Tier 5")
    const megaRaids = filterRaidsByTier(leekRaids.data, "Mega")

    return NextResponse.json(
      {
        msg: "Success",
        tier_1: tier1Raids,
        tier_2: tier2Raids,
        tier_3: tier3Raids,
        tier_4: tier4Raids,
        tier_5: tier5Raids,
        mega: megaRaids,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ msg: "Error in Grunts GET" }, { status: 500 })
  }
}

function filterRaidsByTier(raids: any[], tier: string) {
  return raids.filter((raid) => raid.tier === tier)
}
