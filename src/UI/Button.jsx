export default function Button(props) {
    return (
        <button className={"bg-white hover:bg-gray-400 text-gray-900 hover:text-white transition font-semibold py-2 px-4 border border-gray-400 rounded shadow" + " " + props.class} onClick={() => {props.onClick()}}>
            {props.icon}{props.title}
        </button>
    );
}