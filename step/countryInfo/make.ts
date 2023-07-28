import { parseCountryInfo } from "../../src/parseCountryInfo.ts"

const columns = (await Deno.readTextFile("columns.txt")).split("\n").map(x=>x.trim())
console.log(columns)

const file = await Deno.readTextFile("countryInfo.xml")
const data = parseCountryInfo(file)
Deno.writeTextFile( "countryInfo.json", JSON.stringify(data))