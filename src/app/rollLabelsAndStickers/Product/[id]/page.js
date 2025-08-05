"use client";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductComponents = dynamic(
  () => import("@/components/producto/productComponent"),
  { ssr: false }
);

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Supón que cada producto tiene un campo category o type
  const basePath = {
    businessCard: "/businessCard/product",
    rollLabelsAndStickers: "/rollLabelsAndStickers/product",
    signAndBanners: "/signAndBanners/product",
  }[product.category]; // Ajusta según tu modelo

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
      <Link href={`${basePath}/${product.id}`}>
        Ir a {product.value}
      </Link>
    </div>
  );
}