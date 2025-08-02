import DropDownComponent from "./dropDownComponent";

const ProductComponents = ({ product }) => {
  return (
    <div>
      <DropDownComponent
        collectionName="size"
        label="Size"
        categoryId="fEuRGob5P0QvdhE71h4A"
        allowedIds={product.subCategory_id}
      />
      <DropDownComponent
        collectionName="stock"
        label="Stock"
        categoryId="aPZ1cmZ6He5iqvoK4liv"
        allowedIds={product.subCategory_id}
      />
      {/* Otros dropdowns según lo que necesites */}
    </div>
  );
};

export default ProductComponents;