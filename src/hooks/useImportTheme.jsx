import { themes } from "../static/themes/themes.json"

export default function useImportTheme(file) {
    const importFile = file.target.files[0]

    if (file.type === 'text/css') {
        let reader = new FileReader()
        reader.onload = (e) => {
            let css = e.target.result
        }
        const importedTheme = reader.readAsText(importFile)
    } else {
        let reader = new FileReader()
        reader.onload = (e) => {
            let json = JSON.parse(e.target.result)
            themes.custom = json
            console.log(json)
            console.log(themes.custom)
        }
        reader.readAsText(importFile) 
    }
}
