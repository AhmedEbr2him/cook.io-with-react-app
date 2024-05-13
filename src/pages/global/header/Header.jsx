import './header.css';
import { Link } from 'react-router-dom';
import { staticImages } from '../../../utils/images';
import Navbar from './Navbar';
import ThemeBtn from './ThemeBtn';
const Header = () => {
  return (
    <header className='header'>
      {/* LOGO */}
      <Link to={'/'} className='logo'>
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

      {/* NAVBAR ONLY ON BIG QUERIES*/}
      <Navbar />

      {/* THEME SWITCHER BTN  */}
      <ThemeBtn />

      {/* SAVED RECIPES BTN */}
      <Link to='/saved_recipes' className='btn btn-primary has-icon'>
        <span className='material-symbols-outlined' aria-hidden='true'>
          book
        </span>
        <span className='span'>Saved Recipes</span>
      </Link>
    </header>
  );
};
export default Header;
