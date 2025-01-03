import { BikeList, PageHeader } from '../../components';
import { ButtonBikeNew } from '../../ui';

import { BUTTONS, LINKS, PAGES } from '../../constants';

/**
 * ### 
 */
function BikesPage() {
  return (
    <div>
      <PageHeader title={PAGES.BIKES.TITLE} />
      <div className='container'>
        <ButtonBikeNew navigateTo={LINKS.BIKE_NEW.PATH} label={BUTTONS.BIKE_ADD} />
        <BikeList />
        <ButtonBikeNew navigateTo={LINKS.BIKE_NEW.PATH} label={BUTTONS.BIKE_ADD} />
      </div>
    </div>
  )
}

export default BikesPage;