const data = await Deno.readTextFile("dist/국가코드.json").then(JSON.parse)

export const getCountryCode = (name: string) => data[name]