import { useState } from "react";

export default function TagSinput({ id, title, placeholder }) {
    const [tags, setTags] = useState([]);

    function handleKeyDown(e) {
        if (e.key !== "Enter") return;

        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = "";
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    return (
        <div className="mt-4">
            <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900">
                {title}
            </label>
            <div className="bg-white border rounded-lg w-full p-2.5 shadow-md flex items-center flex-wrap mt-1">
                {tags.map((tag, index) => (
                    <div className="border border-indigo-600 inline-block ps-5 rounded-full me-3 mb-2 text-sm" key={index}>
                        <span className="">{tag}</span>
                        <span
                            onClick={() => removeTag(index)}
                            className="h-6 w-6 bg-indigo-600 inline-flex rounded-full text-white justify-center items-center ms-3 cursor-pointer hover:bg-indigo-500 transition">
                            &times;
                        </span>
                    </div>
                ))}
                <input
                    type="text"
                    id={id}
                    placeholder={placeholder}
                    className="border-none text-sm px-0 py-0 focus:ring-0 w-full"
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}
