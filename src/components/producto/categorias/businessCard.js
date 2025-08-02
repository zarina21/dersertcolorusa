"use client";
import React from "react";
import DropDownComponent from "../dropDownComponent";

const selectedProduct = {
  // ...otros campos...
  subCategory_id: ["CIqeqb5BDriqLkwcg8cF", "LQA98oF7HCh23Yenakmj"]
};

const BusinessCardProductComponent = () => {
  return (
    <div className="">
      <DropDownComponent
        collectionName="shape"
        label="Shape"
      />
      <DropDownComponent
        collectionName="sub_category"
        label="Size"
        categoryId="fEuRGob5P0QvdhE71h4A"
        allowedIds={selectedProduct.subCategory_id}
      />
      <DropDownComponent
        collectionName="sub_category"
        label="Stock"
        categoryId="aPZ1cmZ6He5iqvoK4liv"
        allowedIds={selectedProduct.subCategory_id}
      />
    </div>
  );
};

export default BusinessCardProductComponent;