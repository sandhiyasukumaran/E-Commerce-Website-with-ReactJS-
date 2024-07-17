import React, {useState, createContext, useEffect} from 'react';

export const CartContext= createContext();

const CartProvider = ({children}) => {
  const [cart, setCart] =useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total,setTotal]=useState(0);

useEffect(() => {
  const total = cart.reduce((accumulator, currentItem) =>{
    return accumulator + currentItem.price * currentItem.amount;
  },0);

  setTotal(total);

});

//changes the number on cart icon based on the number of items in cart
  useEffect(() =>{
    if(cart){
      const amount =cart.reduce((accumulator, currentItem)=>
      {
        return accumulator +currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  },[cart])

  const addToCart = (id,product) => {
    const newItem ={...product, amount:1};

    //check if item is already in cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    if(cartItem) {
      const newCart = [...cart].map((item) =>{
        if(item.id === id) {
          return {...item, amount:cartItem.amount +1}
      }
       else{
        return item;
       }
    });
    setCart(newCart);
  }
    else{
      setCart([...cart, newItem]);
    }

  };
  
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart= (id) => {
    setCart([]);

  };
  
  const increaseQuantity= (id)=>{
    const cartItem=cart.find(item => item.id === id);
    addToCart(id, cartItem);

  }
  const decreaseQuantity= (id)=>{
    const cartItem =cart.find((item) => {
      return item.id===id;
    } )
    if (cartItem){
      const newCart = cart.map(item=>{
        if(item.id===id){
          return {...item, amount: cartItem.amount -1};

        }
        else{
          return item;
        }
      });
      setCart(newCart);
    }

    if(cartItem.amount<2){
      removeFromCart(id);

    
 }
}

  console.log(cart);
  return <CartContext.Provider value={{cart, addToCart, removeFromCart, increaseQuantity, clearCart, decreaseQuantity, itemAmount, total}}>{children}</CartContext.Provider>;
};

export default CartProvider;
