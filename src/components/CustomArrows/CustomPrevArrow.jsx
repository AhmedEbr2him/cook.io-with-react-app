const CustomPrevArrow = ({ onClick }) => {
  return (
    <button className='icon-btn custom-arrow prev-arrow' onClick={onClick}>
      <span className=' material-symbols-outlined'>arrow_back</span>
    </button>
  );
};
export default CustomPrevArrow;
