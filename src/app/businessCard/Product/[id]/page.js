"use client";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/client";
import { useEffect, useState } from "react";
import BCProductComponents from "@/components/producto/productComponent";
import Login from "@/components/navbar/loginComponent";
import { useIsLogin } from "@/hooks/useIsLoggin"; // Importa tu hook

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLogin = useIsLogin(); // Usa tu hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, "product", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Producto no encontrado");
          setLoading(false);
          return;
        }

        setProduct(docSnap.data());
      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading || isLogin === null) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="columns m-4">
      <div className="column">
        <h1 className="title">{product.value}</h1>
        <img src={product.image} alt={product.name} style={{ width: 200 }} />
        <p>{product.description}</p>
      </div>
      <div className="column">
        {isLogin
          ? <BCProductComponents product={product} />
          : <Login />
        }
      </div>
    </div>
  );
}