import style from './message-status.module.scss';

/**
 * ### Message Status Text Component
 * 
 * This component is responsible to render Error or Success message for forms or data fetching
 */
function MessageStatus({className, text='', isError=false}) {
  const classes = className ? className + `${style.message} ${className}` : style.message;

  return (
    <div className={classes}>
      <p className={`${style.messageContent} ${isError ? style.messageError : style.messageSuccess}`}>
        {text}
      </p>
    </div>
  )
}

export default MessageStatus;