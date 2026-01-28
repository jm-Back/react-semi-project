import "./Header.css"
import { getGoldImage } from "../util/get-gold-image";

//props 에 따라서 다르게 보이도록 
const Header = ({ title }) => {
    return (
        <header className="Header">
            <div className="logo">
                <img src={getGoldImage("BUY")}></img>
                <div className="logo_name">금장부</div>
            </div>
            <div className="header_left">{ }</div>
            <div className="header_center">{ }</div>
            <div className="header_right">{ }</div>
        </header>
    )
};

export default Header;