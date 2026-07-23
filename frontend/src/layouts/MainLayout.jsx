import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function MainLayout() {
    const isMobile = useMediaQuery('(max-width: 700px)')
    
    return (
        <>
            <Header />
            <main>
                <div className='content-container'>
                    <Outlet />
                </div>
            </main>
            {isMobile ? (
                    <Footer />
                ) : (
                    <Sidebar />
                )
            }
        </>
    )
}