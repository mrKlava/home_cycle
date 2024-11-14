import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import style from './home-layout.module.scss';

/**
 * ### App Layout
 */
function AppLayout() {
  const [test, setTest] = useState(false);

  return (
    <div className={style.home}>
      <Outlet context={{
        test, 
        setTest
        }}/>
    </div>
  )
}

export default AppLayout