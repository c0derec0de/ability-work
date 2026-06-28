import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { $isAuthenticated } from '../features/auth/model/authModel'
import { loadJobsFx } from '../entities/job/model/jobsModel'
import { Layout } from '../shared/ui/Layout'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { JobsPage } from '../pages/JobsPage/JobsPage'
import { JobDetailsPage } from '../pages/JobDetailsPage/JobDetailsPage'
import { MessagesPage } from '../pages/MessagesPage/MessagesPage'
import { ProfilePage } from '../pages/ProfilePage/ProfilePage'

function ProtectedLayout() {
  const isAuthenticated = useUnit($isAuthenticated)
  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
}

export function App() {
  useEffect(() => {
    loadJobsFx()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
