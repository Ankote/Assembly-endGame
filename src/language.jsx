import "./style/Language.css"

export default(props)=>{
    const style = {
        backgroundColor: props.backgroundColor,
        color: props.color
    }

    return(
        <span className="chip" style={style}>{props.name}</span>
    )
}