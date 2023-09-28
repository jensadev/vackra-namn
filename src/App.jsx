import { useState, useEffect } from 'react'
import './App.css'
import adjektiv from './assets/adjektiv.json'
import substantiv from './assets/substantiv.json'
import { HiHeart } from "react-icons/hi";

function App() {
  const [userName, setUserName] = useState()
  const [favourites, setFavourites] = useState(
    localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [])
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  function generateUserName() {
    let adj = getRandomInt(0, adjektiv.length);
    let sub = getRandomInt(0, substantiv.length);
    setUserName(
      capitalizeFirstLetter(adjektiv[adj]) +
      capitalizeFirstLetter(substantiv[sub]) +
      getRandomInt(1, 1000)
    );
  }

  function addFavourite() {
    setFavourites(favourites.concat(userName))
  }

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  // klicka på orden för att förklara dem, typ wiki
  const baseUrl = 'https://sv.wikipedia.org/wiki/'

  return (
    <div className='flow'>
      <h1>{userName}</h1>
      <div className='space-between'>
        <button onClick={() => generateUserName()}>Username please</button>
        <button onClick={() => addFavourite()}><HiHeart /></button>
      </div>
      <ul role='list' className='favourites flow'>
        {favourites.map((favourite, index) => (
          <li key={index}>{favourite}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
