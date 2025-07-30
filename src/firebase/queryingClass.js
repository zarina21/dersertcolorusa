import { app } from './client'; // Asegúrate de importar tu configuración de Firebase correctamente
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

class Querying {
  async addData(collectionName = '', obj = {}) {
    try {
      await addDoc(collection(db, collectionName), obj);
      return 'success';
    } catch (e) {
      throw { message: e.message, type: false };
    }
  }

  async updateData(collectionName, idDoc, newDataObj) {
    const docRef = doc(db, collectionName, idDoc);
    await updateDoc(docRef, newDataObj);
  }

  async findBy(collectionName, clauses) {
    const collectionRef = collection(db, collectionName);
    let q = collectionRef;

    clauses.forEach(clause => {
      q = query(q, where(clause.findBy, clause.where, clause.clause));
    });

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [];
    }

    const results = [];
    querySnapshot.forEach(doc => {
      results.push({ id: doc.id, data: doc.data() });
    });

    return results;
  }

  async findByOne(collectionName, clauseObj) {
    return await this.findBy(collectionName, [clauseObj]);
  }

  async findByMultiple(collectionName, clauseArr) {
    return await this.findBy(collectionName, clauseArr);
  }

  // Nuevo método para verificar si el nombre ya existe
  async checkIfNameExists(name) {
    try {
      const q = query(collection(db, "client"), where("name", "==", name));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Retorna true si el nombre ya existe
    } catch (e) {
      console.error("Error al verificar el nombre:", e);
      throw new Error("Error al verificar el nombre");
    }
  }
}

const QueryingClass = new Querying();
export default QueryingClass;