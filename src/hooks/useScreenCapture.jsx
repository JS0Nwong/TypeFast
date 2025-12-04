import html2canvas from "html2canvas"
import { useContext } from "react"
import { ThemeContext } from "./useTheme"

export default function useScreenCapture() {
    const { theme, font } = useContext(ThemeContext)

    const capture = async () => {
        try {
            let canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const results = document.getElementById('results')
            const screenshot = await html2canvas(results)
            const currentDate = new Date(
                new Date().getTime() - new Date().getTimezoneOffset() * 60000   
            ).toISOString().slice(0, 19).replace('T', ' ')
            canvas.width = screenshot.width
            canvas.height = screenshot.height

            ctx.drawImage(screenshot, 0, 0)
            ctx.font = `20px ${font}`
            ctx.fillStyle = theme.palette.text.primary

            ctx.fillText(
                currentDate + ' | ' + 'fasttype-e735d.web.app', 
                canvas.width / 2, 
                canvas.height - 20
            )
            
            const screenshotBlob = canvas.toBlob((blob) => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ])
            }, 'image/png', 1)

            return true

        } catch (error) {
            console.log(error)
            return false
        }

    }

    return { capture }
}
