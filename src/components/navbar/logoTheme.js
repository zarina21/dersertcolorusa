"use client";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

const Logo = () => {
  const { theme } = useTheme();

  const ThemeLogo = {
      light: () => <Image src={'/DesertLight.svg'} alt="Logo" width={160} height={40} priority />,
      dark: () =>  <Image src={'/DesertDark.svg'} alt="Logo" width={160} height={40} priority />,
  }
  
  const FinalLogo = ThemeLogo[theme];
  
  return FinalLogo ? <FinalLogo/> : <Image src={'/DesertLight.svg'} alt="Logo" width={160} height={40} priority /> 
}
export default Logo;