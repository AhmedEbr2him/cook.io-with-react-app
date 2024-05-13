import { Link } from 'react-router-dom';
import SkeletonSlider from '../skeleton/SkeletonSlider';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { cardQueries, fetchRecipes } from '../../utils/api';
import { savedRecipes, setChangeSnackbar } from '../../store';
import { getTime } from '../../utils/global';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomeNextArrow from '../CustomArrows/CustomeNextArrow';
import CustomPrevArrow from '../CustomArrows/CustomPrevArrow';

const SliderCarusel = () => {
  const dispatch = useDispatch();
  const cuisineType = useMemo(() => ['Asian', 'French', 'Middle-Eastern'], []);
  const [loading, setLoading] = useState(true);
  const [cuisineRecipes, setCuisineRecipes] = useState([]);
  const [saved, setSaved] = useState(false);
  const { changeSnackbar } = useSelector(state => state.recipesReducer);
  var settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const fetchCuisine = () => {
    setLoading(true);
    for (const cuisine of cuisineType) {
      fetchRecipes([...cardQueries, ['cuisineType', cuisine]], function (data) {
        setCuisineRecipes(prevCuisine => ({
          ...prevCuisine,
          [cuisine]: data.hits,
        }));

        setLoading(false);
      });
    }
  };
  const handleSavedRecipe = (recipe, isSaved) => {
    dispatch(savedRecipes(recipe));
    setSaved(isSaved);
    dispatch(setChangeSnackbar(!changeSnackbar));
  };
  useEffect(() => {
    fetchCuisine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cuisineType.map((type, index) => (
    <section key={index} className='section slider-section'>
      {loading ? (
        <SkeletonSlider />
      ) : (
        <div className='container'>
          <h2 className='section-title headline-small' id={`slider-label- `}>
            Lastest {type} Recipes
          </h2>

          <Slider {...settings} prevArrow={<CustomPrevArrow />} nextArrow={<CustomeNextArrow />}>
            {cuisineRecipes[type] &&
              cuisineRecipes[type].map((recipe, index) => {
                const {
                  recipe: { image, label: title, totalTime: cookingTime, uri },
                } = recipe;

                const recipeId = uri.slice(uri.lastIndexOf('_') + 1);
                const isSaved = localStorage.getItem(`cookie-recipe${recipeId}`);

                return (
                  <li className=' ' key={index}>
                    <div className='card'>
                      <figure className='card-media img-holder'>
                        <img
                          src={image}
                          alt={title}
                          width='195'
                          height='195'
                          loading='lazy'
                          className='img-cover'
                        />
                      </figure>

                      <div className='card-body'>
                        <h3 className='title-small'>
                          <Link to={`/details/${recipeId}`} className='card-link'>
                            {title ?? 'Untitled'}
                          </Link>
                        </h3>
                        <div className='meta-wrapper'>
                          <div className='meta-item'>
                            <span className='material-symbols-outlined' aria-hidden='true'>
                              schedule
                            </span>
                            <span className='label-medium'>
                              {getTime(cookingTime).time || '<1'} {''}
                              {getTime(cookingTime).timeUnit}
                            </span>
                          </div>
                          <button
                            className={`icon-btn has-state ${isSaved ? 'saved' : 'removed'}`}
                            aria-label='Add to saved recipes'
                            onClick={() => handleSavedRecipe(recipe)}
                          >
                            <span
                              className='material-symbols-outlined bookmark-add'
                              aria-hidden='true'
                            >
                              bookmark_add
                            </span>
                            <span className='material-symbols-outlined bookmark' aria-hidden='true'>
                              bookmark
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            {/* SHOW MORE SLIDER ITEM */}
            <li className='slider-item'>
              <Link
                to={`/recipes?cuisineType=${type.trim().toLowerCase()}`}
                className='load-more-card has-state'
              >
                <span className='label-large'>Show more</span>
                <span className='material-symbols-outlined' aria-hidden='true'>
                  navigate_next
                </span>
              </Link>
            </li>
          </Slider>
        </div>
      )}
    </section>
  ));
};
export default SliderCarusel;
