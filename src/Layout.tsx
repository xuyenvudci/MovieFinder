import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

export default function Layout() {
  return (
    <div>
        <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
          </Suspense>            
        </main>
        <Footer />
    </div>
  )
}
