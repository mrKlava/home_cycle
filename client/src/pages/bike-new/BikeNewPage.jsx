import { ButtonBack, Title } from '../../ui';

import { PAGES } from '../../constants';


function BikeNewPage() {
  return (
    <main>
      <ButtonBack />
      <Title>{PAGES.BIKE_NEW.TITLE}</Title>
    </main>
  )
}

export default BikeNewPage;