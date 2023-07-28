import { parseCountryInfo } from "../../src/parseCountryInfo.ts"

const file = await Deno.readTextFile("step/나라 정보.xml")
parseCountryInfo(file)