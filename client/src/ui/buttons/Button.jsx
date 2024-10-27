import style from './button.module.scss';

/**
 * ### Button Component
 * 
 * @param {object} props
 * @param {} props.children
 * @param {} props.onClick
 * @param {} props.className
 * @param {} props.forwardRef
 *  
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