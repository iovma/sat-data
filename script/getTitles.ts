import { getTitles } from "../src/getTitles.ts"
import { cats } from "./cats.ts"

await Promise.all(Object.entries(cats).map(async function([cat, templateName]) {
    let titles = await getTitles(`틀:${templateName}`)
    titles = titles
        .filter(x=>!x.startsWith("연습장:"))
    await Deno.writeTextFile(`dist/${cat}.txt`, titles.join("\n"))
}))