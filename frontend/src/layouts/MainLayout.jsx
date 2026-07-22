import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <h1>Pulse</h1>
            <main>
                <Outlet />
            </main>
        </>
    )
}