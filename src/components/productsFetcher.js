"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Asegúrate de que la ruta sea correcta

const ProductsFetcher = ({ onProductsFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // Cambia "products" por el nombre de tu colección
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        onProductsFetched(products); // Pasar los productos al controlador
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [onProductsFetched]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return null; // Este componente no necesita renderizar nada
};

export default ProductsFetcher;