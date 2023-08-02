import { cats } from "./cats.ts"

await Promise.all(Object.entries(cats).map(async function([cat]) {
    const table = JSON.parse(await Deno.readTextFile(`dist/${cat}.json`))
    const columns = new Set<string>()
    
    table.forEach((row: Record<string, string>) => {
        Object.keys(row).forEach(x=>columns.add(x))
    })
    const columnsArray = Array.from(columns)

    const result =
        columnsArray.join("\t") + "\n" +
        table.map((row: Record<string, string>) =>
            columnsArray.map(x=>row[x] || "").join("\t")
        ).join("\n")

    await Deno.writeTextFile(`dist/${cat}.tsv`, "\ufeff"+result)
}))