import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * @param {string} collectionName - Nombre de la colección en Firestore.
 * @param {{ key: string, clause: string, value: any }} clause - Cláusula para la consulta (ej. where).
 * @param {{ key: string, value: string }} displayKeys - Define qué campos usar como `value` e `innerText`.
 * @param {(selectedValue: any) => void} onChange - Callback para cambios en el select.
 */
export default function FirestoreSelect({ collectionName, clause, displayKeys, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const db = getFirestore();
        const colRef = collection(db, collectionName);

        const firebaseQuery = query(colRef, where(clause.key, clause.clause, clause.value));
        const snapshot = await getDocs(firebaseQuery);

        const results = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            key: data[displayKeys.key],
            value: data[displayKeys.value]
          };
        });

        setOptions(results);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [collectionName, clause, displayKeys]);

  return (
    <div className='select is-link'>
        <select 
            onChange={e => onChange(e.target.value)} 
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
