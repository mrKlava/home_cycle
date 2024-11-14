import style from './input-select.module.scss'

/**
 * ### Input Select Component
 * 
 * @prop {} children
 * @prop {} className
 * @prop {} id
 * @prop {} label
 * @prop {} placeholder
 * @prop {} name
 * @prop {} onChange
 * @prop {} value
 * @prop {} required
 */
function InputSelect(
  {
    children,
    className = '',
    id,
    label = null,
    placeholder = null,
    name = null,
    onChange,
    value,
    options = [],
    required
  }) {
  const classes = className ? className + `${style.input_select} ${className}` : style.input_select;

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}{required ? <span> *</span> : null}
      <div className={style.input_container}>
        <select
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    </div>
  )
}

export default InputSelect