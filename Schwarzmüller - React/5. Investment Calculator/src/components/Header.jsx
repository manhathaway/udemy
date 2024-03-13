import logo from '../assets/investment-calculator-logo.png';

const Header = () => {
    return (
        <div id="header">
            <img src={logo} alt="Investment calculator logo."/>
            <h1>React Investment Calculator</h1>
        </div>
    );
};

export default Header;