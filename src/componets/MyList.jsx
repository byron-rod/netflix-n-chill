import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const MyList = () => {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (currentUser?.email) {
      const userDocRef = doc(db, "users", currentUser.email);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setMovies(doc.data().savedShows || []);
        } else {
          console.log("User document does not exist.");
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser?.email]);

  const deleteShow = async (showIdToDelete) => {
    try {
      if (currentUser?.email) {
        const userDocRef = doc(db, "users", currentUser.email);

        const userDocSnapshot = await getDoc(userDocRef);
        const savedShows = userDocSnapshot.data()?.savedShows || [];

        const showIndexToDelete = savedShows.findIndex(
          (show) => show.id === showIdToDelete
        );

        if (showIndexToDelete !== -1) {
          savedShows.splice(showIndexToDelete, 1);

          await updateDoc(userDocRef, {
            savedShows: savedShows,
          });

          console.log("Show deleted successfully!");
        } else {
          console.log("Show not found in savedShows.");
        }
      }
    } catch (error) {
      console.error("Error deleting show:", error);
    }
  };

  return (
    <>
      <div
        id={"slider"}
        className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-flex cursor-pointer relative p-2"
            style={{ flex: "0 0 auto" }}
          >
            <img
              className="w-full h-auto block"
              src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
              alt={movie?.title}
            />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
              <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                {movie?.title}
              </p>
              <p
                onClick={() => deleteShow(movie.id)}
                className="absolute text-grey-300 top-4 right-4"
              >
                <AiOutlineClose />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyList;
