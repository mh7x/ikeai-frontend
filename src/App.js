import './App.css';

import { useState } from 'react';
import axios from 'axios';

import Container from './UI/Container';
import ContentBox from './UI/ContentBox';
import Button from './UI/Button';
import FileUpload from './Components/FileUpload';
import Select from './Components/Select';
import Prompt from './Components/Prompt';
import Modal from './Components/Modal';
import ImageSwiper from './Components/ImageSwiper';
import InitialImagePreview from './Components/InitialImagePreview';
import GeneratedImagePreview from './Components/GeneratedImagePreview';
import Pooling from './Components/Pooling';
import FullscreenLoader from './Components/FullscreenLoader';
import TagsInput from './Components/TagsInput';
import Checkbox from './UI/Checkbox';
import Tabs from './UI/Tabs';

import { designs } from './Utils/categories';
import { rooms } from './Utils/rooms';

function App() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [resultsAvailable, setResultsAvailable] = useState(false);
    const [pooling, setPooling] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [generatedImages, setGeneratedImages] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState({ id: 1, name: 'Scandinavian style', code: "scandinavian" });
    const [selectedRoom, setSelectedRoom] = useState({ id: 0, name: 'None', code: "none" });
    const [customPrompt, setCustomPrompt] = useState('');
    const [adventuresMode, setAdventuresMode] = useState(false);
    const [positiveTags, setPositiveTags] = useState([]);
    const [negativeTags, setNegativeTags] = useState([]);
    const [mode, setMode] = useState('design');
    const [drawing, setDrawing] = useState(false);
    const [markerAreaInfo, setMarkerAreaInfo] = useState(null);
    const [objectPrompt, setObjectPrompt] = useState('');
    const [segmentation, setSegmentation] = useState(true);

    const url = 'http://localhost:8000';

    const handleFileUpload = event => {
        if (!event.target.files[0]) return;
        let filetype = event.target.files[0].type;
        if (filetype !== 'image/jpeg' && filetype !== 'image/png') {
            alert('Wrong image format. Currently supported formats are: jpg, jpeg, png.');
            return;
        }
        setUploadedImage({ image: event.target.files[0], url: URL.createObjectURL(event.target.files[0]) });
    }

    const concatTags = (tags) => {
        let result = '';
        tags.forEach(tag => {
            result += tag + ',';
        });
        result = result.slice(0, -1);
        return result;
    }

    const handleImagineClick = () => {
        if (!uploadedImage) return;
        setPooling(true);
        let data = new FormData();

        let endpoint = '/';
        let positivePrompt = '';
        let negativePrompt = '';
        if (mode === 'design'){
            positivePrompt = selectedRoom.name !== 'None' ? '(' + selectedRoom.name  + '),'+ concatTags(positiveTags) : concatTags(positiveTags);
            positivePrompt = customPrompt !== '' ? positivePrompt + ',' + customPrompt : positivePrompt;
            negativePrompt = concatTags(negativeTags);
            data.append('image', uploadedImage.image);
            data.append('style', selectedStyle.code);
            data.append('positive_prompt', positivePrompt);
            data.append('negative_prompt', negativePrompt);
            endpoint = '/design';
        }
        else if (mode === 'replace'){
            if (objectPrompt === ''){
                alert('You need to specify the object you want in the image!');
                setPooling(false);
                return;
            }
            data.append('image', uploadedImage.image);
            data.append('canvasHeight', markerAreaInfo.height);
            data.append('canvasWidth', markerAreaInfo.width);
            data.append('prompt', objectPrompt);
            data.append('segment', segmentation);
            let marker = {
                left: markerAreaInfo.marker.left,
                top: markerAreaInfo.marker.top,
                width: markerAreaInfo.marker.width,
                height: markerAreaInfo.marker.height
            };
            data.append('marker', JSON.stringify(marker));
            endpoint = '/replace'
        }
        axios({
            method: 'POST',
            url: url + endpoint,
            data: data
        }).then(response => {
            let taskId = response.data.task_id;
            setTaskId(taskId);
            console.log(taskId);
            console.log(response);
            setDrawing(false);
        }).catch(error => {
            setTaskId('');
            setPooling(false);
            console.error(error);
        });
    }

    const handleResults = (results) => {
        console.log(results);
        setGeneratedImages(results.images);
        setPooling(false);
        setResultsAvailable(true);
    }

    const handleSetMode = (m) => {
        if (m === 'design' && drawing) return;
        setMode(m);
    }

    return (
        <Container>
            <div className="text text-center mb-10">
                <h1 className="text-6xl text-gray-900">ikeAI</h1>
                <div className="text-xl font-light text-gray-600 mt-3">Personalize, Visualize, Transform: <span className="font-bold">Your Space, Reimagined.</span></div>
            </div>
            <ContentBox>
                <Tabs mode={mode} setMode={handleSetMode}/>
                {(mode === 'design') &&
                    <>
                        <Select
                            selected={selectedStyle}
                            setSelected={setSelectedStyle}
                            items={designs}
                            title="Select style of interior design"
                        />
                        <Select
                            selected={selectedRoom}
                            setSelected={setSelectedRoom}
                            items={rooms}
                            title="Do you have a specific room in mind?"
                        />
                        <TagsInput
                            title="What do you want in the room?"
                            id="positivePrompt"
                            placeholder="Wooden chair, white carpet, ..."
                            tags={positiveTags}
                            setTags={setPositiveTags}
                            customClass=""
                        />
                        <TagsInput
                            title="What do you NOT want in the room?"
                            id="negativePrompt"
                            placeholder="Plastic chair, black carpet, ..."
                            tags={negativeTags}
                            setTags={setNegativeTags}
                            customClass=""
                        />
                        <Checkbox
                            title="Do you feel adventurous?"
                            value={adventuresMode}
                            onChange={setAdventuresMode}
                        />
                        {adventuresMode && 
                            <Prompt 
                                title="Custom prompt"
                                placeholder="Type in your custom prompt..."
                                id="customPrompt"
                                style="border-gray-200 ring-gray-200 focus:ring-0 focus:outline-0 transition-all"
                                value={customPrompt}
                                onChange={setCustomPrompt}
                            />
                        }
                    </>
                }
                {mode === 'replace' &&
                    <>
                        <Prompt 
                            title="What object you want in the image?"
                            placeholder="Type in the object..."
                            id="objectPrompt"
                            style="border-gray-200 ring-gray-200 focus:ring-0 focus:outline-0 transition-all"
                            value={objectPrompt}
                            onChange={setObjectPrompt}
                        />
                        <Checkbox
                            title="Do you want to segment the object from selected area?"
                            value={segmentation}
                            onChange={setSegmentation}
                        />
                    </>
                }
                {uploadedImage == null &&
                    <FileUpload
                        onFileUpload={handleFileUpload}
                    />
                }
                {(uploadedImage != null && !resultsAvailable) &&
                    <div>
                        <InitialImagePreview
                            uploadedImage={uploadedImage.url}
                            mode={mode}
                            setDrawing={setDrawing}
                            setMarkerAreaInfo={setMarkerAreaInfo}
                        />
                        <div className="text-center">
                            <Button
                                title={!pooling && "Imagine" || "Generating"}
                                class={"mt-5"}
                                onClick={handleImagineClick}
                            />
                        </div>
                    </div>
                }
                {(pooling && taskId !== '') &&
                    <Pooling taskId={taskId} handleResults={handleResults} />
                }
                {(resultsAvailable && generatedImages != null) &&
                    <>
                        <GeneratedImagePreview
                            generatedImages={generatedImages}
                        />
                        {generatedImages.length == 2 &&
                        <div className='text-center'>
                            <Button
                                title="Imagine again"
                                class="mt-2 mx-3"
                                onClick={() => {
                                    window.location.reload();
                                }}
                            />
                        </div>}
                    </>
                }
            </ContentBox>
            <div className="mt-10 mb-5">
                <h2 className="text-3xl text-gray-700">Examples</h2>
                <div className="text-md text-gray-400 font-light mt-1">Here are some examples of generated results:</div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
                <div className="..."><ImageSwiper inputImage='images/input_0.jpg' outputImage='images/output_0.png' /></div>
                <div className="..."><ImageSwiper inputImage='images/input_1.jpg' outputImage='images/output_1.png' /></div>
                <div className="..."><ImageSwiper inputImage='images/input_2.jpg' outputImage='images/output_2.png' /></div>
                <div className="..."><ImageSwiper inputImage='images/input_3.jpeg' outputImage='images/output_3.png' /></div>
                <div className="..."><ImageSwiper inputImage='images/input_4.jpeg' outputImage='images/output_4.png' /></div>
                <div className="..."><ImageSwiper inputImage='images/input_5.jpeg' outputImage='images/output_5.png' /></div>
            </div>
            <Modal />
            {pooling && <FullscreenLoader />}
        </Container >
    );
}

export default App;
