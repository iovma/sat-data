export async function getTitles(target: string) {
    const result = await fetch(`http://www.shtelo.org/api.php?action=query&format=json&list=embeddedin&eilimit=500&eititle=${target}`).then(x=>x.json())
    return result
        .query
        .embeddedin
        .map(({title}: any) => title) as string[]
}