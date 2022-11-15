import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../reducks/images/operations';
import { getImages, getHasNext } from '../reducks/images/selectors';
import { getFavourites } from '../reducks/favourites/selectors';
import { addFavourite, fetchFromLocalStorage } from '../reducks/favourites/operations';
import like from '../assets/img/like.svg';
import Preview from '../components/Common/Preview';
import { push } from 'connected-react-router';
import { getTags } from '../reducks/tags/selectors';

const Categories = tag => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const image = getImages(selector);
    const hasNext = getHasNext(selector);
    const [page, setPage] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const favourites = getFavourites(selector);
    const tags = getTags(selector);

    useEffect(() => {
        dispatch(fetchFromLocalStorage());
        dispatch(fetchImages(page));
        setPage(page + 1);
    }, []);

    const clickImage = (imageId) => {
        setSelectedImageId(imageId);
        setShowPreview(true);
        // dispatch(push('/Preview/'));
    };

    const clickFavourite = image => {
        dispatch(addFavourite(image));
    };

    return (
        <>
            <div class="body">
                <h1>Categories</h1>
                <p>Choose your backgrounds</p>
           
                {showPreview && <Preview setShowPreview={setShowPreview} selectedImageId={selectedImageId}  />}
                {tags &&
                    tags.map(t => {
                        return (
                            <>
                                <h1>{t.name}</h1>
                                {
                                    <div class="all-img">
                                        <div class="imgs">
                                            <div class="img">
                                                {image &&
                                                    image.map(image => {
                                                        return (
                                                            <div class="image" >

                                                                {image.tag[0] === t.id && (
                                                                    <img
                                                                        src={
                                                                            'https://res.cloudinary.com/db7seyozi/' +
                                                                            image.image
                                                                        }
                                                                        alt=""
                                                                        onClick={() => clickImage(
                                                                        image.id)}
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
                                }
                            </>
                        );
                    })}
            </div>
        </>
    );
};
export default Categories;
