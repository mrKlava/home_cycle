import style from './loading-spinner.module.scss'

/**
 * ### Spinner component
 * 
 * Used to animate loading
 */
function LoadingSpinner() {
  return (
    <div className={style.spinner}></div>
  )
}

export default LoadingSpinner