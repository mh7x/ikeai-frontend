export default function Checkbox({title, value, onChange}) {
    return (
        <div className="flex items-center mt-4">
            <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0"
                onChange={e => onChange(e.target.checked)}
            />
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">
                {title}
            </label>
        </div>
    );
}
