import { createBrowserHistory } from "@remix-run/router";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/GFunc";

export default function Header({keyword, setKeyword}) {
  const router = createBrowserHistory()
  const [categories, setCategories] = useState([]);
 
  const geCategories = useCallback(async () => {
    let res = await getRequest("fee-assessment-categories");
    if (res) {
      setCategories(res.data);
    }
  }, []);

  useEffect(() => {
    geCategories();
  }, [geCategories]);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="https://sejutacita.id/static/media/logo-bg-new.14982478.png"
            width={80}
            height={40}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-info"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                {categories.map((item, index) => (
                  <ListCategories item={item} key={index} />
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link to={'/bookmark'}>
                <a className="nav-link text-info decoration-none">
                Bookmark
              </a>
              </Link>
              
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              value={keyword}
              onChange={(e)=> setKeyword(e.target.value.toLowerCase())}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
  function ListCategories({ item }) {
    return (
      <li>
        <a className="dropdown-item text-info" href="" onClick={()=> router.push({search: '?categoryId='+item.id , pathname: '/'})}>
          {item.name}
        </a>
      </li>
    );
  }
}
