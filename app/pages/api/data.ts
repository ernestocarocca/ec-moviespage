import { useEffect, useState } from "react";
import axios from "axios";


async function fetchMoviePosters() {
    // Ernesto: sätter state till den fetchade movieGenre objektet (discover)
    const [dataMovieGenre, setDataMovieGenre] = useState([]);
    // Ernest : ändrar state till den valda genre nummer t.ex. nummer 28 = drama
    const [chosenGenre, setChosenGenre] = useState("");
    // Ernesto: sätter data för fetchade url som har en sök api.
    const [searchtMovieData, setSearchtMovieData] = useState([]);
    //Ernesto: denna state det som sök i searchMovie
    const [searchtMovieName, setSearchtMovieName] = useState("");
    const [hasSearchResults, setHasSearchResults] = useState(false);
    const FetchMovies = () => {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=9bf8866aec070a01073c600a88bbefb5&query=${encodeURIComponent(
            searchtMovieName
        )}`;

        // const apiUrl = `${searchMovieUrl}${encodeURIComponent(movieName)}`;

        fetch(apiUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSearchtMovieData(data.results);
            });
    }; // : api with diffrent genre

useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=9bf8866aec070a01073c600a88bbefb5&with_genres=${encodeURIComponent(
        chosenGenre
    )} `;

    // const apiUrl = `${genreUrl}${encodeURIComponent(movie_id)}`;

    axios
        .get(apiUrl)
        .then((response) => {
            setDataMovieGenre(response.data.results);
        })
        .catch((error) => {
            console.log(error);
        });
}, [chosenGenre]);
// Ernesto: kollar om något händer i input
const handleMovieNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtMovieName(event.target.value);
    if (event.target.value) {
        setHasSearchResults(true);
        console.log("inne i if");

        setDataMovieGenre([]);
    } else {
        setHasSearchResults(false);
        console.table("är inne  i else", dataMovieGenre);
        setChosenGenre("");
    }
};
useEffect(() => {
    FetchMovies();
}, [searchtMovieName]);
return {
    dataMovieGenre,
    chosenGenre,
    setChosenGenre,
    searchtMovieData,
    searchtMovieName,
    handleMovieNameChange,
    hasSearchResults,
};
}
export default fetchMoviePosters;


