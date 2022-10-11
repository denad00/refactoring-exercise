import React, {useState} from 'react'

const Character = (props) => {
    const[name, setName] = useState(props.name)
    const[health, setHealth] = useState(props.health)
    const [stamina, setStamina] = useState(props.stamina)
    const[gold, setGold] = useState(props.gold)
    const [comment, setComment] = useState(props.comment)
    const [location , setLocation] = useState(props.location)

    return (
        <div>
            <h2>{name}'s Bio:</h2>
            <p>Race: {props.race}</p>

            <section className="status">
                <p>Status: <br />
                    Health at {health} <br />
                    Stamina at {stamina} <br />
                </p>
                <p>Gold: {gold}</p>
                <button onClick={() => {
                    setHealth(parseInt(health) + 10);
                    setGold(parseInt(gold) - 2);
                    props.onHealth(props.id, health+10, gold-2)
                }}>
                    Add 10 health (Costs 2 Gold)
                </button>
                <button onClick={() => {
                    setStamina(parseInt(stamina) + 5);
                    setGold(parseInt(gold) - 1);
                    props.onStamina(props.id, stamina+5, gold-1)
                }}>
                    Add 5 Stamina (Costs 2 Gold)
                </button>
                <button onClick={() => {
                    setHealth(parseInt(health) - 10);
                    setStamina(parseInt(stamina) - 5);
                    setGold(parseInt(gold) + 3);
                    props.onGold(props.id, health-10, stamina-5, gold+3)
                }}>
                    Add 3 Gold (Cost 10 Health and 5 Stamina)
                </button>
                
            </section>


            <section className="location">
                <p>Location: {location}</p>
                <label htmlFor="locationChange">Change Player's Location:</label>
                <input 
                    type="text"
                    id='locationChange'
                    onChange = {e => setLocation(e.target.value)}
                />
                <button onClick={(e) => {
                    setGold(parseInt(gold) - 1)
                    props.onLocation(props.id, location, (gold -1)
                    )}}>
                    Change Location (Costs 1 Gold)
                </button>
            </section>

            <section className="comment">
                <p className={props.comment ? 'visible' : 'no comment'}>Comment: {comment}</p>
                <label>Add/Edit Comment:</label>
                <input
                    type="text"
                    placeholder="Add Comment"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => {props.onComment(props.id, comment)}}>Save Comment</button>
            </section>

            <section className="change-name">
                <label htmlFor="nameChange">Change Player's Name:</label>
                <input
                    type="text"
                    id='nameChange'
                    onChange = {e => setName(e.target.value)}
                />
                <button onClick={(e) => {
                    props.onName(props.id, name
                    )}}>Save</button>
            </section>

        </div>
    )
}

export default Character;