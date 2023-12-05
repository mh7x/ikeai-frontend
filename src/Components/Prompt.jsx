export default function Prompt({ title, style, placeholder, value, onChange }) {
    return (
        <>
            <form>
                <div class="mt-3">
                    <div>
                        <label for="first_name" class="mb-2 text-sm font-medium text-gray-900">{title}</label>
                        <input type="text" id="first_name" class={"bg-white border text-sm rounded-lg block w-full p-2.5 shadow-md" + " " + style} 
                            placeholder={placeholder} required value={value} onChange={e => onChange(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}
