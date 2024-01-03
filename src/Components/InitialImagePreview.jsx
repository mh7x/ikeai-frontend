import * as markerjs2 from 'markerjs2';
import { useEffect, useRef, useState } from 'react';
import Button from '../UI/Button';

export default function InitialImagePreview ({ uploadedImage, mode, setDrawing, setMarkerAreaInfo }) {

    let imgRef = useRef(null);
    const [ma, setMA] = useState(null);

    const changeGrip = (event) => {
        event.marker.rotatorGrip.visual.innerHTML = '';
        event.marker.rotatorGripLine.outerHTML = '';
        event.marker.controlGrips.bottomCenter.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.bottomLeft.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.bottomRight.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.topCenter.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.topLeft.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.topRight.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.centerLeft.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
        event.marker.controlGrips.centerRight.visual.innerHTML = '<circle cx="5" cy="5" r="2" fill="transparent"></circle><circle cx="5" cy="5" r="2" fill="#333" fill-opacity="0.8"></circle>'
    }

    const showMarkerArea = () => {
        if (mode === 'design') return;
        if (imgRef.current !== null) {
            const markerArea = new markerjs2.MarkerArea(imgRef.current);
            markerArea.settings.defaultColor = 'rgba(255,0,0,1)';
            markerArea.settings.defaultFillColor = 'transparent';
            markerArea.uiStyleSettings.toolbarHeight = 0;
            markerArea.uiStyleSettings.hideToolbar = true;
            markerArea.uiStyleSettings.hideBox = true;
            markerArea.uiStyleSettings.zoomButtonVisible = true;
            markerArea.settings.defaultStrokeWidth = 1;
            
            markerArea.show();

            // setting the canvas over the original image
            let markerAreaEl = document.getElementsByClassName('__markerjs2_')[0];
            let previewImageEl = document.getElementsByClassName('preview-image')[0];
            markerAreaEl.style.left = previewImageEl.getBoundingClientRect().left.toFixed(0).toString() + 'px';

            markerArea.createNewMarker(markerjs2.FrameMarker);

            markerArea.addEventListener('markercreate', event => {
                setMarkerAreaInfo({width: event.markerArea.imageWidth, height: event.markerArea.imageHeight, marker: event.markerArea.markers[0]});
            });
            markerArea.addEventListener('markerchange', event => {
                setMarkerAreaInfo({width: event.markerArea.imageWidth, height: event.markerArea.imageHeight, marker: event.markerArea.markers[0]});
            });

            setMA(markerArea);
            setDrawing(true);
        }
    }

    const handleClose = () => {
        if (mode === 'design' || ma == null) return;
        ma.close();
        setDrawing(false);
        setMA(null);
    }

    return (
        <form>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                <div className="col-span-full">
                    {mode == 'replace' && <div>
                        <Button
                            title='Delete selection'
                            class={"mb-3 ms-2"}
                            onClick={() => handleClose()}
                        />
                    </div>}
                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <img src={uploadedImage} className='preview-image' alt="" ref={imgRef} onClick={() => showMarkerArea()}/>
                            </div>
                            {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}