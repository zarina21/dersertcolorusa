import RollLabelAndStikersProductComponent from "@/components/producto/categorias/rollLabelAndStikers";
const ProductComponent = ({ product }) => {
  return (
    <div class="columns">
        <div class="column">
            imagen
        </div>
        <div class="column">
            <div class="box grid is-col-min-32 has-text-centered m-4">
                <div className="has-text-right">
                    <span class="tag is-small">
                        Clean All
                        <button class="delete"></button>
                    </span>
                </div>
                <div>
                    <button class="button is-rounded is-primary mr-2">Product Option</button>  
                    <button class="button is-rounded ml-2">Sets & Shipping</button>
                </div>
                <div className="grid is-col-min-32"> <RollLabelAndStikersProductComponent /> </div>
            </div>
        </div>
    </div>
  );
}

export default ProductComponent;