import { useSelector } from 'react-redux';
import './snackbar.css';
import { useRef } from 'react';
const Snackbar = () => {
  const { changeSnackbar } = useSelector(state => state.recipesReducer);
  const onAnimationEnd = e => {
    e.target.style.display = 'none';
  };
  return (
    <div className='snackbar-container'>
      <div
        className={`snackbar ${changeSnackbar === true ? 'show' : ''}`}
        onAnimationEnd={onAnimationEnd}
      >
        <p className='body-medium'>Added to Saved Recipes</p>
      </div>
      <div
        className={`snackbar ${changeSnackbar === false ? 'show' : ''}`}
        onAnimationEnd={onAnimationEnd}
      >
        <p className='body-medium'>Removed from Saved Recipes</p>
      </div>
    </div>
  );
};

export default Snackbar;
