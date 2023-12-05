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

function App() {

    const [uploadedImage, setUploadedImage] = useState(null);
    const [resultsAvailable, setResultsAvailable] = useState(false);
    const [pooling, setPooling] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [generatedImages, setGeneratedImages] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState({id: 1, name: 'Scandinavian style', code: "scandinavian"});
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
                                icon={
                                    pooling &&
                                    <svg aria-hidden="true" className="me-2 mb-1 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                }
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
        </Container >
    );
}

export default App;
