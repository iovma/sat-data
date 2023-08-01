await import("./script/loadCountryCode.ts")    // -> 국가코드.json
await import("./script/getTitles.ts" )         // -> 나라.txt
await import("./script/xmlFromTitles.ts")      // 나라.txt -> 나라.xml
await import("./script/parseInfoBox.ts")       // 나라.xml -> 나라.json
await import("./script/jsonToTsv.ts")          // 나라.json -> 나라.tsv