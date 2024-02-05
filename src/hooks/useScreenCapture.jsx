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
            canvas.width = screenshot.width
            canvas.height = screenshot.height
            canvas.font = "30px serif"
            canvas.textAlign = 'end'
            canvas.textBaseline = 'middle'

            ctx.drawImage(screenshot, 0, 0)
            ctx.fillText('test', canvas.width / 2, canvas.height / 2)
            
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
