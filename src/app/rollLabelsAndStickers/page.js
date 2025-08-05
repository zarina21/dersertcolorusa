'use client'
import React from "react";
import Aside from "@/components/aside/aside";
import ItemList from "@/components/itemPreview/itemPreviewList";
import { useRolllabelAndStikersController } from "./RollLabelsAndStikers.controller"; // <--- nombre correcto

export default function RollLabelsAndStikers() {
  const { 
    valueAside,
    selectCheckbox,
    valueCategories,
    filterItems
  } = useRolllabelAndStikersController(); // <--- nombre correcto
  const items = filterItems();

  return (
    <main>
      <section className="section">
        hola
      </section>    
      <section className="section">
        <div className="columns">
          <div className="column is-3">
            {
              Object.keys(valueCategories).map((item, index) =>
                <Aside
                  key={item}
                  elements={valueCategories[item]}
                  value={valueAside[item]}
                  nameAside={item}
                  onChange={(v) => selectCheckbox(v, item)}
                />
              )
            }
          </div>
          <div className="column is-9">
            <ItemList list={items} />
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProductPage({ params }) {
  const { id } = React.use(params); // Así será en el futuro
  // ...tu código...
}