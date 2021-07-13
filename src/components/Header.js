import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark flex">
                <div>
                    <a href="/" className="navbar-brand">
                        Household Appliance
                    </a>
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/appliances"} className="nav-link">
                            Appliances
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add-appliance/_add"} className="nav-link">
                            Create Appliance
                        </Link>
                    </li>
                </div>
            </nav>
        </div>
    );
};

export default Header;