import './mobileNav.css';
import { Link, useLocation } from 'react-router-dom';
const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    {
      label: 'Recipes',
      href: '/recipes',
      icon: 'lunch_dining',
    },
    {
      label: 'Home',
      href: '/',
      icon: 'home',
    },
    {
      label: 'Saved',
      href: '/saved_recipes',
      icon: 'book',
    },
  ];

  return (
    <nav className='mobil-nav' aria-label='primary'>
      <ul className='nav-list'>
        {navItems.map((item, index) => (
          <li className='nav-item' key={index}>
            <Link
              to={item.href}
              className='nav-link'
              aria-current={location.pathname === item.href ? true : false}
            >
              <span className='item-icon'>
                <span className='material-symbols-outlined' aria-hidden='true'>
                  {item.icon}
                </span>
              </span>
              <span className='label-medium'>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default MobileNav;
