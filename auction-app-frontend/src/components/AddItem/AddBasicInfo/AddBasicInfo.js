import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Container, MenuItem, Stack, TextField, ThemeProvider } from '@mui/material';

import { setName, setDescription, setCategory, setSubCategory, setImageData } from 'features/addItem/addItemSlice';

import ImagePreview from 'components/AddItem/AddBasicInfo/ImagePreview/ImagePreview';

import ImgurService from 'services/ImgurService';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss';
import 'assets/style/add-item-basic-info.scss';


const AddBasicInfo = ({ cancel, nextStep }) => {
    const category = useSelector(state => state.addItem.category);
    const subCategory = useSelector(state => state.addItem.subCategory);
    const [subCategoriesForCategory, setSubCategoriesForCategory] = useState([]);
    // TODO should use local state in AddItem for categories and pass in here
    // because global categories array contains only categories which have products in them
    const categories = useSelector(state => state.category.categories);
    const name = useSelector(state => state.addItem.name);
    const description = useSelector(state => state.addItem.description);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const imageData = useSelector(state => state.addItem.imageData);
    const imageDeleteInProgress = useSelector(state => state.addItem.imageDeleteInProgress);

    useEffect(() => {
        if (category !== '') {
            for (let c of categories) {
                if (c.name === category) {
                    setSubCategoriesForCategory(c.subCategories);
                    break;
                }
            }
        }
    }, [categories, category]);

    function handleFileDrop(ev) {
        ev.preventDefault();
        console.log(ev);
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    var file = ev.dataTransfer.items[i].getAsFile();
                    console.log('... file[' + i + '].name = ' + file.name);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
            }
        }
    }

    function handleFileSelect(event) {
        console.log("Handle file select event");
        console.log(event.target.files);
        setSelectedFiles([...event.target.files]);
    }

    useEffect(() => {
        if (selectedFiles.length > 0) {
            const newImages = selectedFiles.map(file => {
                return {
                    name: file.name
                }
            });
            dispatch(setImageData({
                uploaded: false,
                images: [...imageData.images, ...newImages]
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles]);

    useEffect(() => {
        if (imageData.uploaded === false && imageData.images.length !== 0) {
            handleImageUpload(selectedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageData]);

    function handleImageUpload(imageFiles) {
        let PromiseArray = [];
        for (let imageFile of imageFiles) {
            PromiseArray.push(ImgurService.uploadImage(imageFile));
        }
        Promise.all(PromiseArray)
            .then(responseArray => {
                console.log(responseArray);
                const images = responseArray.map(response => {
                    return {
                        id: response.data.data.id,
                        url: response.data.data.link,
                        delete_hash: response.data.data.deletehash
                    }
                });

                let i = 0;
                const uploadedImages = imageData.images.map((image) => {
                    if (image.url) {
                        return image;
                    } else {
                        return {
                            ...image,
                            ...images[i++]
                        }
                    }
                });

                dispatch(setImageData({
                    uploaded: true,
                    images: uploadedImages
                }));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleSelectCategory(event) {
        dispatch(setSubCategory(''));
        dispatch(setCategory(event.target.value));
    }

    function validate() {
        let err = {};
        if (!name) {
            err.name = 'Please enter product name';
        }

        if (!description) {
            err.description = 'Please enter product description';
        }

        if (!category) {
            err.category = 'Please select a category';
        }

        if (!subCategory) {
            err.subCategory = 'Please select a subcategory';
        }

        setErrors(err);

        return Object.keys(err).length === 0;
    }

    function handleNextStep() {
        if (validate()) {
            nextStep();
        }
    }

    return (
        <ThemeProvider theme={MainTheme}>
            <div className='form-style add-item-basic-info'>
                <Container className='form-container' maxWidth='sm'>
                    <h5>ADD ITEM</h5>

                    <Stack width='80%' margin='auto' spacing={6}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <label htmlFor='name'>What do you sell?</label>
                                <TextField
                                    id='name'
                                    variant='outlined'
                                    placeholder='eg. Targeal 7.1 Surround Sound Gaming Headset for PS4 '
                                    value={name}
                                    onChange={event => {dispatch(setName(event.target.value))}}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <TextField
                                    className='category-select'
                                    select
                                    label='Select Category'
                                    value={category}
                                    onChange={handleSelectCategory}
                                    error={!!errors.category}
                                    helperText={errors.category}
                                >
                                    {categories.map(category => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    className='category-select'
                                    select
                                    label='Select Subcategory'
                                    value={subCategoriesForCategory.length > 0 ? subCategory : ''}
                                    onChange={event => {dispatch(setSubCategory(event.target.value))}}
                                    error={!!errors.subCategory}
                                    helperText={errors.subCategory}
                                >
                                    {subCategoriesForCategory.map(sc => (
                                        <MenuItem
                                            key={sc.id}
                                            value={sc.name}
                                        >
                                            {sc.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='description'>Description</label>
                                <TextField
                                    id='description'
                                    variant='outlined'
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={event => {dispatch(setDescription(event.target.value))}}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                                <h3 className='form-label-description'>100 words (700 characters)</h3>
                            </Stack>
                        </Stack>

                        <div
                            className='image-upload-container'
                            onDrop={(event) => {handleFileDrop(event)}}
                            onDragOver={(event) => {event.preventDefault()}}
                        >
                            <div>
                                {
                                    imageData.images.map((image, i) => {
                                        if (image.url) {
                                            return (
                                                <div key={image.id}>
                                                    <ImagePreview image={image} />
                                                </div>
                                            )
                                        } else {
                                            return <CircularProgress key={i} />
                                        }
                                    })
                                }
                            </div>
                            <div>
                                <Button component='label'>
                                    Upload Photos
                                    <input
                                        type='file'
                                        accept='image/*'
                                        multiple
                                        hidden
                                        onChange={(event) => {handleFileSelect(event)}}
                                    />
                                </Button>
                                <p>Or just drag and drop</p>
                                <p className='info-label'>(Add at least 3 photos)</p>
                            </div>
                        </div>

                        <Stack spacing={2} direction='row'>
                            <Button
                                variant='outlined'
                                className='nav-buttons cancel-btn'
                                onClick={() => {cancel()}}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                className='nav-buttons'
                                onClick={handleNextStep}
                                disabled={!imageData.uploaded || imageDeleteInProgress}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default AddBasicInfo;