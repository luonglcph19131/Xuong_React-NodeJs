import React from 'react'

const Header = () => {
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <a href="" className="header__logo">
                            <img src="./public/logo.svg" alt="" />
                        </a>
                        <div className="button-mobile">
                            <button>=</button>
                        </div>
                        <nav className="main-menu">
                            <ul className="main-menu__list">
                                <li className="main-menu__item">
                                    <a href="/" className="main-menu__link">
                                        Home
                                    </a>
                                </li>
                                <li className="main-menu__item">
                                    <a href="./shop.html" className="main-menu__link">
                                        Shop
                                    </a>
                                </li>
                                <li className="main-menu__item">
                                    <a href="" className="main-menu__link">
                                        About
                                    </a>
                                </li>
                                <li className="main-menu__item">
                                    <a href="/products" className="main-menu__link">
                                        Action
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="header-items">
                            <div className="header-item-user">
                                <span>
                                    <a href="./signIn"><img src="./public/icons/1.svg" /></a>
                                </span>
                            </div>
                            <div className="header-item-user">
                                <span>
                                    <img src="./public/icons/2.svg" />
                                </span>
                            </div>
                            <div className="header-item-user">
                                <span>
                                    <img src="./public/icons/3.svg" />
                                </span>
                            </div>
                            <div className="header-item-user">
                                <span>
                                    <img src="./public/icons/4.svg" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
}

export default Header