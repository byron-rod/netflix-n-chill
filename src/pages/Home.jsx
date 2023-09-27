import React from "react";
import Main from "../componets/Main";
import Row from "../componets/Row";
import requests from "../Requests";

function Home() {
  return (
    <>
      <Main />
      <Row rowID="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row rowID="2" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowID="3" title="Popular" fetchURL={requests.requestPopular} />
      <Row rowID="4" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowID="5" title="Horror" fetchURL={requests.requestHorror} />
    </>
  );
}

export default Home;
