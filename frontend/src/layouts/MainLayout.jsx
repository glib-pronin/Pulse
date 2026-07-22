import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
    return (
        <>
            <Header />
            <button className='primary-btn login-btn'>
                Log in
            </button>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>
    )
}