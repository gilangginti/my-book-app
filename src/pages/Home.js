import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { getRequest } from "../utils/GFunc";
import PageNotFound from "../assets/404.svg";

export default function Home() {
  const location = useLocation();
  let { search } = location;
  const size = 12;
  const [books, setBooks] = useState([]);
  const [booksTemp, setBooksTemp] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const getBooks = useCallback(async () => {
    setLoadingBtn(true)
    let category = search ? search : "?categoryId=1";
    let res = await getRequest(
      `fee-assessment-books${category}&page=${page}&size=${size}`
    );
    if (res) {
      let bookes = books.concat(res.data);
      setBooks(bookes);
      setBooksTemp(bookes);
      setLoadingBtn(false);
      setLoadingBtn(false)
    }
    setLoadingBtn(false)
  }, [page, search]);

  useEffect(() => {
    getBooks();
  }, [getBooks, page]);
  useEffect(() => {
    let newBooks = booksTemp.filter((e) =>
      e.title.toLowerCase().includes(keyword)
    );
    setBooks(newBooks);
  }, [keyword]);
  return (
    <div>
      <Header keyword={keyword} setKeyword={setKeyword} />
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {books.length > 0
            ?  books.map((item, index) => <Card key={index} item={item} />)
            : null}
        </div>
        <div className="d-flex justify-content-center">
          {books.length === 0 ? (
            <p>Data tidak ditemukan</p>
          ) : (
            <button
              disabled={loadingBtn}
              className="btn btn-outline-primary mt-3 mb-3"
              type="button"
              onClick={() => {
                setPage(page + 1);
                setLoadingBtn(true);
              }}
            >
              {loadingBtn ? (
                <div className="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Load More ..."
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
