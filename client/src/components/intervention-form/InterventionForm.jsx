import { useEffect, useState } from 'react';

import { useNewInterventionContext } from '../../hooks';

import { ProductsList, ServicesList, TimeSlotsList } from '..';
import { Button, FormRow, InputSelect, InputTextarea, LoadingSpinner, MessageText, Title } from '../../ui';

import { BUTTONS, INPUTS } from '../../constants';

import style from './style.module.scss';


/**
  * ### Intervention form component
  * 
  * Used to create new intervention
  * 
 */
function InterventionForm({
  interventionData,

  isDisabled = false,
  submitText = BUTTONS.SUBMIT,
  handleSubmit = (e) => { e.preventDefault(); console.log('Submit btn clicked') },

  messageText = "",
  isError = true

}) {
  // import constant bike text
  const { BIKE, DESCRIPTION, TECHNICIAN } = INPUTS.INTERVENTION;

  const { isLoading, bikes, services, products, technicians } = useNewInterventionContext();

  const [technicianSelected, setTechnicianSelected] = useState(null);

  const [timeSlots, setTimeSlots] = useState([]);

  // form inputs values
  const [inputs, setInputs] = useState(interventionData);

  /**
   * Handle change of input field
   * 
   * @param {ChangeEvent} e - change event  
   */
  const handleChange = (e) => {
    const key = e.target.name;
    let value = e.target.value;

    setInputs((prev) => ({ ...prev, [key]: value }));

    if (key === 'technicianId') {
      console.log(value)
      setTechnicianSelected(value)
    }
  }

  useEffect(() => {
    console.log(inputs)
  }, [inputs])

  return (
    <form className={style.form}>

      <Title>Bike</Title>
      {
        isLoading
          ? <LoadingSpinner />
          : (<div className={style.formInputs}>
            <FormRow>
              <InputSelect
                name="bikeId"
                label={BIKE.LABEL}
                onChange={handleChange}
                value={inputs.bikeId || 0}
                required
              >
                <option value={0}>{BIKE.PLACEHOLDER}</option>
                {bikes && bikes.map((bike) => <option key={bike.bikeId} value={bike.bikeId}>{bike.nickname}</option>)}
              </InputSelect>
            </FormRow>
            <FormRow>
              <InputTextarea
                name="description"
                label={DESCRIPTION.LABEL}
                placeholder={DESCRIPTION.PLACEHOLDER}
                onChange={handleChange}
                value={inputs.description || ''}
                required
              />
            </FormRow>
          </div>)
      }

      <Title>Services</Title>
      <p>Total duration of intervention can not be longer than 4 hours (240 minute)</p>
      <div className={style.serviceList}>
        {
          isLoading
            ? <LoadingSpinner />
            : <ServicesList services={services} />
        }
      </div>

      <Title>Products</Title>
      {
        isLoading
          ? <LoadingSpinner />
          : <ProductsList products={products} />
      }

      <Title>Intervention</Title>
      {
        isLoading
          ? <LoadingSpinner />
          : (<div className={style.formInputs}>
            <FormRow>
              <InputSelect
                name="technicianId"
                label={TECHNICIAN.LABEL}
                onChange={handleChange}
                value={inputs.technicianId || 0}
                required
              >
                <option value={0}>{TECHNICIAN.PLACEHOLDER}</option>
                {technicians && technicians.map((technician) => <option key={technician.technicianId} value={technician.technicianId}>{technician.name} {technician.surname}</option>)}
              </InputSelect>
            </FormRow>

            <TimeSlotsList />

          </div>)
      }

      <Button className={style.formSubmit} onClick={(e) => handleSubmit(e, inputs)} isDisabled={isDisabled}>{submitText}</Button>
      <MessageText
        className={style.errorMessage}
        text={messageText}
        isError={isError}
      />
    </form>
  )
}

export default InterventionForm;