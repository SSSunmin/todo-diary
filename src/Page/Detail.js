import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import Button from "../Component/Button";
import Header from "../Component/Header";
import { GetStringDate } from "../Util/Date";
import { emotionList } from "../Util/Emotion";
const Detail =()=>{
  const {id} =useParams();
  const Fulldata = useContext(DiaryStateContext);
  const[data, setData] = useState();
  const nevigate =useNavigate();

  useEffect(()=>{
    if(Fulldata.length>=1){
      const filterlist = Fulldata.find((it)=>parseInt(it.id) === parseInt(id))
      if(filterlist){
        setData(filterlist)
      }else{
        nevigate('/',{replace:true})
      }
    }     
  },[id,Fulldata])

  if(!data){
    return <div className="Detail">로딩중입니다....</div>
  }else{
    const curemotion = emotionList.find((it)=>parseInt(it.emotion_id) === parseInt(data.emotion));
    return(
      <div className="Detail">
        <Header headtext={`${GetStringDate(new Date(data.date))} 기록`}
          leftChild={<Button text={'< 뒤로가기'} onClick={()=>nevigate('/')}/>}
          rightChild={<Button text={'수정하기'} onClick={()=>nevigate(`/edit/${id}`)}/>}/>
          <article>
            <section>
              <h4>오늘의 감정</h4>
              <img src={curemotion.emotion_img}></img>
            </section>
            <section>
              <h4>오늘의 할일</h4>
            </section>
            <section>
              <h4>오늘의 일기</h4>
            </section>
          </article>
      </div>
    )
  }
}

export default Detail;