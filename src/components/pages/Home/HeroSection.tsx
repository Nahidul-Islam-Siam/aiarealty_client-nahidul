import SearchForm from "./SearchForm";
import './hero.css'
const Hero = () => {
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover relative font-inter text-base md:text-xl md:mb-24 mb-16"
      style={{
        backgroundImage: 'url("/assets/hero.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-[-10%] w-full">
        <div className="max-w-7xl mx-auto px-4">
       <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
