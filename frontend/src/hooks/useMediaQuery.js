import { useState, useEffect } from "react"

export function useMediaQuery(query) {
    const [matches, setMathces] = useState(() => window.matchMedia(query).matches)

    useEffect(() => {
        const media = window.matchMedia(query)
        const handleChange = (e) => setMathces(e.matches)
        media.addEventListener('change', handleChange)
        return () => media.removeEventListener('change', handleChange) 
    }, [query])
    
    return matches
}