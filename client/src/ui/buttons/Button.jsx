import style from './button.module.scss';


/**
 * Button component
 * 
 * @param {*} param0 
 * @returns 
 */
function Button({ children, onClick, className, forwardRef }) {
  const classes = className ? className + `${style.btn_prm} ${className}` : style.btn_prm;

  return (
    <button onClick={onClick} className={classes} ref={forwardRef}>
      {children}
    </button>
  )
}

export default Button;