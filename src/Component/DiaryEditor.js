import Header from "./Header";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";
import EmoitonItem from "./EmotionItem";
import { useContext, useEffect, useRef, useState } from "react";
import { emotionList } from "../Util/Emotion";
import TodoList from "./TodoList";
import { DiaryDispatchContext } from "../App";
import { GetStringDate } from "../Util/Date";

const DiaryEditor=({isEdit, data})=>{
  const todolistId = useRef(0);
  const [emotion,setEmotion]=useState(3);
  const [todoText,setTodoText] = useState([{id:todolistId.current, value :'' ,isCheck : false}]);
  const [content, setContent] = useState("");
  const [date, setDate]=useState(GetStringDate(new Date()));
  const nevigate = useNavigate();
  const {onCreate,onEdit,onRemove} = useContext(DiaryDispatchContext);

  useEffect(()=>{
    if(isEdit){
      setEmotion(data.emotion);
      setDate(GetStringDate(new Date(parseInt(data.date))));
      setContent(data.content);
      setTodoText(data.todolist);
    }
  },[isEdit,data])

  const emotionHandler=(emotion_id)=>{
    setEmotion(emotion_id);
  }

  const todolistHandler=(text,index)=>{
    const filterlist = todoText.map((it)=>it.id===index ? {id : index, value:text ,isCheck:it.isCheck} :it);
    setTodoText(filterlist);
  }
  const todoCheckHandler =(isCheck, index)=>{
    const filterlist = todoText.map((it)=>it.id===index ? {id : index, value:it.value ,isCheck:isCheck} :it);
    setTodoText(filterlist);
  }

  const addTodolist =()=>{   
    ++todolistId.current
    const copylist= [...todoText,{id:todolistId.current,value:'',isCheck:false}]
    setTodoText(copylist);
  }

  const submitHandler=()=>{
    if(window.confirm(isEdit ?'수정하시겠습니까?' : '저장하시겠습니까?')){
      if(isEdit){
        onEdit(data.id,date, content, emotion, todoText);
      }else{
        onCreate(date, content, emotion, todoText);
      }
      nevigate('/',{replace:true});
    } 
  }

  const RemoveHandler=()=>{
    if(window.confirm('정말 삭제하시겠습니까?')){
      onRemove(data.id);
      nevigate('/',{replace:true})
    }
  }
  return(
    <div className="DiaryEditor">
      <Header headtext={isEdit ?'일기 수정하기':'새 일기쓰기'} 
      leftChild={<Button text={'< 뒤로가기'} onClick={()=>nevigate(-1)}/>}
      rightChild={isEdit? <Button text={'삭제하기'} type={'negative'} onClick={RemoveHandler}/> : null}/>
      <section >
        <h4>오늘은 언제인가요?</h4>
        <div className="new_date_wrapper">
          <input className="input_date" type={'date'} value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>
      </section>
      <section>
      <h4>오늘의 감정</h4>
        <div className="new_Emotion_wrapper">
          {emotionList.map((it)=><EmoitonItem key={it.emotion_id} {...it}
          onClick={emotionHandler} 
          isSelected={it.emotion_id===emotion}/>)}
        </div>        
      </section>
      <section>
        <h4>오늘의 할일</h4>
        <div className="todolist">
          {todoText.map((it,index)=>
          <TodoList 
          key={`list_${index}`} 
          id={index} 
          {...it}
          onChangeText={todolistHandler} 
          onChangeCheck={todoCheckHandler}
          isedit={true}/>)}       
        </div>
        <div className="pulsBtn">
          <img src={process.env.PUBLIC_URL+'/assets/plus.png'} onClick={addTodolist}/>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="textarea_wrapper">
          <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        </div>
      </section>
      <section>
        <div className="btn_wrapper">
          <Button text={"취소하기"} onClick={()=>nevigate(-1,{replace:true})}/>
          <Button text={"작성완료"} type={"positive"}onClick={submitHandler} />
        </div>
      </section>
    </div>
  )
}

export default DiaryEditor;