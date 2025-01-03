import style from './style.module.scss';

/**
 * ### Button Component
 * 
 * @param {object} props
 * @param {} props.children
 * @param {} props.onClick
 * @param {} props.className
 * @param {} props.forwardRef
 * @param {boolean} props.isDisabled
 *  
 * @returns 
 */
function Button({ children, onClick, className, forwardRef, isDisabled }) {
  const classes = className ? `${style.btn_prm} ${className}` : style.btn_prm;

  return (
    <button onClick={onClick} className={classes} ref={forwardRef} disabled={isDisabled} >
      {typeof children === "string" ? children.toUpperCase() : children}
    </button>
  )
}

export default Button;