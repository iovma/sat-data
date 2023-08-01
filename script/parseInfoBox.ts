import { parseInfoBox } from "../src/parseInfoBox.ts"
import { cats } from "./cats.ts"

await Promise.all(Object.entries(cats).map(async function([cat, templateName]) {
    const data = await parseInfoBox(
        templateName,
        await Deno.readTextFile(`dist/${cat}.xml`)
    )
    await Deno.writeTextFile(`dist/${cat}.json`, JSON.stringify(data))
}))