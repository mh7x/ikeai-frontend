import { PhotoIcon } from '@heroicons/react/24/solid';

export default function FileUpload ({ onFileUpload }) {
    return (
        <form>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                <div className="col-span-full">
                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 transition duration-300"
                                >
                                    <span>Upload a video or an image</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => onFileUpload(e)}/>
                                </label>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
}