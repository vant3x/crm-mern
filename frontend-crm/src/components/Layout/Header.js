import React from 'react';  
import { Link } from 'react-router-dom';
import LogoCRM from './img/logo1.png';

const Header = () => (
        <header className="barra">
            <div className="contenedor">
                {/*<Link to="/"><h1><img className="logo-img" src={LogoCRM} alt=""/> <span className="title-ub"> AcaGeek</span></h1></Link>*/}  
                <Link to="/"><h1><img className="logo-img" src="" alt=""/> CRM - AcaGeek</h1></Link>
            </div>
        </header>
    );


export default Header;