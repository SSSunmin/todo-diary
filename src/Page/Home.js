import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import Button from "../Component/Button";
import DiaryList from "../Component/DiaryList";
import Header from "../Component/Header";

const Home =()=>{
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curdate, setcurDate] = useState(new Date());
  const headtext = `${new Date(curdate).getFullYear()}년 ${new Date(curdate).getMonth()+1}월`
  const increaseMonth=()=>{
    setcurDate(new Date(curdate.getFullYear(),curdate.getMonth()+1,curdate.getDate()))
  }
  const decreaseMonth=()=>{
    setcurDate(new Date(curdate.getFullYear(),curdate.getMonth()-1,curdate.getDate()))
  }
  useEffect(()=>{
    if(diaryList.length >=1){
      const firstday =new Date(
        curdate.getFullYear(),
        curdate.getMonth(),
        1
      ).getTime();

      const lastday = new Date(
        curdate.getFullYear(),
        curdate.getMonth()+1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(diaryList.filter((it)=>firstday <= it.date && lastday >= it.date));
    }

  },[diaryList,curdate])
  useEffect(()=>{
    const title = document.getElementsByTagName('title')[0];
    title.innerHTML=`감정 일기장`
  },[])

  return(
    <div className="Home">
      <Header 
        headtext={headtext}
        leftChild={<Button text={"<"} onClick={decreaseMonth}/>}
        rightChild={<Button text={">"} onClick={increaseMonth}/>}
      />    
      <DiaryList diaryList={data}/>
    </div>
  )
}

export default Home;