import style from './input-text.module.scss';

/**
 * ### Input Text Component
 * 
 * @prop {ReactElement} children
 * @prop {} className
 * @prop {} id
 * @prop {} type 
 * @prop {} label 
 * @prop {} placeholder 
 * @prop {} name 
 * @prop {} onChange
 * @prop {} onBlur
 * @prop {} value
 * @prop {} required 
 * @returns 
 */
function InputText(
  {
    children,
    className = '',
    id,
    type = 'text',
    label = null,
    placeholder = null,
    name = null,
    onChange,
    onBlur,
    value,
    required
  }) {
  const classes = className ? className + `${style.input_text} ${className}` : style.input_text;

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}{required && <span> *</span>}
      <div className={style.input_container}>
        <input
          type={type}
          name={name}
          id={id || name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
        {children}
      </div>
    </div>
  )
}

export default InputText