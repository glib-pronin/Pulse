import { createContext, useState } from "react"

export const ModalContext = createContext(null)

const initialState = {
    name: null,
    anchorElement: null,
    props: {}
}

export default function ModalProvider({ children }) {
    const [modal, setModal] = useState(initialState)

    const openModal = (name, anchorElement = null, props = {}) => {
        setModal({
            name,
            anchorElement,
            props
        })
    }

    const closeModal = () => setModal(initialState)

    return (
        <ModalContext.Provider
            value={{
                modal,
                openModal,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}