import { useState } from "react";

export default function Tabs({ setMode, mode }) {

    return (
        <>
            <div class="sm:hidden">
                <label for="tabs" class="sr-only"></label>
                <select id="tabs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setMode(e.target.value)}>
                    <option value='design' selected>Re-imagine the space</option>
                    <option value='replace'>Replace the furniture</option>
                </select>
            </div>
            <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex">
                <li class="w-full">
                    <a href="#" class={"inline-block w-full p-4 bg-white border-r border-gray-200 rounded-s-lg hover:text-indigo-600 hover:bg-gray-50" + (mode === "design" ? "active text-indigo-600 font-semibold bg-gray-50" : "")} aria-current="page" onClick={(e) => setMode("design")}>Re-imagine the space</a>
                </li>
                <li class="w-full">
                    <a href="#" class={"inline-block w-full p-4 bg-white border-r border-gray-200 rounded-e-lg hover:text-indigo-600 hover:bg-gray-50" + (mode === "replace" ? "active text-indigo-600 font-semibold bg-gray-50" : "")} onClick={(e) => setMode("replace")}>Replace the furniture</a>
                </li>
            </ul>
        </>
    );
}
