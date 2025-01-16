import "../style/Section.css"
import Language from "../language"
import { languages } from "../languages.js"
import { useState, useEffect} from 'react'
import Keyboard from "./Keyboard.jsx"

export default()=>{
    const [currentWord, setCurrentWord] = useState("")
  
  
    const arr = currentWord.split("")
    const liters = arr.map(litter=><span>{litter.toUpperCase()}</span>)


    const langs=languages.map(lang=>
    <Language
        key= {lang.name}
        backgroundColor={lang.backgroundColor}
        color={lang.color}
        name={lang.name}
    />
)
    function handelKeyClick(event){
        setCurrentWord(prev=>prev.concat(event.currentTarget.value))
    }
    
    const keyboardLiters = "ABCDEFJHIJKLMNOPQRSTUVWXYZ";
    const buttons = keyboardLiters.split("").map(button=>
        <button onClick={handelKeyClick} value={button}>{button}</button>
    )
    
    return(
        <>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <section className="language-chips">
                {langs}
            </section>

            <section className="word">
                {liters}   
            </section>

            <section className="keyboard">
                {buttons}
            </section>
        </>
    )
}