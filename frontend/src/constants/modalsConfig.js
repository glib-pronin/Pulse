import ThemePopover from "../components/modals/ThemePopover"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import EmailVerificationModal from "../components/modals/EmailVerificationModal"

export const MODAL_CONFIG = {
    theme: {
        type: 'popover',
        component: ThemePopover
    },
    login: {
        type: 'modal',
        component: LoginModal,
        needsHeader: true
    },
    register: {
        type: 'modal',
        component: RegisterModal,
        needsHeader: true
    },
    emailVerify: {
        type: 'modal',
        component: EmailVerificationModal
    },
}