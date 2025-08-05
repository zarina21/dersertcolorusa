"use client";
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * @param {string} collectionName - Nombre de la colección en Firestore.
 * @param {{ key: string, clause: string, value: any }} clause - Cláusula para la consulta (ej. where).
 * @param {{ key: string, value: string }} displayKeys - Define qué campos usar como `value` e `innerText`.
 * @param {(selectedValue: any) => void} onChange - Callback para cambios en el select.
 * @param {any} value - Valor seleccionado (opcional, controlado desde el padre)
 */
export default function FirestoreSelect({ collectionName, clause, displayKeys, onChange, value, allowedIds }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(value || "");

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const db = getFirestore();
        const colRef = collection(db, collectionName);

        const firebaseQuery = query(colRef, where(clause.key, clause.clause, clause.value));
        const snapshot = await getDocs(firebaseQuery);

        let results = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            key: doc.id, // Usar el id del documento
            value: data[displayKeys.value]
          };
        });

        // Filtrar por allowedIds si se pasa
        if (allowedIds && Array.isArray(allowedIds)) {
          results = results.filter(opt => allowedIds.includes(opt.key));
        }

        setOptions(results);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [collectionName, clause, displayKeys, allowedIds]);

  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className='select is-link is-fullwidth'>
      <select 
        onChange={handleChange}
        value={selected}
        disabled={loading}
      >
        <option value="">Seleccione una opción</option>
        {options.map((item, index) => (
          <option key={index} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
}
