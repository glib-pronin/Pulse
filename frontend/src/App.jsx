import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import FeedPage from './pages/FeedPage'
import FollowingPage from './pages/FollowingPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from "./pages/NotFoundPage"
import ModalProvider from "./contexts/ModalContext"

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="following" element={<FollowingPage />} />
            <Route path="profile/:username" element={<ProfilePage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  )
}