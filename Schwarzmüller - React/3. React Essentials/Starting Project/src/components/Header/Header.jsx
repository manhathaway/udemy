import './Header.css';
import reactImg from '../../assets/react-core-concepts.png';

export default function Header(props) {
    return (
      <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p onMouseOver={props.function}>
          {props.adj} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
    );
};