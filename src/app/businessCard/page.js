'use client'
import React from "react";
import Aside from "@/components/aside/aside";
import ItemList from "@/components/itemPreview/itemPreviewList";
import { useBussinesCardController } from "./businessCard.controller";

export default function BusinessCard() {
  const { 
    valueAside,
    selectCheckbox,
    valueCategories,
    filterItems
  } = useBussinesCardController();
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
              Object.keys(valueCategories).map((item, index) =>{
                return (
                  <Aside
                    key={item}
                    elements={valueCategories[item]}
                    value={valueAside[item]}
                    nameAside={item}
                    onChange={(v) => selectCheckbox(v, item)}
                  />
                )
              })
            }
          </div>
          <div className="column is-9">
            <ItemList list={items} basePath="/businessCard" />
          </div>
        </div>
      </section>
    </main>
  );
}