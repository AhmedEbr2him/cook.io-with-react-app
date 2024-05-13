import { PropTypes } from 'prop-types';
const SkeletonSlider = ({ cuisineType }) => {
  const skeletonCards = [];
  for (let i = 0; i < 10; i++) {
    skeletonCards.push(
      <li key={i} className='slider-item'>
        <div className='card skeleton-card'>
          <div className='skeleton card-banner'></div>
          <div className='card-body'>
            <div className='skeleton card-title'></div>
            <div className='skeleton card-text'></div>
          </div>
        </div>
      </li>
    );
  }
  return (
    <div className='container'>
      <div className='slider'>
        <ul className='slider-wrapper'>{skeletonCards}</ul>
      </div>
    </div>
  );
};
export default SkeletonSlider;

SkeletonSlider.propTypes = {
  cuisineType: PropTypes.string,
};
