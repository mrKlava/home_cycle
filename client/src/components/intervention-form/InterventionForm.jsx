import { useEffect, useState } from 'react';

import { ServicesList } from '..';
import { Button, FormRow, InputSelect, InputTextarea, LoadingSpinner, MessageText, Title } from '../../ui';

import { BUTTONS, INPUTS } from '../../constants';

import style from './style.module.scss';
import { useNewInterventionContext } from '../../hooks';


/**
  * ### Bike form component
  * 
  * Used to create or update bike 
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

  const {isLoading, bikes, services, products, technicians} = useNewInterventionContext();

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
      <div className={style.serviceList}>
      {
        isLoading
          ? <LoadingSpinner />
          : <ServicesList services={services}/>
        }
        </div>

      <Title>Products</Title>
      {
        isLoading
          ? <LoadingSpinner />
          : products && products.map(product => {
            return (
              <div key={product.productId}>{product.name}</div>
            )
          })
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
            <h1>CALENDAR SLOTS</h1>
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