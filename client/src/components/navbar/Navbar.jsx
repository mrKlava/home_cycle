import { Menu } from '..'
import { BrandLogo, Burger } from '../../ui'

import style from './navbar.module.scss'

/**
 * ### Navbar
 */
function Navbar({ isBurger, setIsBurger }) {
  return (
    <nav className={style.navbar}>
      <div className={`${style.navbar_container} container`}>
        <BrandLogo />
        <Menu isBurger={isBurger} setIsBurger={setIsBurger} />
        <Burger isBurger={isBurger} setIsBurger={setIsBurger} />
      </div>
    </nav>
  )
}

export default Navbar