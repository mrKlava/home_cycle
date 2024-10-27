import React, { useEffect } from 'react'

import { Button, Title } from '../../ui'

import { PAGES } from '../../constants'
import { useFetchData } from '../../hooks'
import { BikeServices } from '../../services'

function BikesPage() {
  const {data: bikes, isLoading} = useFetchData(BikeServices.getUserBikes)

  const fetchBike = async () => {
    try {
      const {respData, status} = await BikeServices.getUserBikeByID(1)

      console.log(respData.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {console.log(bikes)}, [bikes])
  return (
    <main>
      <Title>{PAGES.BIKES.TITLE}</Title>

      {isLoading ? <p>Loading</p> : bikes && bikes.map((bike) => <p key={bike.id}>{bike.name}</p>)}

      <Button onClick={fetchBike}>get bike 1</Button>
    </main>
  )
}

export default BikesPage