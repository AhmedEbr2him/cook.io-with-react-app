import './skeleton.css';
const DetailsSkeleton = () => {
  return (
    <>
      <div className='detail-banner detail-banner-skeleton skeleton'></div>
      <div className='detail-content detail-content-skeleton'>
        <div className='title-wrapper'>
          <div className='title-skeleton skeleton'></div>
        </div>
        <div className='detail-author text-skeleton skeleton'></div>

        <div className='detail-state'>
          <div className='state-item'>
            <span className='skeleton title-skeleton'></span>
            <span className='skeleton text-skeleton'></span>
          </div>
          <div className='state-item'>
            <span className='skeleton title-skeleton'></span>
            <span className='skeleton text-skeleton'></span>
          </div>
          <div className='state-item'>
            <span className='skeleton title-skeleton'></span>
            <span className='skeleton text-skeleton'></span>
          </div>
        </div>

        <div className='tag-list'>
          <div className='filter-chip skeleton filter-chip-skeleton'></div>
          <div className='filter-chip skeleton filter-chip-skeleton'></div>
          <div className='filter-chip skeleton filter-chip-skeleton'></div>
          <div className='filter-chip skeleton filter-chip-skeleton'></div>
        </div>
        <div className='ingr-title skeleton title-skeleton'></div>
        <div className='ingr-list'>
          <div className='ingr-item skeleton text-skeleton'></div>
          <div className='ingr-item skeleton text-skeleton'></div>
          <div className='ingr-item skeleton text-skeleton'></div>
          <div className='ingr-item skeleton text-skeleton'></div>
        </div>
      </div>
    </>
  );
};
export default DetailsSkeleton;
