import { useThemeStoreActions } from '../utils/stores/themeStore'

export default function useExportTheme() {
    const { getColors } = useThemeStoreActions()

    const writeAsJSONFile = () => {
        const makeFile = () => {
            const theme = getColors()
            const themeString = JSON.stringify(theme, null, 2)
            const file = new Blob([themeString], { type: 'application/json' })
            return file
        }
        const link = document.createElement('a')
        link.setAttribute('download', 'theme.json')
        link.href = URL.createObjectURL(makeFile())
        link.click()
    }

    const writeAsCSSFile = () => {
        const makeFile = () => {
            const theme = getColors()
            const cssString = `:root {
                --background-primary: ${theme.backgroundPrimary};
                --background-secondary: ${theme.backgroundSecondary};
                --text-caret: ${theme.textCaret};
                --text-primary: ${theme.textPrimary};
                --text-secondary: ${theme.textSecondary};
                --error-color: ${theme.errorColor};
                --select: ${theme.select};
            }`
            const file = new Blob([cssString], { type: 'text/css' })
            return file      
        }
        const link = document.createElement('a')
        link.setAttribute('download', 'theme.css')
        link.href = URL.createObjectURL(makeFile())
        link.click()  
    }

    const createLink = () => {
        let link = 'https://fasttype-e735d.web.app/?'
        const theme = getColors()
        const colors = Object.keys(theme)

        colors.forEach(color => {
            link += `${color}=${theme[color]}&`
        })

        navigator.clipboard.writeText(link)
    }

    return { writeAsJSONFile, writeAsCSSFile, createLink }
}
