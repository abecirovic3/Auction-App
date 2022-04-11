import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ImgurService from 'services/ImgurService';
import { setImageDeleteInProgress, setImages } from 'features/addItem/addItemSlice';

import DeleteIcon from '@mui/icons-material/Clear';

import 'assets/style/image-preview.scss';

const ImagePreview = ({ image }) => {
    const imageData = useSelector(state => state.addItem.imageData);
    const dispatch = useDispatch();

    function handleRemoveImage() {
        dispatch(setImageDeleteInProgress(true));
        ImgurService.deleteImage(image.delete_hash)
            .then(response => {
                console.log(response);
                dispatch(setImages(imageData.images.filter(img => img.delete_hash !== image.delete_hash)));
                dispatch(setImageDeleteInProgress(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(setImageDeleteInProgress(false));
            })
    }

    return (
        <div className='image-preview-container'>
            <img src={image.url} alt={image.name}/>
            <Button
                className='remove-btn'
                endIcon={<DeleteIcon />}
                onClick={handleRemoveImage}
            >
                remove
            </Button>
        </div>
    );
};

export default ImagePreview;