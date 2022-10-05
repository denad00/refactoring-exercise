import React, {useState} from 'react';
import './Character.css';

const Character = (props) => {
    const[name, setName] = useState(props.name)
    const[health, setHealth] = useState('150')
    const [stamina, setStamina] = useState('200')
    const[gold, setGold] = useState('75')

    return (
        <div>
            <h2>{name}'s Bio:</h2>
            <p>Race: {props.race}</p>
            <p>Status: <br />
                Health at {health} <br />
                Stamina at {stamina} <br />
            </p>
            <p>Gold: {gold}</p>
            <p className={props.comment ? 'visible' : 'hidden'}>Comment: {props.comment}</p>

            <button onClick={() => {
                setHealth(parseInt(health) + 10);
                setGold(parseInt(gold) - 2);
            }}>
                Add 10 health (Costs 2 Gold)
            </button><br />

            <button onClick={() => {
                setStamina(parseInt(stamina) + 5);
                setGold(parseInt(gold) - 1);
            }}>
                Add 5 Stamina (Costs 2 Gold)
            </button><br />

            <button onClick={() => {
                setGold(parseInt(gold) + 3)
                setHealth(parseInt(health) - 10);
                setStamina(parseInt(stamina) - 5);
            }}>
                Add 3 Gold (Cost 10 Health and 5 Stamina)
            </button> <br />

            <label htmlFor="nameChange">Change Player's Name:</label><br />
            <input 
                type="text"
                id='nameChange'
                onChange = {e => setName(e.target.value)}
            />

        </div>
    )
}

export default Character;