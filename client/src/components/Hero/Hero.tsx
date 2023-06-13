import HeroDesktop from '../../assets/hero.png';
import HeroMobile from '../../assets/hero-mobile.png';

const Hero = () => {
  return (
    <picture>
      <source media="(max-width: 668px)" srcSet={HeroMobile} />
      <source media="(max-width: 1200px)" srcSet={HeroDesktop} />
      <img src={HeroDesktop} alt="Store hero image" style={{ width: '100%' }} />
    </picture>
  );
};

export default Hero;
