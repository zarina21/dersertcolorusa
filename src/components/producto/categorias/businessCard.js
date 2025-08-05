import DropDownComponent from "../dropDownComponent";


const BCProductComponents = ({ product }) => {
  return (
    <div>
      
      <DropDownComponent
        collectionName="sub_category"
        label="Stock"
        categoryId="aPZ1cmZ6He5iqvoK4liv"
        allowedIds={product?.subCategory_id}
      />
      <DropDownComponent
        collectionName="sub_category"
        label="Size"
        categoryId="fEuRGob5P0QvdhE71h4A"
        allowedIds={product?.subCategory_id}
      />
      <DropDownComponent
        collectionName="sub_category"
        label="Color PEC"
        categoryId="3rFv1T2XBdlaeWSMRx9N"
        allowedIds={product?.subCategory_id}
      />
      {/* Otros dropdowns según lo que necesites */}
    </div>
  );
};

export default BCProductComponents;