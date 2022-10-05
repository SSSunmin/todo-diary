import DiaryItem from "./DiaryItem";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const sortOptionList=[
  {value:'lastest', name:'최신순'},
  {value:'oldest',name:'오래된 순'},
]

const filterOptionList=[
  {value:'all',name:'전부다'},
  {value:'good',name:'좋은 감정만'},
  {value:'bad',name:'안좋은 감정만'},
]

const ConrtrolMenu=({value,onChange, optionList})=>{
  return(
    <select className="select_box" value={value} onChange={(e)=>onChange(e.target.value)}>
      {optionList.map((it,index)=><option key ={index} value={it.value}>{it.name}</option>)}
    </select>
  )
}

const DiaryList =({diaryList})=>{

  const nevigate = useNavigate();
  const[sortType,setSortType] = useState('lastest');
  const[filter,setFilter]=useState('all');

  const getDiaryList=()=>{

    const compare =(a,b)=>{
      if(sortType === 'lastest'){
        return parseInt(b.date) - parseInt(a.date);
      }
      else{
        return parseInt(a.date)-parseInt(b.date);
      }
    }

    const filterCallBack=(item)=>{
      if(filter ==='good'){
        return parseInt(item.emotion) >=3;
      }
      else{
        return parseInt(item.emotion) < 3;
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filterlist = filter === 'all'? copyList : copyList.filter((it)=>filterCallBack(it));
    const sortedList = filterlist.sort(compare);
    return sortedList;
  }

  return(
    <div className="DiaryList">
       <div className="menu_wrapper">
        <ConrtrolMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
        <ConrtrolMenu value={filter} onChange={setFilter} optionList={filterOptionList}/>
        <div className="right_Button">
          <Button text={"새 일기쓰기"} onClick={()=>nevigate('/new')}/>
        </div>
      </div>
      {getDiaryList().map((it)=> <DiaryItem key={it.id} {...it} />)}
    </div>
  )
}

DiaryList.defaultProps={
  diaryList:[],
}
export default DiaryList;