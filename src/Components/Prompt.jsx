export default function Prompt({ title, id, style, placeholder, value, onChange }) {
    return (
        <>
            <form>
                <div className="mt-4">
                    <div>
                        <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900">{title}</label>
                        <input type="text" id={id} className={"bg-white border text-sm rounded-lg block w-full p-2.5 shadow-md mt-1" + " " + style} 
                            placeholder={placeholder} required value={value} onChange={e => onChange(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}
