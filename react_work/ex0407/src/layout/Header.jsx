import React from 'react';
import {Link} from "react-router-dom";
import './Header.module.css';

function Header(props) {
    return (
        <div style={{display: 'flex', gap: '1rem'}}>
            <Link className={"menu"} to="/">홈</Link>
            <Link className={"menu"}to={"/lotto"}>로또</Link>
        </div>
    );
}

export default Header;
