import React, {createContext, useState, useEffect} from 'react';

//create context to share product data across all components
export const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [products, setProducts]=useState([]);
  
  //useEffect(()=>{...},[]) runs function only when the component mounts
  useEffect(() =>{

    //fetch shopping products from fake API store
    const fetchProducts = async()=>{
      try{
        const response = await fetch('https://fakestoreapi.com/products');
        //console.log(response);
        if(!response.ok){
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setProducts(data);

      }
      catch(error){
        console.error(error);
      }
    };

    fetchProducts();
    
  },[]);

  return <ProductContext.Provider value={{products}}>
          {children}
          </ProductContext.Provider>;
};

export default ProductProvider;
