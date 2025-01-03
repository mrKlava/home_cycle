import { useEffect, useState } from 'react';

import { useFetchData } from '../../hooks';
import { InterventionServices } from '../../services';

import { LoadingSpinner } from '../../ui';

import { Outlet } from 'react-router-dom';

import style from './style.module.scss';


/**
 * ### Bikes Layout
 * 
 * Holds Context for interaction with bikes
 */
function InterventionsLayout() {
  const { data, isLoading } = useFetchData(InterventionServices.getInterventions);

  // holds current page: 
  const [currentPage, setCurrentPage] = useState('');

  // holds intervention list for current user
  const [interventions, setInterventions] = useState([]);

  /**
   * Update intervention list when data is fetched
   */
  useEffect(() => setInterventions(() => data), [data]);

  return (
    <main className={style.main}>
      {
        isLoading
          ? <LoadingSpinner />
          : <Outlet context={{
            interventions
          }} />
      }
    </main>
  )
}

export default InterventionsLayout;