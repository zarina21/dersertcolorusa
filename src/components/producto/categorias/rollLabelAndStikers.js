import React from "react";
import DropDownComponent from "../dropDownComponent";


const RollLabelAndStikersProductComponent = () => {
    return (
            <div className="">
                <DropDownComponent collectionName="shape" label="Shape"/>
                <DropDownComponent collectionName="stock" label="Stock"/>
            </div>
    )
}
export default RollLabelAndStikersProductComponent;