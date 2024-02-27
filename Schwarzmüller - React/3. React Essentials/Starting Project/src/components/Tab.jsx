export default function Button({children, onClick}) {
    return (
        <li>
            <button onClick={onClick}>{children}</button>
        </li>
    );
};