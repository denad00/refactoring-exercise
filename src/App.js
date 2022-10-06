import React, {useState, useEffect} from 'react';
// import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Character from './components/Character';


export default function App() {
  const[title, setTitle] = useState('My Game')
  const[characters, setCharacters] = useState([])

  useEffect(() => {
    const getCharacters = async () => {
      const charactersFromServer = await fetchCharacters()
      setCharacters(charactersFromServer)
    }
    getCharacters()
  }, [])

  useEffect(() => {
    document.title = title
  })

  // Fetch Characters
  const fetchCharacters = async () => {
    const res = await fetch('http://localhost:5002/characters')
    const data = await res.json()

    return data
  }

  // Fetch single character
  const fetchCharacter = async (id) => {
    const res = await fetch(`http://localhost:5002/characters/${id}`)
    const data = await res.json()

    return data
  }

  // Change Player's Name
  const editName = async (id, name) => {
    const nameToEdit = await fetchCharacter(id);
    const updName = {
      ...nameToEdit,
      name: name,
    };

    console.log(name);

    await fetch(`http://localhost:5002/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updName),
    });

    const res = await fetchCharacters();
    setCharacters(res);

  };

  // Add Health
  

  const listComp = () => {
    return characters.map((characters, i) => 
      <Character 
        key={i} 
        name={characters.name} 
        race={characters.race} 
        status={characters.status} 
        comment={characters.comment} 
        id={characters.id} 
        onName = {editName} 

      />);
  }

  return (
    <div className="App">
      <label htmlFor="titleChange"> Change Page Title</label>
      <input 
        type="text"
        id='titleChange'
        onChange = {e => setTitle(e.target.value)}
      />
      <br />
      <header className="App-header">
        {listComp()}
      </header>
    </div>
  );
}