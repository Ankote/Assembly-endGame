import "../style/Keyboard.css"


export default()=>{
    const liters = "ABCDEFJHIJKLMNOPQRSTUVWXYZ";
    const buttons = liters.split("").map(button=>
        <button value={button}>{button}</button>
    )
    return(
        <section className="keyboard">
            {buttons}
        </section>
    )
}