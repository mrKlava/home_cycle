import { Link } from 'react-router-dom'
import { useAuthContext } from "../../hooks";

import { BUTTONS, LINKS, MENUS } from '../../constants';

import style from './menu.module.scss';

function Menu({ isBurger, setIsBurger }) {
  // get states and functions from context
  const { currentUser, logout } = useAuthContext();

  const toggleBurger = () => setIsBurger(!isBurger)

  const handleLogout = () => {
    setIsBurger(false);

    logout();
  }

  const links = [
    {
      text: LINKS.MAIN.TEXT,
      path: LINKS.MAIN.PATH,
      click: toggleBurger
    },
    {
      text: LINKS.PROFILE.TEXT,
      path: LINKS.PROFILE.PATH + "/" + currentUser.user_id,
      click: toggleBurger
    },
    {
      text: LINKS.BIKES.TEXT,
      path: LINKS.BIKES.PATH,
      click: toggleBurger
    },
    {
      text: LINKS.INTERVENTIONS.TEXT,
      path: LINKS.INTERVENTIONS.PATH,
      click: toggleBurger
    },
    {
      text: LINKS.INVOICES.TEXT,
      path: LINKS.INVOICES.PATH,
      click: toggleBurger 
    },
  ]

  return (
    <div className={`${style.menu} ${isBurger ? style.active : ''}`}>
      <ul>
        <li>
          <p className={style.username}>{MENUS.NAVIGATION.WELCOME_NAME +currentUser.name}</p>
        </li>
        {links.map((link, index) => {
          return <li key={index}>
            <Link onClick={link.click}
              to={link.path}>
                {link.text}
            </Link>
          </li>
        })}
        <li>
          <Link onClick={handleLogout}
            to={LINKS.LOGIN.PATH}>
            {BUTTONS.LOGOUT}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu