import axios from 'axios';

const apiKey = '0a7043a1018e5b3';

const instance = axios.create({
    baseURL: 'https://api.imgur.com/3/image',
    headers: {
        'Authorization': 'Client-ID ' + apiKey,
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