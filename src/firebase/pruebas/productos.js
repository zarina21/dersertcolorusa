import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";
import QueryingClass from "@/firebase/queryingClass";
export const useBussinesCardController = () => {
  const [stock, setStock] = useState([]); 
  const [shape, setShape] = useState([]);
  const [size, setSize] = useState([]);
  const [templates, setTemplates] = useState([])
  const [coating, setCoating] = useState([]);
  const [colorSpec, setColorSpec] = useState([]);
  const [valueAside, setValueAside] = useState({
    category: [],
    size: [],
    stock: [],
    shape: [],
    coating: [],
    colorSpec: [],
  });
  

  useEffect(() => {
    const categories = QueryingClass.findBy('Categoria', {
      findBy: 'tipo_id',
      where: '==',
      clause: tipo_id
    })
    const fetchData = async (collectionName, setState, nameField, categoryField) => {
      try {
        // const tipo_id = tipoId
        // buscas todas las categorias con ese tipo_id
        // const categoriesLocal = {};
        //buscar templates por el tipo_id
        // iteras todas las categorias
        /*
          category.map((item, index) => {
              // traer de firebase todas las sub Categorias con ese category_id
              // const subCategory
              categoriesLocal[item.category_name] = subCategory.doc() 
          })
            setValueAside(categoriesLocal)
        */
        const categories = QueryingClass.findBy('Categoria', {
          findBy: 'tipo_id',
          where: '==',
          clause: tipo_id
        })
        const querySnapshot = await getDocs(collection(db, collectionName));
        const fetchedData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item[categoryField] === "Business Card"); // Filtrar por categoría "Business Card"
        const categoriesLocal = {};
        setState(fetchedData.map((item) => ({ id: item.id, name: item[nameField] }))); // Solo guardar el nombre y el id
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err);
      }
    };

    fetchData("stock", setStock, "stockName", "category");
    fetchData("size", setSize, "sizeName", "category");
    fetchData("shape", setShape, "shapeName", "category");
    fetchData("category", setCategory, "categoryName", "category");
    fetchData("coating", setCoating, "coatingName", "category");
    fetchData("colorspec", setColorSpec, "colorspecName", "category");
  }, []);

  const selectCheckbox = (item, asideName) => {
    const valueResult = valueAside[asideName].find((p) => p.value === item.name);
    if (valueResult) {
      setValueAside({
        ...valueAside,
        [asideName]: valueAside[asideName].filter((e) => e.value !== item.name),
      });
    } else {
      setValueAside({
        ...valueAside,
        [asideName]: [...valueAside[asideName], { value: item.name, id: item.id }],
      });
    }
  };

  const filterItems = () => {
    const hasFilters = Object.values(valueAside).some((arr) => arr.length > 0);

    if (!hasFilters) return productsList; 

    return productsList.filter((product) => {
      return Object.keys(valueAside).every((asideName) => {
        if (valueAside[asideName].length === 0) return true; 

        const productValue = product[asideName]; 
        return valueAside[asideName].some((filterItem) => filterItem.value === productValue);
      });
    });
  };

  const productsList = useMemo(() => {
    return [
      {
        name: "lorem ipsum",
        description: "is an amazing product!!!",
        image:
          "https://res.cloudinary.com/djsc1bwrl/image/upload/v1746849215/Standard_Business_Cards_scm3m7.jpg",
        size: "3x3",
        category: "option 1",
        stock: "14PT C2S", 
      },
      {
        name: "awesome bogue",
        description: "lipsum lib!!!",
        image:
          "https://goodbeer.be/wp-content/uploads/2017/05/women-beert-tshirt-its-a-beer-dear.png",
        size: "2x3.5",
        category: "option 2",
        stock: "16PT C2S", 
      },
    ];
  }, []);

  return {
    shape,
    valueAside,
    selectCheckbox,
    category,
    size,
    stock,
    coating,
    colorSpec, 
    filterItems,
    productsList, 
  };
};

export default useBussinesCardController;