import './footer.css';
import { Link } from 'react-router-dom';
import { staticImages } from '../../../utils/images';
const Footer = () => {
  return (
    <footer className='footer'>
      <p className='copyright body-medium'>
        Copyright 2024&nbsp;
        <Link to='https://github.com/AhmedEbr2him'>
          <b>
            <u>ahmedebrahim</u>.
          </b>
        </Link>
        &nbsp;& main template from&nbsp;
        <Link to='https://www.youtube.com/@codewithsadee'>
          <b>
            <u>codewithsadee</u>
          </b>
        </Link>
      </p>

      <Link href='/' className='logo'>
        <img
          src={staticImages.logoLight}
          width='156'
          height='32'
          alt='Cook.io'
          className='light-logo'
        />
        <img
          src={staticImages.logoDark}
          width='156'
          height='32'
          alt='Cook.io'
          className='dark-logo'
        />
      </Link>

      <Link to='https://www.edamam.com/' target='_blank' className='edamam'>
        <img
          src={staticImages.edamamLogo}
          width='200'
          height='40'
          loading='lazy'
          alt='edamam free recipe api'
        />
      </Link>
    </footer>
  );
};
export default Footer;
