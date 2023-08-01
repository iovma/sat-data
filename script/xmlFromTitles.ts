import { cats } from "./cats.ts"

const urlEncode = (json: Record<string, string>) => new URLSearchParams(Object.entries(json)).toString()

await Promise.all(Object.entries(cats).map(async function([cat, templateName]) {
    const pages = await Deno.readTextFile(`dist/${cat}.txt`)

    const xml = await fetch(
        "http://www.shtelo.org/index.php/특수:내보내기",
        {
            method: "POST",
            headers: {
                Accept: "application/xml",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlEncode({
                catname: "",
                pages,
                curonly: "1",
                wpDownload: "1",
                wpEditToken: "+\\\\",
                title: "특수:내보내기",
            })
        }
    ).then(x=>x.text())
    
    await Deno.writeTextFile(`dist/${cat}.xml`, xml)
}))