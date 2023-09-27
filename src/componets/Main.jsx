import React, { useState, useEffect } from "react";
import requests from "../Requests";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  console.log(movie);

  const truncate = (string, n) => {
    if (string && string.length > n) {
      return string.substring(0, n - 1) + "...";
    } else {
      return string;
    }
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-100 text-black py-2 px-5">
              Play
            </button>
            <Link to="/account">
              <button className="border text-white border-gray-300 py-2 px-5 ml-3">
                My List
              </button>
            </Link>
            <div>
              <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mt-2">
                {truncate(movie?.overview, 250)}
              </p>
              <p className="text-sm md:text-md mt-4">
                Released: {movie?.release_date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
