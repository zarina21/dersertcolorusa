'use client'
import React from "react";
import Aside from "@/components/aside/aside";
import ItemList from "@/components/itemPreview/itemPreviewList";
import { useClothingController } from "./clothing.Controller";

export default function Clothing() {
  const { 
    valueAside,
    selectCheckbox,
    template,
    size,
    stock,
  } = useClothingController();

  return (
    <main>
        <section className="section">
            hola
        </section>    
      <section className="section">
        <div className="columns">
          <div className="column is-3">

            <Aside
              elements={stock}
              value={valueAside.stock}
              onChange={(v) => selectCheckbox(v, 'stock')}
              nameAside={'Stock'}
            />
            <Aside
              elements={size}
              value={valueAside.size}
              onChange={(v) => selectCheckbox(v, 'size')}
              nameAside={'Size'}
            />  
          </div>
          <div className="column is-9">
            <ItemList/>
          </div>
        </div>
      </section>
    </main>
  );
}