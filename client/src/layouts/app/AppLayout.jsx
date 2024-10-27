import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components'

import style from './app-layout.module.scss'

/**
 * ### App Layout
 */
function AppLayout() {
  const [isBurger, setIsBurger] = useState(false)

  return (
    <div className={style.app}>
      <Navbar isBurger={isBurger} setIsBurger={setIsBurger} />
      <Outlet context={{
        isBurger, 
        setIsBurger
        }}/>
    </div>
  )
}

export default AppLayout