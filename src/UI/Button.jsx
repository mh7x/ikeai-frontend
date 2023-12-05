export default function Button(props) {
    return (
        <button className={"bg-white hover:bg-blue-200 text-gray-900 transition font-bold py-2 px-4 border rounded shadow-md" + " " + props.class} onClick={() => {props.onClick()}}>
            {props.icon}{props.title}
        </button>
    );
}