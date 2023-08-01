import { parseInfoBox } from "../src/parseInfoBox.ts"
import { cats } from "./cats.ts"

await Promise.all(Object.entries(cats).map(async function([cat, templateName]) {
    const data = parseInfoBox(
        templateName,
        await Deno.readTextFile(`dist/${cat}.xml`)
    )
    const text = JSON.stringify(data)
    console.log("Output Length:", text.length)
    await Deno.writeTextFile(`dist/${cat}.json`, text)
}))