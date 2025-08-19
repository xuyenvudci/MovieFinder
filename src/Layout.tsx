import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import styles from './Layout.module.css'


export default function Layout() {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.contentOverlay}>
        <Header />
        <main className={styles.theMain}>
          <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            
          </Suspense>            
        </main>
        <Footer />
    </div>
    </div>
  )
}
