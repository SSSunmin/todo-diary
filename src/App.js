import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Detail from './Page/Detail';
import Edit from './Page/Edit';
import Home from './Page/Home';
import New from './Page/New';

const dummyData=[
  {
    id:1,
    date:1664353011558,
    content:'일기1',
    emotion: 1,
    todolist:[
      {id:0, value :'롸' ,isCheck : false},
      {id:1, value :'롸?' ,isCheck : true},
      {id:2, value :'롸!' ,isCheck : true},
      {id:3, value :'롸아.' ,isCheck : false},],
  },
  {
    id:2,
    date:1664353011559,
    content:'일기2',
    emotion: 2,
    todolist:[
      {id:0, value :'가' ,isCheck : false},
      {id:1, value :'나' ,isCheck : true},],
  },
  {
    id:3,
    date:1664353011560,
    content:'일기3',
    emotion: 3,
    todolist:[
      {id:0, value :'다' ,isCheck : false},
      {id:1, value :'라' ,isCheck : true},
      {id:2, value :'마' ,isCheck : true},
      {id:3, value :'바' ,isCheck : false},],
  },
  {
    id:4,
    date:1664353011561,
    content:'일기4',
    emotion: 4,
    todolist:[
      {id:0, value :'사' ,isCheck : false},
      {id:1, value :'아' ,isCheck : false},
      {id:2, value :'자' ,isCheck : true},
      {id:3, value :'차' ,isCheck : false},]
  },
  {
    id:5,
    date:1664353011562,
    content:'일기5',
    emotion: 5,
    todolist:[
      {id:0, value :'카' ,isCheck : true},
      {id:1, value :'타' ,isCheck : true},
      {id:2, value :'파' ,isCheck : true},
      {id:3, value :'하' ,isCheck : false},]
  },
]

const reducer =(state,action)=>{
  let newstate =[];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      const newItem={
        ...action.data
      };
      newstate=[newItem,...state];
      break;
    }
    case 'REMOVE':{
      newstate=state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case'EDIT':{
      newstate = state.map((it)=>it.id===action.data.id? {...action.data} : it)
      break;
    }
    default:{
      return state;
    }
  }
  return newstate;
}
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() { 
  const [data,dispatch] = useReducer(reducer,dummyData);
  const dataId = useRef(5);

  const onCreate=(date, content, emotion,todolist)=>{
    const newItem={
      id:++dataId.current,
      date:new Date(date).getTime(),
      content,
      emotion,
      todolist
    }
    dispatch({type:'CREATE',data:newItem})
  }
  const onRemove=(targetId)=>{
    dispatch({type:'REMOVE',targetId : targetId})
  }
  const onEdit=(targetId,date,content,emotion,todolist)=>{
    const editItem={
      id:targetId,
      date:new Date(date).getTime(),
      content,
      emotion,
      todolist
    }
    dispatch({type:'EDIT',data:editItem})
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,onRemove,onEdit}}>
        <BrowserRouter>
            <div className='App'>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/new' element={<New/>} />
                <Route path='/detail/:id' element={<Detail/>} />
                <Route path='/edit/:id' element={<Edit/>}/>
              </Routes>  
            </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
