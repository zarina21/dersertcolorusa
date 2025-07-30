import Link from "next/link";

const Ruta = ({
    enlace,
    className,
    label,
    placeholder,
    type,
}) => {
    return (
      <Link
        href={enlace} 
        className={className}
        label={label}
        placeholder={placeholder}
        type={type}
      >
        <span>{label}</span>
      </Link>
    );
  }
  
  export default Ruta;