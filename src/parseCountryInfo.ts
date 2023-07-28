const regEx = {
    prop: /^\| *([^=]+?) *= *(.*)$/,
    countryInfoStart: /\{\{나라 정보 *$/,
    countryInfoEnd: /^ *\}\} */,
    comment: /^&lt;!--.*--&gt;$/,
}

export function parseCountryInfo(str: string) {
    const result: Record<string, string>[]  = []
    let foo: Record<string, string> = {}
    let isInside = false
    str.split("\n").forEach((line, i) => {
        if (regEx.countryInfoStart.test(line)) {
            isInside = true
        } else if (isInside == true) {
            if (regEx.countryInfoEnd.test(line)) {
                isInside = false
                result.push(foo)
                foo = {}
            } else if (regEx.prop.test(line)) {
                const [_, key, value] = regEx.prop.exec(line)!
                if (value != "") {
                    foo[key] = value
                }
            } else if (regEx.comment.test(line)) {
                //
            } else {
                console.log(i+1, "---", line)
            }
        }
    })
    return result
}