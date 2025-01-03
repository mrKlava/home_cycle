import style from './style.module.scss';

/**
 * ### Input Toggle Component
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
function InputToggle(
  {
    className = '',
    id,
    type = 'checkbox',
    label = null,
    name = null,
    onChange,
    onBlur,
    value,
    checked,
    required
  }) {
  const classes = className ? className + `${style.input_checkbox} ${className}` : style.input_checkbox;

  return (
    <div className={classes}>
      {label && <label htmlFor={name}>{label}</label>}{required && <span> *</span>}
      <div className={style.input_container}>
        <input
          type={type}
          name={name}
          id={id || name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          checked={checked}
        />
        <span className={style.input_slider}></span>
      </div>
    </div>
  )
}

export default InputToggle;