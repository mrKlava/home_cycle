import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CountryServices } from "../../services";

import { useAuthContext } from "../../hooks";

import { Button, FormRow, InputSelect, InputText, MessageText, Title } from "../../ui";

import style from './register.module.scss';

import { LINKS, PAGES, BUTTONS, INPUTS, ERRORS } from "../../constants";

/**
 * ### Register Page
 * #### path: /register
 */
function RegisterPage() {
  const navigate = useNavigate();
  const { register, authError, isAuthLoading } = useAuthContext();

  // used to control selection of countries and cities
  const [countries, setCountries] = useState([])
  const [countrySelected, setCountrySelected] = useState(0);
  const [cities, setCities] = useState([]);

  // form inputs values
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",

    email: "",

    country: 0,
    city: 0,

    addressOne: "",
    addressTwo: "",
    zip: "",

    password: "",
    rePassword: "",
  });

  // validation errors
  const [errorText, setErrorText] = useState('');

  /**
   * Handle change of input field
   * 
   * @param {ChangeEvent} e - change event  
   */
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === 'country') setCountrySelected(value);

    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  /**
   * Will validate input onBlur event
   */
  const validateInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    // TO DO: Add validation logic
    console.log({ [key]: value });
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
      const isCreated = await register(inputs);
      if (isCreated) navigate('/login');

    } catch (err) {
      console.log(err);
    }
  }

  /**
   * This function will check if inputs are valid, if not will return error string
   */
  const isInputsValid = () => {
    // check if we all required inputs 
    for (const [key, value] of Object.entries(inputs)) {
      if (key !== 'addressTwo' && !value) return ERRORS.MISSING_REQUIRED_FIELDS;
    }

    // handle password
    if (inputs.password.length < 8) return ERRORS.PASSWORD_SHORT;
    if (inputs.password !== inputs.rePassword) return ERRORS.PASSWORD_NOT_MATCH;

    return '';
  }

  /**
   * Gets list of available countries
   */
  useEffect(() => {
    /**
     * fetch available countries
     */
    const getCountryList = async () => {
      try {
        const { data } = await CountryServices.getCountries();

        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    }

    getCountryList();
  }, [])

  /**
   * Gets list of available cities
   */
  useEffect(() => {
    // reset city related data when we changed country
    setInputs(prev => ({ ...prev, city: 0 }));
    setCities([]);

    // if we did not select country do not fetch cities
    if (countrySelected == 0) return;

    /**
     * Will fetch cities for selected country
     */
    const getCities = async () => {
      try {
        const { data } = await CountryServices.getCountryCities(countrySelected);

        setCities(data);
      } catch (err) {
        console.log(err);
      }
    }

    // fetch cities
    getCities();
  }, [countrySelected])


  return (
    <main className={style.register}>

      <div className={style.registerChild}>
      </div>
      <div className={style.registerChild}>
        <div className={style.registerCard}>
          <Title>{PAGES.REGISTER.TITLE.toUpperCase()}</Title>

          <form className={style.form}>

            <div className={style.formInputs}>

              <FormRow>
                <InputText
                  name="firstname"
                  label={INPUTS.FIRSTNAME.LABEL}
                  placeholder={INPUTS.FIRSTNAME.PLACEHOLDER}
                  type="text"
                  onChange={handleChange}
                  onBlur={validateInput}
                  value={inputs.firstname}
                  required
                />
                <InputText
                  name="lastname"
                  label={INPUTS.LASTNAME.LABEL}
                  placeholder={INPUTS.LASTNAME.PLACEHOLDER}
                  type="text"
                  onChange={handleChange}
                  value={inputs.lastname}
                  required
                />
              </FormRow>
              <FormRow>
                <InputText
                  name="email"
                  label={INPUTS.EMAIL.LABEL}
                  placeholder={INPUTS.EMAIL.PLACEHOLDER}
                  type="email"
                  onChange={handleChange}
                  value={inputs.email}
                  required
                />
              </FormRow>
              <FormRow>
                <InputSelect
                  name="country"
                  label={INPUTS.COUNTRY.LABEL}
                  onChange={handleChange}
                  value={inputs.country}
                  required
                >
                  <option value={0}>Select</option>
                  {countries.map((country) => <option key={country.country_id} value={country.country_id}>{country.name}</option>)}
                </InputSelect>
                <InputSelect
                  name="city"
                  label={INPUTS.CITY.LABEL}
                  onChange={handleChange}
                  value={inputs.city}
                  required
                >
                  <option value={0}>Select</option>
                  {cities.map((city) => <option key={city.city_id} value={city.city_id}>{city.name}</option>)}
                </InputSelect>
              </FormRow>
              <FormRow>
                <InputText
                  name="addressOne"
                  label={INPUTS.ADDRESS_ONE.LABEL}
                  placeholder={INPUTS.ADDRESS_ONE.PLACEHOLDER}
                  type="text"
                  onChange={handleChange}
                  value={inputs.addressOne}
                  required
                />
              </FormRow>
              <FormRow>
                <InputText
                  name="addressTwo"
                  label={INPUTS.ADDRESS_TWO.LABEL}
                  placeholder={INPUTS.ADDRESS_TWO.PLACEHOLDER}
                  type="text"
                  onChange={handleChange}
                  value={inputs.addressTwo}
                />
                <InputText
                  name="zip"
                  label={INPUTS.ZIP_CODE.LABEL}
                  placeholder={INPUTS.ZIP_CODE.PLACEHOLDER}
                  type="text"
                  onChange={handleChange}
                  value={inputs.zip}
                  required
                />
              </FormRow>
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

            <Button onClick={handleSubmit} isDisabled={isAuthLoading}>{BUTTONS.REGISTER}</Button>
            <div className={style.login}>
              <p>{PAGES.REGISTER.CALL_ACTION_LOGIN}</p>
              <Link className={style.loginLink}
                to={LINKS.LOGIN.PATH}
              >
                {LINKS.LOGIN.TEXT}
              </Link>
            </div>
          </form>

          <MessageText
            className={style.errorMessage}
            text={authError || errorText}
            isError={true}
          />
        </div>
      </div>

    </main>
  )
}

export default RegisterPage;