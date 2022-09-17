import React, { useEffect, useState } from "react";
import { BsBookmark , BsBookmarkFill} from "react-icons/bs";
import { toast } from 'react-toastify';

export default function Card({ item }) {
  
  const [active, setActive] = useState(false)

  function handleBookmark(){
    let arr = JSON.parse(localStorage.getItem('bookmark')) || []
    let indexes = arr.findIndex((ii)=> ii.id == item.id)
    if(indexes == -1){
      arr.push(item)
      setActive(true)
      toast.success(`${item.title} added to bookmark`);
    } else {
      arr.splice(indexes, 1)
      setActive(false)
      toast.error(`${item.title} remove from bookmark`);
    }
    localStorage.setItem('bookmark', JSON.stringify(arr))
  }

  useEffect(()=>{
    let bookmarked = JSON.parse(localStorage.getItem('bookmark')) || []
    let idBooks = bookmarked.find((ii)=> ii?.id === item?.id)
    if(idBooks){
      setActive(true)
    } else {
      setActive(false)
    }
  },[])
  return (
    <div className="col">
      <div className="card shadow-sm" >

        <img src={item?.cover_url} className="card-img-top" alt={item?.title} />
        <div className="card-body">
          <div className="row">
            <div className="col-9">

            <h5 className="card-title">{item?.title}</h5>
            </div>
            <div className="col-3">
                <button className="btn" type="button" onClick={()=> handleBookmark()}>{active?  <BsBookmarkFill/> : <BsBookmark/>}</button>
            </div>

          </div>
          <p className="card-text line-clamp">{item?.description}</p>
        </div>
      </div>
    </div>
  );
}
