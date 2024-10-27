import style from './burger.module.scss'

const Burger = ({ isBurger, setIsBurger }) => {

  const handleClick = () => setIsBurger(!isBurger)

  return (
    <div
      className={`${style.burger} ${isBurger ? style.active : ''}`}
      onClick={handleClick}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
};


export default Burger