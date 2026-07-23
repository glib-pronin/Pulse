import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export default function MainLayout() {
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}