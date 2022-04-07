import { useState } from 'react';
import { Button, Container, MenuItem, Select, Stack, TextField, ThemeProvider } from '@mui/material';

import MainTheme from 'themes/MainTheme';
import 'assets/style/form.scss';
import 'assets/style/add-item-basic-info.scss';


const AddBasicInfo = ({ cancel, nextStep }) => {
    const [category, setCategory] = useState('');

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
        console.log(event.target.files);
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
                                />
                            </Stack>

                            <Stack spacing={2} direction='row'>
                                <TextField
                                    className='category-select'
                                    select
                                    label='Select Category'
                                    value={''}
                                >
                                    <MenuItem value='ctg1'>Category 1</MenuItem>
                                    <MenuItem value='ctg2'>Category 2</MenuItem>
                                    <MenuItem value='ctg3'>Category 3</MenuItem>
                                </TextField>
                                <TextField
                                    className='category-select'
                                    select
                                    label='Select Subcategory'
                                    value={''}
                                >
                                    <MenuItem value='ctg1'>Category 1</MenuItem>
                                    <MenuItem value='ctg2'>Category 2</MenuItem>
                                    <MenuItem value='ctg3'>Category 3</MenuItem>
                                </TextField>
                            </Stack>

                            <Stack spacing={2}>
                                <label htmlFor='description'>Description</label>
                                <TextField
                                    id='description'
                                    variant='outlined'
                                    multiline
                                    rows={4}
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
                                onClick={() => {nextStep()}}
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