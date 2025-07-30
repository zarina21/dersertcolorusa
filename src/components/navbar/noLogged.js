'use client'; // Si usas Next.js 13+

import Link from "next/link";
import Button from "../button/buttonComponent";
import ThemeToggle from "../button/buttonTheme";


const NoLogged = () => {


  return (
    <div className="navbar-end">
        <ThemeToggle />
        <Link href="/Sign-up">
          <Button className="button is-rounded mx-2">
            Sign Up
          </Button>
        </Link>
    </div>
  );
};

export default NoLogged;
