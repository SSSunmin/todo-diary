import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem =({id, emotion, content, date,todolist})=>{
  const nevigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail =()=>{
    nevigate(`/detail/${id}`)
  }
  const goEdit =()=>{
    nevigate(`/edit/${id}`)
  }
  const getSuccessPercent=()=>{
    let count = 0;
    todolist.map((it)=> it.isCheck? count++: count);  
    return  Math.floor((count/todolist.length)*100);
  }

  return(
    <div className="DiaryItem">
      <div onClick={goDetail} className={['emotion_wrapper',`emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL+`assets/emotion${emotion}.png`}/>
      </div>
      <div onClick={goDetail} className={"info_wrapper"}>
        <div className="dirary_date_wrapper">
          <div className="dirary_date">{strDate}</div>
          <div className="diary_content_preview">{content.slice(0,12)}</div>       
        </div>
          <div className="TodoSuccess_wrapper">
          <h4>달성률</h4>
          <div className="TodoPercent"> {`${getSuccessPercent()}%`}</div>
        </div> 
      </div>
     
      <div className="btn_wrapper">
        <Button text={"수정하기"} onClick={goEdit}/>
      </div>
    </div>
  )

}

export default React.memo(DiaryItem);