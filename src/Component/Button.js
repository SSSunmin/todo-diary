
const Button=({text, onClick, type})=>{

  const btntype =['positive','negative'].includes(type)? type : 'basic';
  
  return(
    <button className={["button",`button_${btntype}`].join(" ")} onClick={onClick}>{text}</button>
  )

}

Button.defaultProps={
  type:"basic"
}
export default Button;