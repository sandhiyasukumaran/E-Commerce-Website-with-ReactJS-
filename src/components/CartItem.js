import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {IoMdClose, IoMdRemove, IoMdAdd} from 'react-icons/io'
import { CartContext } from '../contexts/CartContext';


const CartItem = ({item}) => {
  const{ removeFromCart, increaseQuantity, decreaseQuantity}=useContext(CartContext);
  const {id, title, image, price, amount} =item;
  return(
  <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
    <div className='w-full min-h-[150px] flex items-center gap-x-4'>
      <Link to={`/product/${id}`} >
        <img className='max-w-[80px] 'src={image} />
      </Link>
      <div className='w-full flex flex-col'> 
      {/*title and remove icon*/}
      <div className='flex justify-between mb-2'>
        {/*title*/}
        <Link to={`/product/${id}`} className='text-sm uppercase font-medium max-w-[250px] text-primary hover:underline'>
          {title} 
        </Link>
        {/*remove icon*/}
        <div onClick={()=>removeFromCart(id)} className='text-xl cursor-pointer'>
          <IoMdClose className=  'hover:text-red-500 text-gray-500 transition' />
        </div>

      </div>
      <div className=' flex gap-x-2 h-[36px] text-sm'>

        {/*quantity*/}
        <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>

          {/*minus icon*/}
          <div onClick={()=>{decreaseQuantity(id)}} className='flex-1 flex justify-center items-center cursor-pointer'>
          <IoMdRemove/>
          </div>

          {/*number of items */}
          <div className='h-full flex justify-center items-center px-2'>{amount}</div>

          {/*plus icon*/}
          <div onClick={()=>{ increaseQuantity(id) }} className='flex-1 h-full flex justify-center items-center cursor-pointer'>
            <IoMdAdd/>
          </div>
          
        </div>

        {/*item price*/}
        <div className='flex-1 flex items-center justify-around'>{`$${price}`}</div>
        {/*final price*/}
        <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`$${parseFloat(price * amount).toFixed(2)}`}</div>

      </div>
     </div>
    </div>
  </div>
  );
};

export default CartItem;
