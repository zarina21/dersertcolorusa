"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client"; // Ajusta la ruta si es necesario

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
          <div className="select is-normal is-fullwidth">
            <select>
              <option value="">Choose an Option...</option>
              {options.map((option) => (
                <option
                  key={option.id}
                  value={option.value}
                >
                  {option.subCategoryName || option.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const selectedProduct = {
  // ...otros campos...
  subCategory_id: ["BjH94ZXlUPTdUPAFvPC1", "CIqeqb5BDriqLkwcg8cF"],
};

<DropDownComponent
  collectionName="sub_category"
  label="Stock"
  categoryId="aPZ1cmZ6He5iqvoK4liv"
  allowedIds={selectedProduct.subCategory_id}
/>

export default DropDownComponent;