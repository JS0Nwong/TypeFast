import { useState, useCallback } from "react"

const useModal = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = useCallback(() => {
        setOpenModal(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [])

    return { openModal, handleCloseModal, handleOpenModal }
}

export { useModal }