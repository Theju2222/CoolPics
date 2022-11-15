import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../reducks/images/operations';
import { getImages, getHasNext } from '../reducks/images/selectors';
import { getFavourites } from '../reducks/favourites/selectors';
import { addFavourite } from '../reducks/favourites/operations';
import queryString from 'query-string';


import like from '../assets/img/like.svg';
import Preview from '../components/Common/Preview';
import { getTags } from '../reducks/tags/selectors';

export default function Search() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const parsed = queryString.parse(window.location.search);
    const images = getImages(selector);
    const hasNext = getHasNext(selector);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [tagId, setTagId] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const favourites = getFavourites(selector);
    const tags = getTags(selector);
    const image = getImages(selector);

    useEffect(() => {
        if (parsed.page != undefined) {
            setPage(parsed.page);
        }
        if (parsed.search != undefined) {
            setSearch(parsed.search);
        }
        if (parsed.tag_id != undefined) {
            setTagId(parsed.tag_id);
        }
    }, [parsed]);

    const clickImage = imageId => {
        setSelectedImageId(imageId);
        setShowPreview(true);
    };

    useEffect(() => {
        if (search) {
            dispatch(fetchImages(page, search, null));
        }
        if (tagId) {
            dispatch(fetchImages(page, null, tagId));
        }
    }, [page, search, tagId]);

    const clickShowMore = () => {
        if (page) {
            setPage(page + 1);
        }
    };

    const clickFavourite = image => {
        dispatch(addFavourite(image));
    };
    console.log(tags);
    console.log(tagId);
    return (
        <>

            {search && <h1 class="thin">Search "{search}"</h1>}
            
            {showPreview && <Preview setShowPreview={setShowPreview} selectedImageId={selectedImageId} />}
                {tags && 
                    tags.map(t => {
                        
                        return (
                            <>
                                {t && t.name.toLowerCase().includes(search.toLowerCase()) == true && 
                                    <div class="body">
                                    <div class="all-img">
                                        <div class="imgs">
                                            <div class="img">
                                                {image &&
                                                    image.map(image => {
                                                        return (
                                                            <div class="image" key={image.id}>
                                                                
                                                                {image.tag[0] === t.id && (
                                                                    <img
                                                                        src={
                                                                            'https://res.cloudinary.com/db7seyozi/' +
                                                                            image.image
                                                                        }
                                                                        alt=""
                                                                        onClick={() => clickImage(image.id)}
                                                                    />
                                                                )}
                                                                {image &&
                                                                    Object.values(favourites).filter(
                                                                        favouriteImage => image.id == favouriteImage.id
                                                                    ).length === 0 &&
                                                                    image.tag[0] === t.id && (
                                                                        <img
                                                                            class="like"
                                                                            src={like}
                                                                            alt=""
                                                                            onClick={() => clickFavourite(image)}
                                                                        />
                                                                    )}
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                }
                            </>
                        );
                    })}
        </>
    );
}


