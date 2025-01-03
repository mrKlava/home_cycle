import { Title } from '../../ui';

import style from './style.module.scss';

/**
 * Used to render the header of page 
 * 
 * @param {string} title title of page
 * @returns 
 */
function PageHeader({ title = "Title" }) {
  const BG_IMAGE = {
    backgroundImage: `url(${getBackground(title)})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  /**
   * 
   * @param {string} title title of page 
   * @returns {string} background path
   */
  function getBackground(title) {
    const PATH = "/assets/img/bg/";

    const bgs = {
      default: "bg-login.jpg",
      profile: "bg-register.jpg",
      bikes: "bg-login.jpg",
    };

    return PATH + (bgs[title] || bgs["default"]);
  }

  return (
    <header className={style.header} style={BG_IMAGE}>
      <div className='container'>
        <Title>{title}</Title>
      </div>
    </header>
  )
}

export default PageHeader;