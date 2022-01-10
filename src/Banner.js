import React,{ useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';

import './Banner.css'

function Banner() {
    
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, [])
    function truncate(str , n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    const handleClick = () => {
        window.open("https://www.netflix.com/in/");
    };
    return (
        <header className="banner"
            style={{
               backgroundSize: "cover",
               backgroundImage: `url(
                   "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
               )`,
               backgroundPosition:"center center",
            }}
        >
            <div className="banner-contents">
                <h1 className="banner-title"> {movie?.title ||movie?.name ||movie?.original_name} </h1>
                <div className="banner-btns">
                    <button className="banner-btn" onClick={() => handleClick()}>Play</button>
                    <button className="banner-btn" onClick={() => handleClick()}>My List</button>
                </div>
                <h1 className="banner-desc">
                    {truncate(movie?.overview , 200)}
                </h1>
            </div>
            <div className="banner-fade"></div>
        </header>
    )
}

export default Banner
