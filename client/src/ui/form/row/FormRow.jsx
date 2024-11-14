import React from 'react';

import style from './form-row.module.scss';

function FormRow({className, children, title}) {
  return (
    <div className={style.formRow}>
      {children}
    </div>
  )
}

export default FormRow;