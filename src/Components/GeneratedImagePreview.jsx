import { useState } from "react";
import ImagePopUp from "./ImagePopUp";
import Button from "../UI/Button";

export default function GeneratedImagePreview({ generatedImages }) {
    let [isOpen, setIsOpen] = useState(false);
    let [previewImage, setPreviewImage] = useState("");

    function closeModal() {
        setIsOpen(false);
    }

    function openModal(previewImage) {
        setIsOpen(true);
        setPreviewImage(previewImage);
    }

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
            <div className="col-span-full">
                <div className="flex justify-center px-0 py-10">
                    {generatedImages.length == 1 && 
                    <div className="text-center grid grid-cols-1">
                        <img
                            src={generatedImages[0]}
                            alt=""
                            className="hover:brightness-75 hover:drop-shadow-xl hover:cursor-pointer"
                            onClick={(e) => openModal(generatedImages[0])}
                        />
                        <div>
                            <Button
                                title="Download"
                                class="mt-2"
                                onClick={() => {
                                    window.open(generatedImages[0], "_blank").focus();
                                }}
                            />
                        </div>
                    </div>
                    }
                    {generatedImages.length == 2 &&
                        <div className="text-center grid grid-cols-1 md:grid-cols-2">
                            <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600 px-1">
                                <p className="text-md text-gray-400 font-light">1st Generation</p>
                                <img
                                    src={generatedImages[0]}
                                    alt=""
                                    className="hover:brightness-75 hover:drop-shadow-xl hover:cursor-pointer"
                                    onClick={(e) => openModal(generatedImages[0])}
                                />
                                <div>
                                    <Button
                                        title="Download"
                                        class="mt-2"
                                        onClick={() => {
                                            window.open(generatedImages[0], "_blank").focus();
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600 px-1">
                                <p className="text-md text-gray-400 font-light">2nd Generation</p>
                                <img
                                    src={generatedImages[1]}
                                    alt=""
                                    className="hover:brightness-75 hover:drop-shadow-xl hover:cursor-pointer"
                                    onClick={(e) => openModal(generatedImages[1])}
                                />
                                <div>
                                    <Button
                                        title="Download"
                                        class="mt-2"
                                        onClick={() => {
                                            window.open(generatedImages[1], "_blank").focus();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <ImagePopUp image={previewImage} isOpen={isOpen} closeModal={closeModal} openModal={openModal} />
        </div>
    );
}
