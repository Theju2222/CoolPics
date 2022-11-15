import React, { useEffect } from 'react'
import logo from "../../assets/img/coolpics-logo.png"
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../reducks/tags/selectors";
import { fetchTags } from "../../reducks/tags/operations";
import { resetImages, fetchImages } from "../../reducks/images/operations";
import { push } from "connected-react-router";


function Header() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const tags = getTags(selector);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const pushToSearch = (tagId) => {
    dispatch(resetImages());
    dispatch(push("/search?tag_id=" + tagId));
  };
  return (
    <>
      <header class="head">
        <div class="logo">
         <a href="/"> <img src={logo} alt=""/> </a>
        </div>
        <div class="favs">
          <a href="/favourite"><h1>FAVORITE</h1></a>
          <a href="/categories"><h1>CATEGORY</h1></a>
        </div>
      </header>
    </>
  )
}

export default Header