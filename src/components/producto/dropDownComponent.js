"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client"; // Asegúrate de que la ruta sea correcta

const DropDownComponent = ({ collectionName, label }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const fetchedOptions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOptions(fetchedOptions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching options:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOptions();
  }, [collectionName]);

  if (loading) return <p>Cargando {label}...</p>;
  if (error) return <p>Error al cargar {label}: {error}</p>;

  return (
    <div>
      <div className="columns">
          <div className="column">
            <p>{label}</p>
          </div>
          <div className="column">
            <div className="select is-normal">
              <select>
                <option value="">Shoose an Option...</option>
                  {options.map((option) => (
                <option key={option.id} value={option.value || option.shapeName || option.stockName || option.categoryName || option.sizeName || option.coatingName || option.colorspecName}>
                  {option.shapeName || option.value || option.stockName || option.categoryName || option.sizeName || option.coatingName || option.colorspecName}
                </option>
                ))}
              </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownComponent;