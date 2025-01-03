import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InterventionFrom, PageHeader } from '../../components';
import { ButtonBack } from '../../ui';

import { LINKS, PAGES } from '../../constants';

import style from './style.module.scss';
import { useNewInterventionContext } from '../../hooks';

/**
 * ### New Bike Page
 * 
 * Page used to create new bike for user
 */
function InterventionNewPage() {
  const { TITLE } = PAGES.INTERVENTION_NEW;

  const {servicesAdded, services} = useNewInterventionContext();

  // used to render form errors or messages
  const [messageText, setMessageText] = useState('');
  const [isError, setIsError] = useState(false);

  // inputs
  const intervention = {
    bikeId: 0,
    description: "",
    services: [],
    products: [],
    technicianId: 0,
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
      <div className={style.container}>
        <div className='container'>
          <ButtonBack />
          <InterventionFrom interventionData={intervention} />
        </div>
        <aside className={style.summary}>
          <h2>Cart</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                
              }
              <tr>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
              </tr>
            </tbody>
          </table>
          <h3>Total Price: <span>0.00</span> EUR</h3>
          <h3>Total Duration: <span>0</span> min</h3>
        </aside>
      </div>
    </div>
  )
}

export default InterventionNewPage;