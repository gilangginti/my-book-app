import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'

export default function Bookmark() {
  const [books, setBooks] = useState([])
  useEffect(()=>{
   let bookmark = JSON.parse(localStorage.getItem('bookmark')) || []
   setBooks(bookmark)
  },[])
  return (
    <div>
      <Header />
      <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-4 g-3">
      {books.length > 0
          ? books.map((item, index) => <Card key={index} item={item} />)
          : null}
      </div>
      <div className="d-flex justify-content-center">
      {books.length === 0 && <p>Data tidak ditemukan</p>}  
      </div>
      </div>
    </div>
  )
}
