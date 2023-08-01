const rawData = await fetch("http://www.shtelo.org/api.php?action=parse&prop=wikitext&formatversion=2&format=json&page=틀:국가코드")
    .then(x=>x.json())
    .then(x=>x.parse.wikitext as string)

const lines = rawData.split("\n").filter(line => line.startsWith("|"))

let stack: string[] = []
const result: Record<string, string> = {}
lines.forEach(line => {
    const code = /\| [^=]*?=.*?{{글씨 색\|.*?\|(?:<small>)?(.+?)(?:<\/small>)?\}/.exec(line)?.[1]
    if (code) {
        stack.push(/^\| ([^=]+)=/.exec(line)![1].trim())
        stack.forEach(name => result[name] = code)
        stack = []
    } else {
        const altName = /\| ([^=]+)$/.exec(line)?.[1].trim()
        if (altName) {
            stack.push(altName)            
        }
    }
})

Deno.writeTextFile("dist/국가코드.json", JSON.stringify(result))