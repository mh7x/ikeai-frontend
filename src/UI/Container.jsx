export default function Container(props) {
    return <div className="container p-5 lg:w-3/4 lg:p-10 mx-auto relative">{props.children}</div>;
}