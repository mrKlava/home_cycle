import style from './textarea.module.scss'

/**
 * ### Input Textarea Component
 *  
 * @prop {} children
 * @prop {} className
 * @prop {} id
 * @prop {} label
 * @prop {} placeholder
 * @prop {} name
 * @prop {} onChange
 * @prop {} value
 */
function InputTextarea(
  {
    children,
    className = '',
    id,
    label = null,
    placeholder = null,
    name = null,
    onChange,
    value
  }) {
  const classes = className ? className + `${style.textarea} ${className}` : style.textarea;

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={style.textarea_container}>
        <textarea
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
          {children}
        </textarea>
      </div>
    </div>
  )
}

export default InputTextarea