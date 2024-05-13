import { useEffect, useState } from 'react';

const ThemeBtn = () => {
  const HTML = document.documentElement;
  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme:dark)').matches);
  const [isPressed, setIsPressed] = useState(true);

  const changeTheme = () => {
    setIsDark(!isDark);
    setIsPressed(!isPressed);
    HTML.setAttribute('data-theme', (HTML.dataset.theme = isDark ? 'light' : 'dark'));
    sessionStorage.setItem('theme', HTML.dataset.theme);
  };

  useEffect(() => {
    if (sessionStorage.getItem('theme')) {
      HTML.dataset.theme = sessionStorage.getItem('theme');
    } else {
      HTML.dataset.theme = isDark ? 'light' : 'dark';
    }
  }, [HTML, isDark]);

  return (
    <>
      <button
        className='icon-btn theme-switch has-state'
        aria-pressed={isPressed}
        aria-label='Toggle light and dark theme'
        onClick={changeTheme}
      >
        <span className='material-symbols-outlined light-icon' aria-hidden='true'>
          light_mode
        </span>
        <span className='material-symbols-outlined dark-icon' aria-hidden='true'>
          dark_mode
        </span>
      </button>
    </>
  );
};
export default ThemeBtn;
