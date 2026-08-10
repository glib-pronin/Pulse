import { useAuth } from './useAuth'
import { useModal } from './useModal'

export function useRequireAuth() {
    const { user, isLoading }  = useAuth()
    const { openModal } = useModal()

    const requireAuth = (callback) => {
        if (isLoading) return
        if (!user) {
            openModal('login')
            return
        } 
        return callback()
    }

    return requireAuth
}
