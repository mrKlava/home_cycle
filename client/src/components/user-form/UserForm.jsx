import { useEffect, useState } from 'react';

import { CountryServices } from '../../services';

import { Button, FormRow, InputSelect, InputText, MessageText } from '../../ui';

import style from './user-form.module.scss';

import { INPUTS } from '../../constants';
import axios from 'axios';

/**
  * ### User form component
  * 
  * Used to create and update user 
  * 
 */
function UserForm({
  handleSubmit = () => console.log('Submit button clicked'),
  submitText = "submit",
  isDisabled = false,
  userData = {},
  errorText = '',
  setErrorText = () => '',
  isPassword = false

}) {
  // used to control selection of countries and cities
  const [countries, setCountries] = useState([])
  const [countrySelected, setCountrySelected] = useState(0);
  const [cities, setCities] = useState([]);

  // form inputs values
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",

    email: "",

    countryId: 0,
    cityId: 0,

    addressOne: "",
    addressTwo: "",
    zip: "",

    password: "",
    rePassword: "",
  });

  // validation errors

  /**
   * Handle change of input field
   * 
   * @param {ChangeEvent} e - change event  
   */
  const handleChange = (e) => {
    setErrorText('');

    const key = e.target.name;
    const value = e.target.value;

    if (key === 'countryId') setCountrySelected(value);

    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    async function test(q) {
      try {
        const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${q}&apiKey=${import.meta.env.VITE_API_KEY_AUTO_COMPLETE}`)
  
        console.log(data.features)
      } catch (err) {
        console.log(err)
      }
    } 
    if (inputs.addressOne.length > 5) {
      test(inputs.addressOne);
    }

  }, [inputs.addressOne])

  /**
   * Hoist the inputs to parent
   */
  const hoistInputs = (e) => {
    const {password, rePassword, ...inputData} = inputs;
    handleSubmit(e, inputData);
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
    setInputs(prev => ({ ...prev, cityId: 0 }));
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

  /**
   * Will update input values if we provide user data
   */
  useEffect(() => {
    if (userData) {

      setInputs(prev => {
        return {
          ...prev, ...userData
        }
      });

      setCountrySelected(userData.countryId);
    }
  }, [userData])

  return (
    <form className={style.form}>
      <div className={style.formInputs}>
        <FormRow>
          <InputText
            name="firstname"
            label={INPUTS.FIRSTNAME.LABEL}
            placeholder={INPUTS.FIRSTNAME.PLACEHOLDER}
            type="text"
            onChange={handleChange}
            value={inputs.firstname || ''}
            required
          />
          <InputText
            name="lastname"
            label={INPUTS.LASTNAME.LABEL}
            placeholder={INPUTS.LASTNAME.PLACEHOLDER}
            type="text"
            onChange={handleChange}
            value={inputs.lastname || ''}
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
            value={inputs.email || ''}
            required
          />
        </FormRow>
        <FormRow>
          <InputSelect
            name="countryId"
            label={INPUTS.COUNTRY.LABEL}
            onChange={handleChange}
            value={inputs.countryId || 0}
            required
          >
            <option value={0}>Select</option>
            {countries.map((country) => <option key={country.country_id} value={country.country_id}>{country.name}</option>)}
          </InputSelect>
          <InputSelect
            name="cityId"
            label={INPUTS.CITY.LABEL}
            onChange={handleChange}
            value={inputs.cityId || 0}
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
            value={inputs.addressOne || ''}
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
            value={inputs.addressTwo || ''}
          />
          <InputText
            name="zip"
            label={INPUTS.ZIP_CODE.LABEL}
            placeholder={INPUTS.ZIP_CODE.PLACEHOLDER}
            type="text"
            onChange={handleChange}
            value={inputs.zip || ''}
            required
          />
        </FormRow>

        {isPassword &&
          <FormRow>
            <InputText
              name="password"
              label={INPUTS.PASSWORD.LABEL}
              placeholder={INPUTS.PASSWORD.PLACEHOLDER}
              type="password"
              onChange={handleChange}
              value={inputs.password || ''}
              required
            />
            <InputText
              name="rePassword"
              label={'Re-' + INPUTS.PASSWORD.LABEL}
              placeholder={'Re-' + INPUTS.PASSWORD.PLACEHOLDER}
              type="password"
              onChange={handleChange}
              value={inputs.rePassword || ''}
              required
            />
          </FormRow>
        }

      </div>

      <Button onClick={hoistInputs} isDisabled={isDisabled}>{submitText}</Button>
      <MessageText
        className={style.errorMessage}
        text={errorText}
        isError={true}
      />
    </form>
  )
}

export default UserForm;