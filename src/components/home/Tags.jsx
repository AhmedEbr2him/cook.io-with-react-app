import { tags } from '../../constants/mockData';
import { Link } from 'react-router-dom';
const Tags = () => {
  return (
    <section className='section tag' aria-label='taag-label'>
      <div className='container'>
        <h2 className='section-title display-small' id='tag-label'>
          Choose your health preference.
        </h2>
        <p className='body-medium setion-text'>
          Choosing your health preference is an important step towards achieving a healthier
          lifestyle.
        </p>
        <div className='tag-list'>
          {tags.map((tag, index) => (
            <Link
              key={`${tag}-${index}`}
              to={`/recipes?health=${tag.href}`}
              className='badge-btn body-medium has-state'
            >
              {tag.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Tags;
