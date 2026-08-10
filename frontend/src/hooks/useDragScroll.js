import { useCallback, useRef } from "react"

export function useDragScroll() {
    const cleanupRef = useRef(null)

    const scrollRef = useCallback((element) => {
        if (!element) {
            cleanupRef.current?.()
            cleanupRef.current = null
            return 
        }

        let isDragging = false
        let startX = 0
        let startScrollLeft = 0

        const handleMouseDown = (e) => {
            if (e.button !== 0) return
            
            isDragging = true
            startX = e.clientX
            startScrollLeft = element.scrollLeft
        }

        const handleMouseMove = (e) => {
            if (!isDragging) return

            const deltaX = e.clientX - startX
            element.scrollLeft = startScrollLeft - deltaX
        }

        const handleMouseUp = (e) => {
            isDragging = false
        }

        element.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        
        cleanupRef.current = () => {
            element.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return scrollRef
}