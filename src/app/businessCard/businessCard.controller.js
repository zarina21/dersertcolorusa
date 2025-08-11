import { useState, useEffect } from "react";
import QueryingClass from "@/firebase/queryingClass";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct, editProduct } from "../../slices/carritoCompras";

export const useBussinesCardController = () => {
  const [valueCategories, setValueCategories] = useState({})
  const [valueAside, setValueAside] = useState({});
  const[category, setCategory] = useState([])
  const [productsList, setProductsList] = useState([]);
  const dispatch = useDispatch();

  // Obtener los productos del store
  const productos = useSelector((state) => state.carrito.elements);
  
  // Añadir producto
  const handleAdd = (id, product) => {
    dispatch(
      addProduct(
        { id: id, cantidad: 1, ...product }
      ));
  };

  // Eliminar producto
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // Editar cantidad de producto
  const handleEdit = (id, cantidad, action) => {
    let quantity = cantidad;
    if(action == 'dimiss'){
      quantity = cantidad - 1
      if(quantity <= 0) {
        handleDelete(id);
        return
      } 
    }

    if(action == 'increment') {
      quantity = cantidad + 1
    }

    dispatch(editProduct({ id: id, cantidad: quantity }));
  };

  useEffect(() => {
    getAllCategories()
    getAllProducts()
  }, []);

  const getAllProducts = async() => {
    const getProducts = await QueryingClass.findByOne('product', {
      findBy: 'type_id',
      where: '==',
      clause: 'IRfZLyNuDHNM6mc7BnhY'
    })
    console.log(getProducts)
    setProductsList(getProducts);
  }

  const getAllCategories = async () => {
    const categories = await QueryingClass.findByOne('category', {
      findBy: 'type_id',
      where: '==',
      clause: 'IRfZLyNuDHNM6mc7BnhY'
    })
    let categoriesFinal = {};
    let valuesAside = {}
    for (const item of categories) {
      const subCategory = await QueryingClass.findByOne('sub_category', {
        findBy: 'category_id',
        where: '==',
        clause: item.id
      })
      valuesAside[item.data.category_name] = [];
      categoriesFinal[item.data.category_name] = subCategory
      
    }
    setValueAside(valuesAside)
    setValueCategories(categoriesFinal)
  }

  const selectCheckbox = (item, asideName) => {
    console.log(item, asideName)
    const valueResult = valueAside[asideName].find((p) => p.id === item.id);
    if (valueResult) {
      setValueAside({
        ...valueAside,
        [asideName]: valueAside[asideName].filter((e) => e.id !== item.id),
      });
    } else {
      setValueAside({
        ...valueAside,
        [asideName]: [...valueAside[asideName], { value: item.id, id: item.id }],
      });
    }
  };

  const filterItems = () => {
    // console.log(valueAside);
    const hasFilters = Object.values(valueAside).some((arr) => arr.length > 0);

    if (!hasFilters) return productsList; 

    
    return productsList.filter((product) => {
      return Object.keys(valueAside).every((asideName) => {
        if (valueAside[asideName].length === 0) return true; 

        return valueAside[asideName].some((f) => product.data.subCategory_id.includes(f.id));
      });
    });
  };


  return {
    valueAside,
    selectCheckbox,
    category,
    valueCategories,
    productsList,
    filterItems,
  };
};

export default useBussinesCardController;