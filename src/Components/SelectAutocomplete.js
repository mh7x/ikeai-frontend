import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const designs = [
  { id: 1, name: 'Scandinavian style' },
  { id: 2, name: 'Japandi style' },
  { id: 3, name: 'Boho style' },
  { id: 4, name: 'Mediteranian style' },
  { id: 5, name: 'Country house style' },
  { id: 6, name: 'Midcentury style' },
  { id: 7, name: 'Industrial style' },
  { id: 8, name: 'Bauhaus style' },
  { id: 9, name: 'Minimalism' },
  { id: 10, name: 'Traditional style' },
]

export default function Example({ selected, setSelected }) {
  const [query, setQuery] = useState('')

  const filtereddesigns =
    query === ''
      ? designs
      : designs.filter((design) =>
        design.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Select style of interior design</Combobox.Label>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(design) => design.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filtereddesigns.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filtereddesigns.map((design) => (
                <Combobox.Option
                  key={design.id}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 cursor-pointer transition ${active ? 'bg-gray-400 text-white' : 'text-gray-900'
                    }`
                  }
                  value={design}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                        {design.name}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-900'}`} >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
