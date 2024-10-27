import { Link } from 'react-router-dom'
import { useAuthContext } from "../../hooks";

import style from './menu.module.scss'
import { BUTTONS, LINKS } from '../../constants';

function Menu({ isBurger, setIsBurger }) {

  // get states and functions from context
  const { currentUser, logout } = useAuthContext()

  const handleLogout = () => {
    setIsBurger(false)

    logout()
  }

  return (
    <div className={`${style.menu} ${isBurger ? style.active : ''}`}>
      <ul>
        <li>Hi, {currentUser.user_id}</li>
        <li><Link onClick={() => setIsBurger(!isBurger)} to={LINKS.MAIN.PATH}>{LINKS.MAIN.TEXT}</Link></li>
        <li><Link onClick={() => setIsBurger(!isBurger)} to={LINKS.PROFILE.PATH}>{LINKS.PROFILE.TEXT}</Link></li>
        <li><Link onClick={() => setIsBurger(!isBurger)} to={LINKS.BIKES.PATH}>{LINKS.BIKES.TEXT}</Link></li>
        <li><Link onClick={handleLogout} to={LINKS.LOGIN.PATH}>{BUTTONS.LOGOUT}</Link></li>
      </ul>
    </div>
  )
}

export default Menu