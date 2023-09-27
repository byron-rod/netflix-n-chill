import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import Modal from "./ErrorModal";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuth();
  const [saved, setSaved] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const movieID = doc(db, "users", `${currentUser?.email}`);

  const saveShow = async (movie) => {
    if (currentUser?.email) {
      if (saved === movie.id) {
        setSaved(null);
        await updateDoc(movieID, {
          savedShows: arrayRemove(movie.id),
        });
      } else {
        setSaved(movie.id);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: movie.id,
            title: movie.title,
            img: movie.backdrop_path,
          }),
        });
      }
    } else {
      setErrorMessage("You must be logged in to save shows.");
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft -= 200;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft += 200;
  };

  return (
    <>
      <h2
        className="text-white font-bold text-2xl md:text-3xl p-4"
        style={{ fontFamily: "Netflix Sans, sans-serif" }}
      >
        {title}
      </h2>
      <div className="relative flex items-center">
        <MdChevronLeft
          onClick={slideLeft}
          size={80}
          className="absolute left-0 text-4xl text-white cursor-pointer z-10"
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative inline-block"
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt={movie?.title}
                className="object-contain w-[150px] h-[250px] md:w-[200px] md:h-[300px] xl:w-[250px] xl:h-[350px] mr-2 md:mr-4 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
              />
              {hoveredMovie?.id === movie.id && (
                <p>
                  {saved === movie.id ? (
                    <FaHeart
                      className="absolute top-5 left-4 text-2xl text-gray-300 cursor-pointer"
                      onClick={() => saveShow(movie)}
                    />
                  ) : (
                    <FaRegHeart
                      className="absolute top-5 left-4 text-2xl text-gray-300 cursor-pointer"
                      onClick={() => saveShow(movie)}
                    />
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={80}
          className="absolute right-0 text-4xl text-white cursor-pointer"
        />
      </div>
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
    </>
  );
};

export default Row;
