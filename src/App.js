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

function App() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [resultsAvailable, setResultsAvailable] = useState(false);
    const [pooling, setPooling] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [generatedImages, setGeneratedImages] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState({ id: 1, name: 'Scandinavian style', code: "scandinavian" });
    const [positivePrompt, setPositivePrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');

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

    const handleImagineClick = () => {
        if (!uploadedImage) return;
        setPooling(true);
        let data = new FormData();
        data.append('image', uploadedImage.image);
        data.append('style', selectedStyle.code);
        data.append('positive_prompt', positivePrompt);
        data.append('negative_prompt', negativePrompt);
        axios({
            method: 'POST',
            url: url + '/generate',
            data: data
        }).then(response => {
            let taskId = response.data.task_id;
            setTaskId(taskId);
            console.log(taskId);
            console.log(response);
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

    return (
        <Container>
            <div className="text text-center mb-10">
                <h1 className="text-6xl text-gray-900">ikeAI</h1>
                <div className="text-xl font-light text-gray-600 mt-3">Personalize, Visualize, Transform: <span className="font-bold">Your Space, Reimagined.</span></div>
            </div>
            <ContentBox>
                <Select
                    selected={selectedStyle}
                    setSelected={setSelectedStyle}
                />
                <Prompt
                    title="Tell us your imagination"
                    id="positivePrompt"
                    placeholder="I want couch, leather, carpet..."
                    style="border-gray-200 ring-gray-200 focus:ring-green-500 focus:border-green-500 transition-all"
                    value={positivePrompt}
                    onChange={setPositivePrompt}
                />
                <Prompt
                    title="What's not on your mind?"
                    id="negativePrompt"
                    placeholder="I don't want a table, lamp, or a chair..."
                    style="border-gray-200 ring-gray-200 focus:ring-red-500 focus:border-red-500 transition-all"
                    value={negativePrompt}
                    onChange={setNegativePrompt}
                />
                {uploadedImage == null &&
                    <FileUpload
                        onFileUpload={handleFileUpload}
                    />
                }
                {(uploadedImage != null && !resultsAvailable) &&
                    <div>
                        <InitialImagePreview
                            uploadedImage={uploadedImage.url}
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
                    <GeneratedImagePreview
                        generatedImage1={generatedImages[0]}
                        generatedImage2={generatedImages[1]}
                    />
                }
            </ContentBox>
            <div className="mt-10 mb-5">
                <h2 className="text-3xl text-gray-700">Examples</h2>
                <div className="text-md text-gray-400 font-light mt-1">Here are some examples of generated results:</div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1648554130751-d71d42967691?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1695938887083-31f814779e54?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1700471880758-2c1011b275ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
                <div className="..."><ImageSwiper image="https://plus.unsplash.com/premium_photo-1701085339951-db8f1d9b5113?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1701077136756-3b8439292118?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1701077137611-9be394bf62f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></div>
            </div>
            <Modal />
            {pooling && <FullscreenLoader />}
        </Container >
    );
}

export default App;
