import { useParams } from 'react-router-dom'

import { useFetchData } from '../../hooks'
import { UserServices } from '../../services'

import { PAGES } from '../../constants'

import { Title } from '../../ui'
import { useEffect } from 'react'

/**
 * 
 */
function ProfilePage() {
  const { id } = useParams();
  const {data: user, error, isLoading} = useFetchData(UserServices.getUserData, [id]);

  return (
    <main>
      <Title>{PAGES.PROFILE.TITLE}</Title>

      {isLoading 
      ? <p>Loading</p> 
      : user && user.name}
      {error && error}
    </main>
  )
}

export default ProfilePage