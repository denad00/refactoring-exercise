import React, {useState, useEffect} from 'react';
import './App.css';
import Character from './components/Character';


export default function App() {
  const[title, setTitle] = useState('My Game')
  const[characters, setCharacters] = useState([])
  const [comment, setComment] = useState([])

  useEffect(() => {
    const getCharacters = async () => {
      const charactersFromServer = await fetchCharacters()
      setCharacters(charactersFromServer)
    }
    getCharacters()
  }, [])

  useEffect(() => {
    document.title = title
  }, [])

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

  // Add Comment
  const addComment = async (id, comment) => {
    const commentToAdd = await fetchCharacter(id);
    const insertComment = {
      ...commentToAdd,
      comment: comment,
    };

    await fetch(`http://localhost:5002/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(insertComment),
    });

    const res = await fetchCharacters();
    setComment(res);
 }

 //Add Health
 const addHealth = async(id, health, gold) => {
  console.log(id, health, gold, 'fetch')
  const changeHealth = await fetchCharacter(id);
  const updHealth = {
    ...changeHealth,
    health: health,
    gold: gold,
  };

  await fetch(`http://localhost:5002/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updHealth),
  });

 }

 //Add Stamina
 const addStamina = async(id, stamina, gold) => {
  const changeStamina = await fetchCharacter(id);
  const updStamina = {
    ...changeStamina,
    stamina: stamina,
    gold: gold,
  };

  await fetch(`http://localhost:5002/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updStamina),
  });
 }

 //Add Gold
 const addGold = async(id, health, stamina, gold) => {
  const changeGold = await fetchCharacter(id);
  const updGold = {
    ...changeGold,
    health: health,
    stamina: stamina,
    gold: gold
  };

  await fetch(`http://localhost:5002/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updGold),
  });


 }

 //Change Location
 const addLocation = async (id, location, gold) => {
  const locationToAdd = await fetchCharacter(id);
  const insertLocation = {
    ...locationToAdd,
    location: location,
    gold: gold
  };

  await fetch(`http://localhost:5002/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(insertLocation),
  });

  const res = await fetchCharacters();
  setComment(res);
}


  // Show Characters on Page
  const listComp = () => {
    return characters.map((characters, i) => 
      <Character 
        key = {i} 
        name = {characters.name} 
        race = {characters.race} 
        health = {characters.health} 
        stamina = {characters.stamina}
        gold = {characters.gold}
        location = {characters.location}
        comment={characters.comment} 
        id={characters.id} 
        onName = {editName} 
        onComment = {addComment}
        onHealth = {addHealth}
        onStamina = {addStamina}
        onGold = {addGold}
        onLocation = {addLocation}

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