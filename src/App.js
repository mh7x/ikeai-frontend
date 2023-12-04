import './App.css';

import { useState } from 'react';

import Container from './UI/Container';
import ContentBox from './UI/ContentBox';
import Button from './UI/Button';
import FileUpload from './Components/FileUpload';
import SelectAutocomplete from './Components/SelectAutocomplete';
import Modal from './Components/Modal';
import ImageSwiper from './Components/ImageSwiper';
import InitialImagePreview from './Components/InitialImagePreview';
import GeneratedImagePreview from './Components/GeneratedImagePreview';

function App() {

    const [uploadedImage, setUploadedImage] = useState(null);
    const [resultsAvailable, setResultsAvailable] = useState(false);

    const handleFileUpload = event => {
        if (!event.target.files[0]) return;
        let filetype = event.target.files[0].type;
        if (filetype !== 'image/jpeg' && filetype !== 'image/png') {
          alert('Wrong image format. Currently supported formats are: jpg, jpeg, png.');
          return;
        }
        setUploadedImage(URL.createObjectURL(event.target.files[0]));
    }

    const handleImagineClick = () => {
        alert("Imagine clicked");
        setResultsAvailable(true);
    }

    return (
        <Container>
            <div className="text text-center mb-10">
                <h1 className="text-6xl text-gray-900">ikeAI</h1>
                <div className="text-xl font-light text-gray-600 mt-3">Personalize, Visualize, Transform: <span className="font-bold">Your Space, Reimagined.</span></div>
            </div>
            <ContentBox>
                <SelectAutocomplete />
                {uploadedImage == null && 
                    <FileUpload
                    onFileUpload={handleFileUpload}
                    />
                }
                {(uploadedImage != null && !resultsAvailable) && 
                    <div>
                        <InitialImagePreview
                            uploadedImage={uploadedImage}
                            />
                        <Button 
                            title={"Imagine"}
                            class={"mt-3"}
                            onClick={handleImagineClick}
                        />
                    </div>
                }
                {resultsAvailable &&
                    <GeneratedImagePreview
                        generatedImage1={"https://images.unsplash.com/photo-1648554130751-d71d42967691?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        generatedImage2={"https://images.unsplash.com/photo-1648554130751-d71d42967691?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    />
                }
            </ContentBox>
            <div className="mt-10 mb-5">
                <h2 className="text-3xl text-gray-700">Examples</h2>
                <div className="text-md text-gray-400 font-light mt-1">Here are some examples of generated results:</div>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1648554130751-d71d42967691?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1695938887083-31f814779e54?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1700471880758-2c1011b275ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
                <div className="..."><ImageSwiper image="https://plus.unsplash.com/premium_photo-1701085339951-db8f1d9b5113?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1701077136756-3b8439292118?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
                <div className="..."><ImageSwiper image="https://images.unsplash.com/photo-1701077137611-9be394bf62f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>
            </div>
            <Modal />
        </Container >
    );
}

export default App;
