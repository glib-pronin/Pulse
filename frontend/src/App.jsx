import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import FeedPage from './pages/FeedPage'
import FollowingPage from './pages/FollowingPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import MyProfileRedirect from './pages/MyProfileRedirect'
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./layouts/ProtectedRoute"
import ModalProvider from "./contexts/ModalContext"
import AuthProvider from "./contexts/AuthContext"

export default function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<FeedPage />} />
              <Route element={<ProtectedRoute /> }>
                <Route path="me" element={<MyProfileRedirect />} />
                <Route path="following" element={<FollowingPage />} />
              </Route>
              <Route path="search" element={<SearchPage />} />
              <Route path="profile/:username" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ModalProvider>
  )
}