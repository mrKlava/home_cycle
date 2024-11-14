import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../hooks";

import { Button, InputText, MessageText, Title } from "../../ui";

import { BUTTONS, INPUTS, LINKS, PAGES } from "../../constants";

import style from './login.module.scss';

/**
 * ### Login Page
 * #### path: /login
 */
function LoginPage() {
  // init state 
  const { login, authError, isAuthLoading } = useAuthContext();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  // handle change of controlled inputs
  const handleChange = (e) => {
    const tg = e.target;

    setInputs((prev) => ({ ...prev, [tg.name]: tg.value }));
  }

  // pass input data to login function in auth context
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={style.login}>
      <div className={`${style.loginInner} container`}>
        <div className={style.loginCard}>
          <Title>{PAGES.LOGIN.TITLE.toUpperCase()}</Title>
          <form className={style.form}>
            <InputText
              className={style.formInput}
              name="email"
              placeholder={INPUTS.EMAIL.PLACEHOLDER}
              type="email"
              onChange={handleChange}
              value={inputs.username}
            />
            <InputText
              className={style.formInput}
              name="password"
              placeholder={INPUTS.PASSWORD.PLACEHOLDER}
              type="password"
              onChange={handleChange}
              value={inputs.password}
            />
            <Button onClick={handleSubmit} isDisabled={isAuthLoading}>{BUTTONS.LOGIN}</Button>
            <div className={style.register}>
              <p>{PAGES.LOGIN.CALL_ACTION_REGISTER}</p>
              <Link className={style.registerLink}
                to={LINKS.REGISTER.PATH}
              >
                {LINKS.REGISTER.TEXT}
              </Link>
            </div>
          </form>

          <MessageText text={authError} isError={true} />
        </div>
      </div>
    </main>
  )
}

export default LoginPage;