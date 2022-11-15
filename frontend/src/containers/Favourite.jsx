import React, { useEffect, useState } from 'react';
import { deleteFavourite, fetchFromLocalStorage } from '../reducks/favourites/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from '../reducks/favourites/selectors';
import Preview from '../components/Common/Preview';
import like from '../assets/img/like.svg';
import { push } from 'connected-react-router';

export default function Favorite() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const favourites = getFavourites(selector);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const clickImage = (imageId) => {
        setSelectedImageId(imageId);
        setShowPreview(true);
        // dispatch(push('/Preview'));
    };
console.log('selectedImageId',selectedImageId);
    useEffect(() => {
        dispatch(fetchFromLocalStorage());
    }, []);
    
    return (
        <>
            <div class="body">
                {showPreview && <Preview setShowPreview={setShowPreview} selectedImageId={selectedImageId} />}
                <div class="all-img">
                    <div class="imgs">
                        <div class="img">
                            {favourites &&
                                favourites.map(favourite => (
                                    <div class="image" key={favourite.id}>
                                        <img
                                            src={'https://res.cloudinary.com/db7seyozi/' + favourite.image}
                                            alt=""
                                            onClick={() => clickImage(favourite.id)}
                                        />
                                        <img
                                            onClick={() => {
                                                dispatch(deleteFavourite(favourite.id));
                                            }}
                                            src={like}
                                            alt=""
                                            class="like"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
