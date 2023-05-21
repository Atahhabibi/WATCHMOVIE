import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import { Popular, TopRated, Trending } from "..";
const Home = () => {

  return (
    <div className="homePage">
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  );
};

export default Home;
