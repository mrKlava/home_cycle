import React from 'react'
import BikeForm from '../bike-form/BikeForm'

function BikeDetails({bike}) {
  return (
    <section>
      <BikeForm bikeData={bike} />
    </section>
  )
}

export default BikeDetails