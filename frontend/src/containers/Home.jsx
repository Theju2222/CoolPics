import React from 'react';

import img19 from '../assets/img/img19.png';
import img21 from '../assets/img/img21.svg';
import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../reducks/images/operations";
import { getImages, getHasNext } from "../reducks/images/selectors";
import { getFavourites } from "../reducks/favourites/selectors";
import {
  addFavourite,
  fetchFromLocalStorage,
} from "../reducks/favourites/operations";
import Preview from "../components/Common/Preview";

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const images = getImages(selector);
    const hasNext = getHasNext(selector);
    const [page, setPage] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const favourites = getFavourites(selector);
  
    useEffect(() => {
      dispatch(fetchFromLocalStorage());
      dispatch(fetchImages(page));
      setPage(page + 1);
    }, []);
  
    const clickImage = (imageId) => {
      setSelectedImageId(imageId);
      setShowPreview(true);
    };
  
    const clickShowMore = () => {
      dispatch(fetchImages(page));
      setPage(page + 1);
    };
  
    const clickFavourite = (image) => {
      dispatch(addFavourite(image));
    };
    return (
        <>
              {showPreview && (
        <Preview
          setShowPreview={setShowPreview}
          selectedImageId={selectedImageId}
        />
      )}
            <div class="background">
                <img class="blur" src={img19} alt="" />
                <div class="background-text">
                    <p>Check our crazy and funky </p>
                    <p class="text2">
                        <strong>BACKGROUND'S</strong> for you
                    </p>
                    <form action="/search" method="get">
                        <input
                            class="input"
                            name="search"
                            type="text"
                            placeholder=" Search for your background"
                        />
                        {/* <img class="search" src={img21} alt="" /> */}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;
