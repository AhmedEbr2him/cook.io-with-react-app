import './Home.css';
import Hero from '../../components/home/Hero';
import SliderCarusel from '../../components/home/Slider';
import Tabs from '../../components/home/Tabs';
import Tags from '../../components/home/Tags';

const Home = () => {
  return (
    <main>
      <Hero />
      <Tabs />
      <SliderCarusel />
      <Tags />
    </main>
  );
};
export default Home;
