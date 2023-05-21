import React, { useState } from "react";
import { Carousel, ContentWrapper, SwitchTabs } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endpoint, setEnpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEnpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />

    </div>
  );
};

export default Trending;
