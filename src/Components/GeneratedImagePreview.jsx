import { useState } from 'react';
import './GeneratedImagePreview.css';
import ImagePopUp from './ImagePopUp';
import Button from '../UI/Button';
export default function GeneratedImagePreview ({ generatedImage1, generatedImage2 }) {
    let [isOpen, setIsOpen] = useState(false)
    let [previewImage, setPreviewImage] = useState('')


    function closeModal() {
        setIsOpen(false)
    }

    function openModal(previewImage) {
        setIsOpen(true)
        setPreviewImage(previewImage)
    }

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
            <div className="col-span-full">
                <div className="flex justify-center px-0 py-10">
                    <div className="text-center grid grid-cols-1 md:grid-cols-2">
                        <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600 px-1">
                            <p className="text-md text-gray-400 font-light mt-1">1st Generation</p>
                            <img src={generatedImage1} alt="" className="hover:brightness-75 hover:drop-shadow-xl hover:cursor-pointer" onClick={e => openModal(generatedImage1)}/>
                            <div>
                                <Button
                                    title="Download"
                                    class="mt-2 float-left"
                                    onClick={() => {window.open(generatedImage1, '_blank').focus()}}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600 px-1">
                            <p className="text-md text-gray-400 font-light mt-1">2nd Generation</p>
                            <img src={generatedImage2} alt="" className="hover:brightness-75 hover:drop-shadow-xl hover:cursor-pointer" onClick={e => openModal(generatedImage2)}/>
                            <div>
                                <Button
                                    title="Download"
                                    class="mt-2 float-left"
                                    onClick={() => {window.open(generatedImage2, '_blank').focus()}}
                                />
                            </div>
                        </div>
                        {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                    </div>
                </div>
            </div>
        <ImagePopUp
            image={previewImage}
            isOpen={isOpen}
            closeModal={closeModal}
            openModal={openModal}
        />
        </div>
    );
}