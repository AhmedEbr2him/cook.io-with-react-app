import './skeleton.css';
const SkeletonCard = ({ repeat }) => {
  const skeletonCards = [];

  for (let i = 0; i < repeat; i++) {
    skeletonCards.push(
      <div key={i} className='card skeleton-card'>
        <div className='skeleton card-banner'></div>
        <div className='card-body'>
          <div className='skeleton card-title'></div>
          <div className='skeleton card-text'></div>
        </div>
      </div>
    );
  }
  return skeletonCards;
};
export default SkeletonCard;
