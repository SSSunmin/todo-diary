import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from '../Component/DiaryEditor'
import {DiaryStateContext} from'../App'

const Edit =()=>{
  const {id} = useParams();
  const data = useContext(DiaryStateContext);
  const [editdata, setEditData] = useState();
  const nevigate = useNavigate();
  useEffect(()=>{
    if(data.length>=1){
      const filterlist = data.find((it)=>parseInt(it.id) === parseInt(id))
      if(filterlist){
        setEditData(filterlist)
      }
      else{
        nevigate('/',{replace:true});
      }
    }
  },[id,data])

  return(
    <div className="Edit">    
      {editdata && <DiaryEditor isEdit={true} data={editdata} />}
    </div>
  )
}

export default Edit;