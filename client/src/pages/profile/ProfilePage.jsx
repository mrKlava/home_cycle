import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchData } from '../../hooks';

import { UserServices } from '../../services';

import { PageHeader, PasswordForm, UserForm } from '../../components';

import { LoadingSpinner } from '../../ui';

import { BUTTONS, ERRORS, PAGES } from '../../constants';

import style from './style.module.scss';

/**
 * ### Profile page
 * #### /app/profile/:userID
 * 
 * This page is used to display and edit user data
 */
function ProfilePage() {
  const { id } = useParams();
  const { data: user, error, isLoading } = useFetchData(UserServices.getUserData, [id]);

  // this is error text which will be printed out
  const [errorText, setErrorText] = useState('');

  /**
   * will update error
   */
  useEffect(() => {
    if (error) setErrorText(error);
  }, [error])

  /**
   * This function is used to try to update user data
   * 
   * @param {SubmitEvent} e submit event  
   * @param {object} inputs user data used in form 
   */
  const handleSubmit = (e, inputs) => {
    e.preventDefault();

    console.log(inputs);

    const inputError = isInputsValid(inputs);
    if (inputError) return setErrorText(inputError);
  }


  /**
   * Works as required field validation
   * Check if user provided all required data 
   * 
   * @param {object} inputs user data 
   * @returns {string} error message
   */
  const isInputsValid = (inputs) => {
    // check if we all required inputs 
    for (const [key, value] of Object.entries(inputs)) {
      if (key === "addressTwo") continue;
      if (!Boolean(value) || value == 0) {
        console.log("Missing", key);
        return ERRORS.MISSING_REQUIRED_FIELDS;
      };
    }
    return '';
  }

  return (
    <main className={`${style.profile}`}>
      <PageHeader title={PAGES.PROFILE.TITLE} />
      <div className='container'>
        {isLoading
          ? <LoadingSpinner />
          : (
            <>
              <section className={style.profileForm}>
                <UserForm
                  handleSubmit={(e, inputs) => handleSubmit(e, inputs)}
                  submitText={BUTTONS.UPDATE}
                  userData={user}
                  errorText={errorText}
                  setErrorText={setErrorText}
                />
              </section>
              <section className={style.profilePassword}>
                <PasswordForm />
              </section>
            </>
          )
        }
      </div>
    </main>
  )
}

export default ProfilePage;