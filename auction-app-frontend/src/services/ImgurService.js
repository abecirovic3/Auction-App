import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.imgur.com/3/image',
    headers: {
        'Authorization': 'Client-ID ' + process.env.REACT_APP_IMGUR_API_KEY,
    },
});

function uploadImage(imageFile) {
    let bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);
    return instance.post('', bodyFormData);
}

function deleteImage(imageHash) {
    return instance.delete(`/${imageHash}`);
}

const ImgurService = {
    uploadImage,
    deleteImage
};

export default ImgurService;