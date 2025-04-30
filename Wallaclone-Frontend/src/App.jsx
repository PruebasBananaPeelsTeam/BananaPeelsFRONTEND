import { Routes, Route, Outlet } from 'react-router-dom'
import LoginPage from './pages/auth/loginPage'
import RegisterPage from './pages/auth/registerPage'
import Layout from './components/layout/layout'
import NotFoundPage from './components/shared/notFoundPage'
import CreateAdvertPage from './pages/adverts/createAdvertPage.jsx'
import AdvertsPage from './pages/adverts/AdvertsPage.jsx'
import AdvertDetailPage from './pages/adverts/AdvertDetailPage.jsx'
import MyAdvertsPage from './pages/adverts/MyAdvertsPage.jsx'
import PrivateRoute from './components/shared/PrivateRoute.jsx'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/auth/resetPasswordPage.jsx'
import UpdateAdvertPage from './pages/adverts/UpdateAdvertPage.jsx'
import MyUserPage from './pages/auth/myUserPage.jsx'
import UserPage from './pages/adverts/userPage.jsx'
import DeleteAdvertPage from './pages/adverts/DeleteAdvertPage.jsx'
import ChatRoom from './pages/chat/ChatRoom'
import MyChatsPage from './pages/chat/MyChatsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<AdvertsPage />} />
      </Route>
      <Route
        path="/adverts/new"
        element={
          <PrivateRoute>
            {' '}
            <CreateAdvertPage />{' '}
          </PrivateRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <PrivateRoute>
            <MyUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/myAdverts"
        element={
          <PrivateRoute>
            <MyAdvertsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/adverts/:advertId/update"
        element={
          <PrivateRoute>
            <UpdateAdvertPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/adverts/:advertId/delete"
        element={
          <PrivateRoute>
            <DeleteAdvertPage />
          </PrivateRoute>
        }
      />

      <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
      <Route
        path="/reset-password/:token"
        element={<ResetPasswordPage />}
      ></Route>
      <Route path="/users/:username" element={<UserPage />} />
      <Route path="/adverts" element={<AdvertsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/adverts/:advertId/:slug" element={<AdvertDetailPage />} />
      <Route path="/adverts/:advertId/update" element={<UpdateAdvertPage />} />

      <Route
        path="/chat/advert/:advertId"
        element={
          <PrivateRoute>
            <ChatRoom />
          </PrivateRoute>
        }
      />

      <Route
        path="/chat/room/:chatId"
        element={
          <PrivateRoute>
            <ChatRoom />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-chats"
        element={
          <PrivateRoute>
            <MyChatsPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
