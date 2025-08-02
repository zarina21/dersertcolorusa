import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/client";
import ProductComponents from "@/components/producto/productComponent";

export default async function ProductPage({ params }) {
  const { id } = params;
  const db = getFirestore(app);
  const docRef = doc(db, "product", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div>Producto no encontrado</div>;
  }

  const product = docSnap.data();

  return (
    <div className="columns m-4">
      <div className="column">
        <h1 className="title">{product.value}</h1>
        <img src={product.image} alt={product.name} style={{ width: 200 }} />
        <p>{product.description}</p>    
      </div>
      <div className="column"> 
          <ProductComponents product={product} />
      </div>
    </div>
  );
}