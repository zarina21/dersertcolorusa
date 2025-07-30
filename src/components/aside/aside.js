import React from "react";
import CheckBox from "./checkBox.js";

const Aside = ({
    elements = [], // Asegura que elements tenga un valor por defecto como un array vacío
    value = [],
    onChange,
    nameAside,
}) => {
  return (
    <>
        <aside className="menu mb-5">
            <p className="menu-label">{nameAside}</p>
            <ul className="menu-list">
                {
                    elements.map((element) => {
                        const item = element.data
                        return (
                            <li key={element.id}>
                                <CheckBox 
                                    type={"checkbox"}
                                    value={!!value.find((p) => p.value === item.value)} // Verifica si el valor está seleccionado
                                    onChange={() => onChange(element)}
                                    placeholder={
                                        item.value
                                    } // Usa el campo adecuado como texto del checkbox
                                    className={"checkbox"}
                                />
                            </li>           
                        );
                    })
                }
            </ul>
        </aside>
    </>
  );
};

export default Aside;