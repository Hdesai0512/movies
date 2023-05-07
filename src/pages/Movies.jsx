import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/Firebase-config';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import styled from 'styled-components';
import NotAvailable from '../components/NotAvailable';
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
        if(genresLoaded) {dispatch(fetchMovies({ type: "movie"}));
    }
}, [genresLoaded]);

const [user, setUser] = useState(undefined);

onAuthStateChanged(firebaseAuth, (currentUser)=>{
   if (currentUser) setUser(currentUser.uid);
   else navigate("/login");
});
window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
 
};

  return  <Container>
   <div className="navbar">
        <Navbar isScrolled={isScrolled} />
   </div>
        <div className="data">
            {
                movies.length ? <Slider movies={movies} /> :
                <NotAvailable />
            }
        </div>
        </Container>
  
}

const Container = styled.div`

.data{
    margin-top: 8rem;
    .not-available {
        text-align: center;
        color: white;
        margin-top:4rem;
    }
}


`