import React from "react";
import DropDownComponent from "../dropDownComponent";


const BusinessCardProductComponent = () => {
    return (
            <div className="">
                <DropDownComponent collectionName="shape" label="Shape"/>
                <DropDownComponent collectionName="stock" label="Stock"/>
            </div>
    )
}
export default BusinessCardProductComponent;