"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client"; // Ajusta la ruta si es necesario
import FirestoreSelect from "../firebaseSelectComponent";

const DropDownComponent = ({ collectionName, label, categoryId, allowedIds }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const allCategoryOptions = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((option) => option.value);

        console.log("TODOS los docs con value:", allCategoryOptions.map(o => ({id: o.id, category_id: o.category_id})));

        const fetchedOptions = allCategoryOptions.filter(
          (option) => !allowedIds || allowedIds.includes(option.id)
        );

        console.log("allowedIds:", allowedIds);
        console.log("Opciones filtradas:", fetchedOptions.map(o => o.id));
        setOptions(fetchedOptions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching options:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOptions();
  }, [collectionName, categoryId, allowedIds]);

  if (loading) return <p>Cargando {label}...</p>;
  if (error) return <p>Error al cargar {label}: {error}</p>;

  return (
    <div>
      <div className="columns">
        <div className="column">
          <p>{label}</p>
        </div>
        <div className="column">
          <FirestoreSelect
            collectionName={collectionName}
            clause={{ key: "category_id", clause: "==", value: categoryId }}
            displayKeys={{ key: "id", value: "subCategoryName" }}
            allowedIds={allowedIds}
          />
        </div>
      </div>
    </div>
  );
};


export default DropDownComponent;