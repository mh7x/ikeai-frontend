import { useState, useRef } from "react";
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';

export default function ImageSwiper(props) {
    const [imageRevealFraction, setImageRevealFraction] = useState(0.5);
    const imageContainer = useRef(undefined);

    const slide = (xPosition) => {
        const containerBoundingRect = imageContainer.current.getBoundingClientRect();
        setImageRevealFraction(() => {
            if (xPosition < containerBoundingRect.left) {
                return 0;
            } else if (xPosition > containerBoundingRect.right) {
                return 1;
            } else {
                return ((xPosition - containerBoundingRect.left) / containerBoundingRect.width);
            }
        });
    }

    const handleTouchMove = (event) => {
        slide(event.touches.item(0).clientX);
    }

    const handleMouseMove = (event) => {
        slide(event.clientX);
    }

    const handleMouseDown = () => {
        window.onmousemove = handleMouseMove;
        window.onmouseup = handleMouseUp;
    }

    const handleMouseUp = () => {
        window.onmousemove = undefined;
        window.onmouseup = undefined;
    }

    return (
        <div>
            <div
                ref={imageContainer}
                className="w-full h-[300px] mx-auto relative select-none "
            >
                <img
                    src={ props.image }
                    alt=""
                    className="pointer-events-none rounded h-full w-full object-cover"
                />
                <img
                    style={{ filter: "grayscale(100%)", clipPath: `polygon(0 0, ${imageRevealFraction * 100}% 0, ${imageRevealFraction * 100}% 100%, 0 100%)` }}
                    src={ props.image }
                    alt=""
                    className="absolute inset-0 pointer-events-none rounded h-full w-full object-cover"
                />
                <div style={{ left: `${imageRevealFraction * 100}%` }}
                    className="absolute inset-y-0">
                    <div className="relative h-full">
                        <div className="absolute inset-y-0 bg-white w-0.5 -ml-px opacity-50"></div>
                        <div
                            style={{ touchAction: "none" }}
                            onMouseDown={handleMouseDown}
                            onTouchMove={handleTouchMove}
                            className="absolute top-1/2 h-6 w-6 -ml-3 -mt-3 rounded-full bg-white shadow-2xl hover:bg-gray-100 transition duration-300 cursor-pointer">
                            <ChevronUpDownIcon className="p-0.5 rotate-90 transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}