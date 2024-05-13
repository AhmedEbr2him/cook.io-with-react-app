import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../../utils/api';
import SkeletonCard from '../skeleton/SkeletonCard';
import { cardQueries } from '../../utils/api';
import { setRecipes } from '../../store';
import Card from '../card/Card';

const Tabs = () => {
  const dispatch = useDispatch();
  const mealType = ['Breakfast', 'Lunch', 'Brunch', 'Snack', 'Teatime'];
  const [activeTab, setActiveTab] = useState(1);
  const [tabType, setTabType] = useState('breakfast');
  const [loading, setLoading] = useState(true);

  /**
   * LAUNCH API
   */

  const fetchTabRecipes = async () => {
    setLoading(true);

    fetchRecipes([['mealType', tabType], ...cardQueries], function (data) {
      dispatch(setRecipes(data.hits));

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTabRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabType]);

  return (
    /* TAB BUTTONS */
    <section className='section tab'>
      <div className='container'>
        <div className='tab-list' role='tablist' aria-label='Meal type'>
          {mealType.map((meal, index) => (
            <button
              key={`${meal}-${index}`}
              className='tab-btn title-small'
              role='tab'
              id={`tab-${index + 1}`}
              tabIndex={activeTab === index + 1 ? 0 : -1}
              aria-controls={`panel-${index}`}
              aria-selected={activeTab === index + 1}
              onClick={() => {
                setActiveTab(index + 1);
                setTabType(meal);
              }}
            >
              {meal}
            </button>
          ))}
        </div>

        {/* PANEL */}

        {mealType.map((type, index) => (
          <div
            key={`${type}-${index}`}
            role='tabpanel'
            className='tab-panel'
            aria-labelledby={`tab-${index}`}
            id={`panel-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            hidden={activeTab !== index + 1}
          >
            <div className='grid-list'>
              {loading ? <SkeletonCard repeat={12} /> : <Card slice={12} />}
            </div>

            <Link
              to={`/recipes?mealType=${type.trim().toLowerCase()}`}
              className='btn btn-secondary label-large has-state'
            >
              Show More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Tabs;
