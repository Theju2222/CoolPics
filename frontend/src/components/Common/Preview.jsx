import React, { useEffect, useState } from 'react';
import { getFavourites } from '../../reducks/favourites/selectors';
import API from '../../API';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite } from '../../reducks/favourites/operations';
import Categories from '../../containers/Categories';
import cancelicon from '../../assets/img/cancelicon.svg';
import girl from '../../assets/img/girl.svg';
import previewfooter from '../../assets/img/previewfooter.svg';
import previewheader from '../../assets/img/previewheader.svg';
import img1 from '../../assets/img/img1.png'


const api = new API();

const Preview =({ setShowPreview, selectedImageId }) =>{
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [image, setImage] = useState(null);
    const [showFavourite, setShowFavourite] = useState(true);
    const favourites = getFavourites(selector);
    useEffect(() => {
        api.getImage(selectedImageId)
            .then(image => {
                setImage(image);
            })
            .catch(error => {
                alert('Failed to connect API: /images/:id/');
            });
    }, []);

    // const clickImage = imageId => {
    //     setSelectedImageId(imageId);
    //     setShowPreview(true);
    // };
    // const clickFavourite = image => {
    //     setShowFavourite(false);
    //     dispatch(addFavourite(image));
    // }
 


    return (
        <>
            <section class="page3">
                <div class="blur">
                    <Categories />
                </div>
                {image && (
                <section class="preview">
                    <img class="preview-main" src={previewheader} alt="" />
               
                    <img class="preview-main5" src={'https://res.cloudinary.com/db7seyozi/' + image.image} alt="" />
                    <img class="preview-main1" src={girl} alt="" />
                    <img class="preview-main2" src={previewfooter} alt="" />
                    <a href="/categories">
                        <img class="preview-main3" src={cancelicon} alt="" onClick={() => setShowPreview(false)} />
                    </a>
                    <h1 class="preview-main4">Preview</h1>
                    <div class="preview-sub">
                        
                    </div>
                </section>
                )}
            </section>
        </>
    );
}

export default Preview;
