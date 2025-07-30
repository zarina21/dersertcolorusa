import BusinessCardProductComponent from "./categorias/businessCard";
const ProductComponent = ({ product }) => {
  return (
    <div className="columns">
        <div className="column">
            imagen
        </div>
        <div className="column">
            <div className="box grid is-col-min-32 has-text-centered m-4">
                <div className="has-text-right">
                    <span className="tag is-small">
                        Clean All
                        <button className="delete"></button>
                    </span>
                </div>
                <div>
                    <button className="button is-rounded is-primary mr-2">Product Option</button>  
                    <button className="button is-rounded ml-2">Sets & Shipping</button>
                </div>
                <div className="grid is-col-min-32"> <BusinessCardProductComponent /></div>
            </div>
        </div>
    </div>
  );
}

export default ProductComponent;