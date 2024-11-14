import { useParams } from 'react-router-dom';

import { useFetchData } from '../../hooks';
import { BikeServices } from '../../services';

import { ButtonBack, Title } from '../../ui';

import { PAGES } from '../../constants';


function BikesPage() {
  const {id} = useParams();

  const {data: bike, isLoading} = useFetchData(BikeServices.getBikeById, [id]);

  return (
    <main>
      <ButtonBack />
      <Title>{PAGES.BIKE.TITLE}</Title>
      { isLoading 
      ? <p>Loading...</p> 
      : bike && <p>{bike.nickname}</p>}
    </main>
  )
}

export default BikesPage