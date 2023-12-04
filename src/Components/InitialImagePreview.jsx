import { PhotoIcon } from '@heroicons/react/24/solid';

export default function InitialImagePreview ({ uploadedImage }) {
    return (
        <form>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                <div className="col-span-full">
                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <img src={uploadedImage} alt="" />
                            </div>
                            {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}