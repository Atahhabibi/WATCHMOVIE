import React, { useState, useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { ContentWrapper, Img } from "../../../components";

const HeroBanner = () => {
  const { url } = useSelector((store) => store.home);

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }

    if (e.currentTarget.textContent === "search" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opactiy-layer"></div>

      <ContentWrapper className="wrapper">
        <div className="heroBannerContent">
          <span className="title">StreamNest</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show......."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandler}>search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
