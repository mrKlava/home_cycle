import { useParams } from 'react-router-dom';

import { useFetchData } from '../../hooks';
import { InterventionServices } from '../../services';

import { ButtonBack, Title } from '../../ui';

import { PAGES } from '../../constants';


function InterventionPage() {
  const { id } = useParams();

  const { data: intervention, isLoading } = useFetchData(InterventionServices.getInterventionById, [id]);

  return (
    <main className="main">
      <ButtonBack />
      <Title>{PAGES.INTERVENTION.TITLE}</Title>
      {isLoading
        ? <p>Loading...</p>
        : intervention && <p>{intervention.intervention_id}</p>}
    </main>
  )
}

export default InterventionPage;