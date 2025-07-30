"use client";
import { useState } from "react";
import Ruta from "./rutaComponent";
import HamburgerButton from "../button/buttonHamburger";
import NavbarSession from "./navbarEnd";
import Logo from "./logoTheme"; // Asegúrate de que la ruta sea correcta
import Link from "next/link";
import ModalComponent from "../modal/modal";
import Login from "./loginComponent";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú
    const [menuLogin, setMenuLogin] = useState(false)
    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" href="/">
                    <Logo />
                </Link>

                <HamburgerButton isActive={menuOpen} onClick={toggleMenu} />
            </div>
            <div id="navbarBasicExample" className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
                <div className="navbar-start">
                    <Ruta
                        enlace="/businessCard"
                        className="navbar-item"
                        label="Business Card"
                        placeholder="Business Card"
                        type="text"
                    />
                    <Ruta
                        enlace="/rollLabelsAndStickers"
                        className="navbar-item"
                        label="Roll Labels and Stickers"
                        placeholder="Roll Labels and Stickers"
                        type="text"
                    />
                    <Ruta
                        enlace="/signsAndBanners"
                        className="navbar-item"
                        label="Signs and Banners"
                        placeholder="Signs and Banners"
                        type="text"
                    />
                    <Ruta
                        enlace="/clothing"
                        className="navbar-item"
                        label="Clothing"
                        placeholder="Clothing"
                        type="text"
                    />
                </div>
                <NavbarSession
                    openMenuLogin={() =>{setMenuLogin(true)}}
                /> {/* Componente de sesión */}
            </div>
            <ModalComponent
                isVisible={menuLogin} 
                onClose={() => setMenuLogin(false)}
            >
                <Login/>
            </ModalComponent>
        </nav>
    );
}; 

export default Navbar;