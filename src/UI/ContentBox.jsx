export default function ContentBox (props) {
    return (<div className="rounded shadow-[0_3px_15px_0_rgba(0,0,0,0.1)] p-5 lg:p-10">{props.children}</div>);
};