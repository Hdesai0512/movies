import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
export default function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.movie.genresLoaded);
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    },[]);

    useEffect(() =>{
        if(genresLoaded) dispatch(fetchMovies({ type: "movies"}));
    })

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
 
};

  return (
    <div>Movies</div>
  )
}
