import { useEffect } from "react"
import { useModal } from '../../hooks/useModal'
import { MODAL_CONFIG } from "../../constants/modalsConfig"
import styles from './ModalRoot.module.css'
import Popover from "./Popover"

export default function ModalRoot() {
    const { modal, closeModal } = useModal()

    const config = MODAL_CONFIG[modal.name]
    
    useEffect(() => {
        if (!modal.name) return
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        } 
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [config])
    
    useEffect(() => {
        if (config?.type !== 'modal') return
        
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => document.body.style.overflow = prevOverflow
        
    }, [config])
    
    if (!modal.name) return null
    if (!config) return null

    const Modal = config.component

    return (
        <>
            {config.type === 'popover' ? (
                    <Popover anchorElement={modal.anchorElement} closeModal={closeModal}>
                        <Modal />
                    </Popover>
                ) : (
                    <div 
                        className={styles.backdrop}
                        onClick={closeModal}
                    ></div>
                )
            }
        </>
    )
}