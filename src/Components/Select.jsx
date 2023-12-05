import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const designs = [
    { id: 1, name: "Scandinavian style", code: "scandinavian" },
    { id: 2, name: "Japandi style", code: "japandi" },
    { id: 3, name: "Boho style", code: "boho" },
    { id: 4, name: "Mediteranian style", code: "mediteranian" },
    { id: 5, name: "Country house style", code: "countryhouse" },
    { id: 6, name: "Midcentury style", code: "midcentury" },
    { id: 7, name: "Industrial style", code: "industrial" },
    { id: 8, name: "Bauhaus style", code: "bauhaus" },
    { id: 9, name: "Minimalism", code: "minimalism" },
    { id: 10, name: "Traditional style", code: "traditional" },
];

export default function Select({ selected, setSelected }) {
    return (
        <Listbox value={selected} onChange={setSelected}>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Select style of interior design</Listbox.Label>
            <div className="relative mt-1">
                <Listbox.Button className="relative border w-full cursor-default rounded-lg bg-white p-2.5 pr-10 text-left shadow-md focus:outline-none sm:text-sm hover:cursor-pointer">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {designs.map((person, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-blue-100 text-gray-900" : "text-gray-900"}`
                                }
                                value={person}>
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{person.name}</span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}
