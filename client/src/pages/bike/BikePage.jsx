import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBikeContext, useFetchData } from '../../hooks';
import { BikeServices } from '../../services';

import { BikeForm, PageHeader } from '../../components';
import { ButtonBack, LoadingSpinner } from '../../ui';

import { LINKS, PAGES } from '../../constants';

import style from './style.module.scss';


/**
 * ### Bike Page
 * 
 * Page usd to visualize bike data and update this data
 */
function BikesPage() {
  const { TITLE } = PAGES.BIKE;

  const { id } = useParams();

  const { data: bike, isLoading } = useFetchData(BikeServices.getBikeById, [id]);
  const { updateBikeList } = useBikeContext();

  // used to render form errors or messages
  const [messageText, setMessageText] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  /**
  * Handle submit to provided endpoint will provide to bike data as payload
  */
  const handleSubmit = async (e, inputs) => {
    e.preventDefault();

    // reset form message
    setMessageText('');
    setIsError(false);

    try {
      const {error, message} = await BikeServices.updateBike(inputs);

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
    <main>
      <PageHeader title={TITLE} />
      <div className='container'>

        <ButtonBack/>

        {
          isLoading
            ? <LoadingSpinner />
            : bike && <BikeForm
              bikeData={bike}
              handleSubmit={handleSubmit}
              messageText={messageText}
              isError={isError}
            />
        }
      </div>
    </main>
  )
}

export default BikesPage;