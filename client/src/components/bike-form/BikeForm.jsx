import { useState } from 'react';

import { BikeServices } from '../../services';
import { useFetchData } from '../../hooks';

import { Button, FormRow, InputSelect, InputText, InputTextarea, InputToggle, LoadingSpinner, MessageText } from '../../ui';

import { BUTTONS, INPUTS } from '../../constants';

import style from './style.module.scss';


/**
  * ### Bike form component
  * 
  * Used to create or update bike 
  * 
 */
function BikeForm({
  bikeData = {},

  isDisabled = false,
  submitText = BUTTONS.SUBMIT,
  handleSubmit = (e) => { e.preventDefault(); console.log('Submit btn clicked') },

  messageText = "",
  isError = true

}) {
  // import constant bike text
  const { NICKNAME, TYPE, ELECTRIC, NOTES, MANUFACTURE, MODEL } = INPUTS.BIKE;

  // fetch bike types
  const { data: bikeTypes, isLoading } = useFetchData(BikeServices.getBikeTypes);

  // form inputs values
  const [inputs, setInputs] = useState(bikeData);


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

  return (
    <form className={style.form}>
      {isLoading
        ? <LoadingSpinner />
        : (<div className={style.formInputs}>
          <FormRow>
            <InputText
              name="nickname"
              label={NICKNAME.LABEL}
              placeholder={NICKNAME.PLACEHOLDER}
              type={NICKNAME.TYPE}
              onChange={handleChange}
              value={inputs.nickname || ''}
              required
            />
            <InputToggle
              name="isElectric"
              label={ELECTRIC.LABEL}
              type={ELECTRIC.TYPE}
              onChange={handleChange}
              checked={inputs.isElectric || false}
              value={inputs.isElectric || false}
            />
          </FormRow>
          <FormRow>
            <InputText
              name="manufacturer"
              label={MANUFACTURE.LABEL}
              placeholder={MANUFACTURE.PLACEHOLDER}
              type={MANUFACTURE.TYPE}
              onChange={handleChange}
              value={inputs.manufacturer || ''}
            />
            <InputText
              name="model"
              label={MODEL.LABEL}
              placeholder={MODEL.PLACEHOLDER}
              type={MODEL.TYPE}
              onChange={handleChange}
              value={inputs.model || ''}
            />
            <InputSelect
              name="typeId"
              label={TYPE.LABEL}
              onChange={handleChange}
              value={inputs.typeId || 0}
              required
            >
              <option value={0}>{TYPE.LABEL}</option>
              {bikeTypes && bikeTypes.map((type) => <option key={type.typeId} value={type.typeId}>{type.name}</option>)}
            </InputSelect>
          </FormRow>
          <FormRow>
            <InputTextarea
              name="notes"
              label={NOTES.LABEL}
              placeholder={NOTES.PLACEHOLDER}
              onChange={handleChange}
              value={inputs.notes || ''}
              required
            />
          </FormRow>
        </div>)}

      <Button className={style.formSubmit} onClick={(e) => handleSubmit(e, inputs)} isDisabled={isDisabled}>{submitText}</Button>
      <MessageText
        className={style.errorMessage}
        text={messageText}
        isError={isError}
      />
    </form>
  )
}

export default BikeForm;