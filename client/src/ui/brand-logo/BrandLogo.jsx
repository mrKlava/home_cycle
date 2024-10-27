import React from 'react'
import { Link } from 'react-router-dom'

import { LINKS } from '../../constants'

function BrandLogo() {
  return (
    <Link to={LINKS.HOME.PATH}>
      <p>BrandLogo</p>
    </Link>
  )
}

export default BrandLogo