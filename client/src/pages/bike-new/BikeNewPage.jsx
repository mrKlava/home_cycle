import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBikeContext } from '../../hooks';
import { BikeServices } from '../../services';

import { BikeForm, PageHeader } from '../../components';
import { ButtonBack } from '../../ui';

import { LINKS, PAGES } from '../../constants';

import style from './style.module.scss';

/**
 * ### New Bike Page
 * 
 * Page used to create new bike for user
 */
function BikeNewPage() {
  const { TITLE } = PAGES.BIKE_NEW;

  const { updateBikeList } = useBikeContext();

  // used to render form errors or messages
  const [messageText, setMessageText] = useState('');
  const [isError, setIsError] = useState(false);

  // inputs
  const bike = {
    nickname: "",
    typeId: 0,
    manufacturer: "",
    model: "",
    isElectric: 0,
    notes: ""
  }

  const navigate = useNavigate();

  /**
  * Handle submit to provided endpoint will provide to bike data as payload
  */
  const handleSubmit = async (e, inputs) => {
    e.preventDefault();

    // check if bike nickname is missing
    if (!inputs.nickname) {
      setIsError(true);
      setMessageText("You must provide bike Nickname");

      return;
    }

    // reset form message
    setIsError(false);
    setMessageText("");

    try {
      const { error, message } = await BikeServices.createBike(inputs);

      // if error set error message
      if (error) {
        setMessageText(error);
        setIsError(true);

        return;
      };

      // if message set message
      if (message) setMessageText(message);

      // update bike list and navigate to bike list
      await updateBikeList();
      navigate(LINKS.BIKES.PATH);

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <PageHeader title={TITLE} />

      <div className='container'>
        <ButtonBack />
        <BikeForm
          bikeData={bike}
          handleSubmit={handleSubmit}
          messageText={messageText}
          isError={isError}
        />
      </div>
    </div>
  )
}

export default BikeNewPage;