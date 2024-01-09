const allowedInputs = (code) => {
    return (
        code.startsWith('Key') ||
        code === 'Backspace' ||
        code === 'Space'
    )
}
export { allowedInputs };