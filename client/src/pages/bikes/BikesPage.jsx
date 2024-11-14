import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useFetchData } from '../../hooks'
import { BikeServices } from '../../services'

import { Title, ButtonBikeNew } from '../../ui'

import { LINKS, PAGES } from '../../constants'

function BikesPage() {
  const {data: bikes, isLoading} = useFetchData(BikeServices.getBikes)

  useEffect(() => {console.log(bikes)},[bikes])
  return (
    <main>
      <Title>{PAGES.BIKES.TITLE}</Title>
      <ButtonBikeNew />
      { isLoading 
      ? <p>Loading...</p> 
      : (
        bikes && bikes.map((bike) => {
          return (
            <Link key={bike.bike_id} to={LINKS.BIKE.PATH + "/" + bike.bike_id}>
              {bike.nickname}
            </Link>
          )
        })
      )}
    </main>
  )
}

export default BikesPage