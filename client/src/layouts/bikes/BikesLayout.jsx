import { useEffect, useState } from 'react';

import { useFetchData } from '../../hooks';
import { BikeServices } from '../../services';

import { LoadingSpinner } from '../../ui';

import { Outlet } from 'react-router-dom';

/**
 * ### Bikes Layout
 * 
 * Holds Context for interaction with bikes
 */
function BikesLayout() {
  const { data, isLoading } = useFetchData(BikeServices.getBikes);

  // holds bike list for current user
  const [bikes, setBikes] = useState([]);

  /**
   * Updates list of the bikes
   */
  const updateBikeList = async () => {
    try {
      const { data: bikes } = await BikeServices.getBikes();

      if (bikes) setBikes(bikes);

    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Delete user bike by it's id
   * 
   * @param {number} bikeId id of bike
   */
  const deleteBikeById = async (bikeId) => {
    try {
      const { error, message } = await BikeServices.deleteBikeId(bikeId);

      if (error) return;

      await updateBikeList();

    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Update bike list when data is fetched
   */
  useEffect(() => setBikes(() => data), [data]);

  return (
    <main>
      {
        isLoading
          ? <LoadingSpinner />
          : <Outlet context={{
            bikes,
            updateBikeList,
            deleteBikeById
          }} />
      }
    </main>
  )
}

export default BikesLayout;