import { getCountryCode } from "./getCountryCode.ts"

export const clean = (text: string) => {
    return text
        .replace(/\[\[.*?\|([^\[]*?)\]\]/g, "$1")           // [[...|...]]
        .replace(/\[\[분류:(.*?)\]\]/g, "")                  // [[분류:...]]      // 자소크.현지이름
        .replace(/\[\[(.*?)\]\]/g, "$1")                    // [[...]]
        .replace(/'''(.*?)'''/g, "$1")                      // '''...'''
        .replace(/''(.*?)''/g, "$1")                        // ''...''          // 천도.기여자
        .replace(/&lt;s&gt;(.*?)&lt;\/s&gt;/gi, "$1")       // <s>...</s>       // 다메타시아.기여자
        .replace(/&lt;del&gt;(.*?)&lt;\/del&gt;/gi, "$1")   // <del>...</del>
        .replace(/&lt;sup&gt;(.*?)&lt;\/sup&gt;/gi, "$1")   // <sup>...</sup>   // 레프레누제.현지이름
        .replace(/&lt;sub&gt;(.*?)&lt;\/sub&gt;/gi, "$1")   // <sub>...</sub>
        .replace(/{{국기\|(.*?)}}/g, "$1")
        .replace(/{{국가\|(.*?)}}/g, "$1")
        .replace(/{{국기나라\|(.*?)}}/g, "$1")
        .replace(/{{국호\|(.*?)}}/g, "$1")
        .replace(/{{rb\|(.*?)\|.*?}}/gi, "$1")
        .replace(/{{글씨 크기\|.*?\|(.*?)}}/gi, "$1")                             // 피페레.나라_표어_설명
        .replace(/&lt;small&gt;(.*?)&lt;\/small&gt;/gi, "($1)")
        .replace(/\(\((.*?)\)\)/g, "($1)")
        .replace(/&lt;br&gt;/gi, ", ")

        .replace(/&lt;!--.*?--&gt;/g, "")                   // <!-- ... -->
        .replace(/&lt;ref.*?&gt;.*?&lt;\/ref&gt;/gi, "")    // <ref ...>...</ref>
        .replace(/{{국기그림\|.*?}}/g, "")                   // 국기 이미지

        .replace(/{{국가코드\|(.*?)}}/g, t => {
            const name = /{{국가코드\|(.*?)}}/.exec(t)![1]
            console.log(name, getCountryCode(name))
            return getCountryCode(name) || ""
        })
}

export function parseInfoBox(name: string, str: string) {
    const regEx = {
        prop: /^\| *([^=]+?) *= *(.*)$/,
        countryInfoStart: RegExp(`\\\{\\\{${name} *$`),
        countryInfoEnd: /^ *\}\} */,
        comment: /^&lt;!--.*--&gt;$/,
    }
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
                    foo[key] = clean(value)
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