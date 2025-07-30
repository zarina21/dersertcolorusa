import { FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import Button from "../button/buttonComponent"; // Ajusta el path según dónde esté tu componente
import ThemeToggle from "../button/buttonTheme";

const Logged = () => {
    return (
        <div className="navbar-end">
            <ThemeToggle />
            <Link href="/UserProfile">
                <Button className="button is-rounded mx-1">
                    <FaUser size={24} />
                </Button>
            </Link>
            <Link href="/ShoppingCart">
                <Button className="button is-rounded mx-1">
                    <FaShoppingCart size={24} />
                </Button>
            </Link>

        </div>
    );
};

export default Logged;
