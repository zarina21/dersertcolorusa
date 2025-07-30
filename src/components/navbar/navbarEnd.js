'use client';
import Logged from "./logged";
import NoLogged from "./noLogged";
import Button from "../button/buttonComponent";
import { useIsLogin } from "../../hooks/useIsLoggin";
import AuthClass from "../../firebase/authClass"; // asegúrate que esté bien la ruta
import { useRouter } from 'next/navigation';

const NavbarSession = ({ openMenuLogin }) => {
  const isLogin = useIsLogin();
  const router = useRouter();

  const handleClick = async () => {
    if (!isLogin) {
      openMenuLogin();
    } else {
      try {
        await AuthClass.logout();
        router.push('/'); // redirige a home u otra ruta tras logout
      } catch (e) {
        console.error('Error al cerrar sesión', e);
      }
    }
  };

  if(isLogin === null) {
    return null
  } 

  return (
    <div className="navbar-end">
      <div className="navbar-item">
        {isLogin ? <Logged /> : <NoLogged />}
        <Button
          onClick={handleClick}
          className="button is-rounded"
        >
          {isLogin ? "Log out" : "Log in"}
        </Button>
      </div>
    </div>
  );
};

export default NavbarSession;