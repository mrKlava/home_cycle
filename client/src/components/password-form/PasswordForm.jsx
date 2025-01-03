import { useState } from 'react';

import { Button, FormRow, InputText, MessageText } from '../../ui';

import { BUTTONS, ERRORS, INPUTS } from '../../constants';

import style from './password-form.module.scss';

function PasswordForm() {

  // form inputs values
  const [inputs, setInputs] = useState({
    password: "",
    rePassword: "",
  });

  const [isFetching, setIsFetching] = useState(false);
  const [errorText, setErrorText] = useState('');

  /**
   * Handle change of input field
   * 
   * @param {ChangeEvent} e - change event  
   */
  const handleChange = (e) => {
    setErrorText('');

    const key = e.target.name;
    const value = e.target.value;

    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  /**
   * Try to create account
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('')

    // check if inputs are valid, if not do not send request and set error
    const error = isInputsValid()
    if (error) return setErrorText(error);

    // try to create account
    try {
      // if user is created redirect to login page
      // const isCreated = await register(inputs);

      setIsFetching(true);

      setIsFetching(false);

    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
  }

  /**
   * This function will check if inputs are valid, if not will return error string
   */
  const isInputsValid = () => {
    // handle password length
    if (inputs.password.length < 8) return ERRORS.PASSWORD_SHORT;
    // check if password matches
    if (inputs.password !== inputs.rePassword) return ERRORS.PASSWORD_NOT_MATCH;

    return '';
  }

  return (
    <form className={style.form}>
      <div className={style.formInputs}>
        <FormRow>
          <InputText
            name="password"
            label={INPUTS.PASSWORD.LABEL}
            placeholder={INPUTS.PASSWORD.PLACEHOLDER}
            type="password"
            onChange={handleChange}
            value={inputs.password}
            required
          />
          <InputText
            name="rePassword"
            label={'Re-' + INPUTS.PASSWORD.LABEL}
            placeholder={'Re-' + INPUTS.PASSWORD.PLACEHOLDER}
            type="password"
            onChange={handleChange}
            value={inputs.rePassword}
            required
          />
        </FormRow>
      </div>
      <Button onClick={handleSubmit} isDisabled={isFetching}>{BUTTONS.CHANGE}</Button>
      <MessageText
        className={style.errorMessage}
        text={errorText}
        isError={true}
      />
    </form>
  )
}

export default PasswordForm