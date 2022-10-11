import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const TodoList =({id,onChangeText, onChangeCheck,value,isCheck ,isedit})=>{
  const tmp = useNavigate();
  const [text,setText] = useState(value);
  const [check, setcheck] =useState(isCheck);

  useEffect(()=>{

    setText(value);
    setcheck(isCheck);
  },[value,isCheck])

  useEffect(()=>{
    if(isedit){
      onChangeText(text,id);
    }
  },[text])

  useEffect(()=>{
    if(isedit){
      onChangeCheck(check,id)
    }
  },[check])

  const fullheart = process.env.PUBLIC_URL+`/assets/heart_full.png`
  const heart = process.env.PUBLIC_URL+`/assets/heart.png`
  return(
    <div className="TodoList">
      {isedit?      
          <div className="Todo_check_img" onClick={()=>setcheck(!check)}>
            <img src={check?fullheart:heart}/>     
          </div>:
          <div className="Todo_check_img">
            <img src={check?fullheart:heart}/>     
          </div>
      }
      {isedit?
          <div className="Todo_Text">
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
          </div> :
          <div className="Todo_Text">
            <input type="text" value={text} readOnly={true}/>
        </div>
      }

    </div>
  )
}
TodoList.defaultProps = {
  todotext:"",
  onChangeCheck:null,
  onChangeText:null,
  ischeck:false
}

export default TodoList;