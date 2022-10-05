import { useEffect, useState } from "react"

const TodoList =({id,onChangeText, onChangeCheck,value,isCheck})=>{
  const [text,setText] = useState(value);
  const [check, setcheck] =useState(isCheck);

  useEffect(()=>{
    setText(value);
    setcheck(isCheck);
  },[value,isCheck])

  useEffect(()=>{
    onChangeText(text,id);
  },[text])

  useEffect(()=>{
    onChangeCheck(check,id)
  },[check])

  const fullheart = process.env.PUBLIC_URL+`/assets/heart_full.png`
  const heart = process.env.PUBLIC_URL+`/assets/heart.png`
  return(
    <div className="TodoList">
      <div className="Todo_check_img" onClick={()=>setcheck(!check)}>
        <img src={check?fullheart:heart}/>     
      </div>
      <div className="Todo_Text">
       <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
      </div>
    </div>
  )
}
TodoList.defaultProps = {
  todotext:"",
  ischeck:false
}

export default TodoList;