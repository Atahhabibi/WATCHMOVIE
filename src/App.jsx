import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguartion, getGeners } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detials, Explore, Home, PageNotFound, SearchResult } from "./pages";
import { Footer, Header } from "./components";

function App() {
  const { url } = useSelector((store) => store.home);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromApi("/configuration")
      .then((resp) => {
        const url = {
          backdrop: resp.images.secure_base_url + "original",
          poster: resp.images.secure_base_url + "original",
          profile: resp.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguartion(url))
      })
      .catch((err) => console.log(err));


      genresCall();

  }, []);


  const genresCall=async()=>{
    let promises=[];
    let endPoint=["tv",'movie'];
    let allGeners={};
    endPoint.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data=await Promise.all(promises);

    data?.map(({genres})=>{
       return genres.map((item)=>{
         return allGeners[item.id]=item;
       })
    })

    dispatch(getGeners(allGeners))

  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Detials />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
