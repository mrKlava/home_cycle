import style from './title.module.scss';

/**
 * ### Title Component
 * 
 * @prop {ReactElement} children
 * @prop {string} className
 */
function Title({children, className = ''}) {
  const classes = className ? className + `${style.title_main} ${className}` : style.title_main;

  return (
    <h1 className={classes}>{children}</h1>
  )
}

export default Title