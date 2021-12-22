import React from 'react'
import { useContext,useState } from 'react';

import { MovieContext } from './MovieContext';
import Player from './Player';
const MainPage = () => {
    const[movies,setmovies,room,setroom,link,setlink,name,setname] = useContext(MovieContext);
    return (
        <div>
           <Player />
            
        </div>
    )
}

export default MainPage
