'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { url } from 'inspector';
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import Image from 'next/image';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { Card } from '@/components/ui/card-hover-effect';
import BackgroundGradientDemo from '@/components/example/background-gradient-demo';
import { SparklesCore } from '@/components/ui/sparkles';
import FlipWordsDemo from '@/components/example/flip-words-demo';
import { FlipWords } from '@/components/ui/flip-words';
import { FloatingNav } from '@/components/ui/floating-navbar';

// Define an interface for the movie object
interface Movie {
  poster_path: any;
  id: number;
  title: string;
  overview: string;
  // Add other properties as needed
}

const Home: React.FC = () => {
  // Ernesto: sätter state till den fetchade movieGenre objektet (discover)
  const [dataMovieGenre, setDataMovieGenre] = useState<Movie[]>([]);
  // Ernest : ändrar state till den valda genre nummer t.ex. nummer 28 = drama
  const [chosenGenre, setChosenGenre] = useState("");
  // Ernesto: sätter data för fetchade url som har en sök api.
  const [searchtMovieData, setSearchtMovieData] = useState<Movie[]>([]);
  //Ernesto: denna state det som sök i searchMovie
  const [searchtMovieName, setSearchtMovieName] = useState("");
  const [hasSearchResults, setHasSearchResults] = useState(false);
  const words = ["DRAMA ", "ACTION ", "ROMANCE ", "COMEDY ", "HORROR "];
  // Vlad constanter i stället för sträng
  // const searchMovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=9bf8866aec070a01073c600a88bbefb5&query="
  // const genreUrl = "https://api.themoviedb.org/3/discover/movie?api_key=9bf8866aec070a01073c600a88bbefb5&with_genres="

  //joel: added navigate/import

  // Ernesto: visar search bilden om inputen inte är null annars visar den genrebilder

  // gets movie posters from api in a search (name, actors, titels)
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
    setSearchtMovieName(event.currentTarget.value);
  };
  useEffect(() => {
    FetchMovies();
  }, [searchtMovieName]);
  return (
    <div>
      <div className="h-[17rem] flex flex-col justify-center  items-center  ">
     
        <div className="h-[40rem] pt-10 w-full bg-black flex flex-col items-center justify-center  rounded-md">
          <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            
            <FlipWords className='font-bold text-white text-[24px] m-12 md:text-[60px]'  words={words} /> <br />
        
          </div>
          
         <div className='w-screen px-4'>
            < PlaceholdersAndVanishInput
              placeholders={["sök filmer här"]}
              onChange={handleMovieNameChange}
              onSubmit={FetchMovies}


            />
         </div>
      
          <div className="w-[50rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.2}
              maxSize={0.9}
              particleDensity={500}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>



      </div>
      {/* <div className="placeholder">
        <div className="flex overflow-x-auto space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setChosenGenre("878")}
          >
            Sci-Fi
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setChosenGenre("18")}
          >
            Drama
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setChosenGenre("80")}
          >
            Crime
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setChosenGenre("10749")}
          >
            Romance
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setChosenGenre("28")}
          >
            Action
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setChosenGenre("16")}
          >
            Animation
          </button>
        </div>
        

        // Button code
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Shimmer
        </button>

      */}


  
          <div className="w-full px-3 overflow-x-auto">
        <div className="flex space-x-1 border-transparent ">
              {searchtMovieData.map((movie, index) => (
                <div key={index}  >
                  <Card className=' p'>

                    <DirectionAwareHover className='' imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Movie poster"
                      className="w-full h-full object-cover"
                      onClick={() => {
                        // Add your onClick handler here
                      }}
                    />
                    </DirectionAwareHover>

                  </Card>
                </div>
              )
            
            )}
            </div>
          </div>
      
          <div className=" m-5 overflow-x-auto  ">
            <div className="flex space-x-24   ">
              {dataMovieGenre.map((movie, index) => (
                <div key={index}>
                  
                  <Card  className='  px-2'> 
                    
                  <DirectionAwareHover className=''  imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}>
                    <p className="font-bold text-xl">{movie.title}</p>
                    <p className="font-normal text-sm">{movie.overview}</p>
                  </DirectionAwareHover>

                  </Card>
             
                  </div>
              ))}
         
            </div>
          </div>
      
    
    </div>
  );
}
export default Home;




