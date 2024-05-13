import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accordionItem } from '../../constants/mockData';
import { setfilterAcitve } from '../../store';

const Filterbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { isActive } = useSelector(state => state.recipesReducer);
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerName, setContainerName] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [isChecked, setIsChecked] = useState(null);
  const [accordionIndex, setIccodionIndex] = useState();
  const searchRef = useRef(null);

  const handleAccordion = index => {
    setIsExpanded(index === isExpanded ? null : index);
  };

  const handleChange = e => {
    const inputValue = e.target.value;
    const inputParent = e.target.parentElement.parentElement.dataset.filter;
    setInputValue(prevState => [...prevState, inputValue]);
    setContainerName(prevState => [...prevState, inputParent]);
  };

  const handleSubmit = () => {
    let queries = [];
    if (searchValue) queries.push(['q', searchValue]);

    for (let i = 0; i < inputValue.length; i++) {
      queries.push([containerName[i], inputValue[i].toLowerCase()]);
    }
    navigate(queries.length ? `/recipes?${queries.join('&').replace(/,/g, '=')}` : '/recipes');

    dispatch(setfilterAcitve(!isActive));
  };

  const handleInputSearchButtonEvent = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const getCheked = index => {
    setIsChecked(`${accordionIndex}-${index}`);
  };
  const handleClear = () => {
    setInputValue([]);
    dispatch(setfilterAcitve(!isActive));
    navigate('/recipes');
    setIsChecked(null);
  };

  return (
    <>
      <div className={`filter-bar ${isActive ? 'active' : ''}`}>
        <div className='title-wrapper'>
          <span className='material-symbols-outlined' aria-hidden='true'>
            filter_list
          </span>

          <p className='title-medium'>Filters</p>

          <button
            className='icon-btn close-btn has-state'
            aria-label='Close filter bar'
            onClick={() => dispatch(setfilterAcitve(isActive))}
          >
            <span className='material-symbols-outlined' aria-hidden='true'>
              close
            </span>
          </button>
        </div>

        {/* FILTER CONTENT (SEARCH & ACCODIONS ) */}
        <div className='filter-content'>
          {/* SEARCH FIELD */}
          <div className='search-wrapper'>
            <div className='input-outlined'>
              <label htmlFor='search' className='label body-large'>
                Search
              </label>

              <input
                type='search'
                name='search'
                id='search'
                placeholder='Search recipes'
                className='input-field body-large'
                onChange={e => setSearchValue(e.target.value)}
                ref={searchRef}
                onKeyDown={e => handleInputSearchButtonEvent(e)}
              />
            </div>
          </div>

          {/* ACCORDION CONTENT */}
          {accordionItem.map((accordion, index) => {
            //ACCORDION EXPANDED
            const isAriaExpanded = index === isExpanded;
            // ----------------//
            return (
              <div className='accordion-container' key={index}>
                <button
                  className='accordion-btn has-state'
                  aria-controls={accordion.name}
                  aria-expanded={isAriaExpanded}
                  onClick={() => {
                    handleAccordion(index);
                    setIccodionIndex(index);
                  }}
                >
                  <span className='material-symbols-outlined' aria-hidden='true'>
                    {accordion.icon}
                  </span>
                  <p className='label-large'>{accordion.title}</p>

                  <span className='material-symbols-outlined trailing-icon' aria-hidden='true'>
                    expand_more
                  </span>
                </button>

                <div className='accordion-content' id={accordion.container}>
                  <div className='accordion-overflow' data-filter={accordion.filter}>
                    {accordion.data.map((item, index) => {
                      return (
                        <label key={index} className='filter-chip label-large'>
                          {item.label}
                          <input
                            type={item.type}
                            name={item.name}
                            aria-label={item.name}
                            value={item.value}
                            className='checkbox'
                            checked={isChecked === `${accordionIndex}-${index}`}
                            onChange={e => {
                              handleChange(e), getCheked(index);
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='filter-actions'>
          <button className='btn btn-primary label-large' onClick={handleSubmit}>
            Apply
          </button>
          <button className='btn btn-secondary label-large has-state' onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <div
        className={`overlay ${isActive ? 'active' : ''}`}
        onClick={() => dispatch(setfilterAcitve())}
      ></div>
    </>
  );
};
export default Filterbar;
