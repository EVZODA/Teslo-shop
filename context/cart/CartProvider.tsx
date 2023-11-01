import { FC, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie'
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces';





export interface Cartstate {
  isLoaded:boolean;
  cart: ICartProduct[];
  numberOfitems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const CART_INITIAL_STATE: Cartstate = {
  isLoaded:false,
  cart: [],
  numberOfitems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
}

interface Props {
  children: JSX.Element | JSX.Element[]
}




export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)
  

  useEffect(() => {

    try {
      const productsIncart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!):[]
    dispatch({type:'[Cart] - LoadCart from cookies | storage',payload:productsIncart})
    } catch (error) {
      dispatch({type:'[Cart] - LoadCart from cookies | storage',payload:[]})
    }
   }, [])

   const isReloading = useRef( true );

   useEffect( () => {
    if ( isReloading.current ) {
        isReloading.current = false;
    } else {
        Cookie.set( 'cart', JSON.stringify( state.cart ) );
    }
}, [ state.cart ] );

  
   useEffect(() => {

    const numberOfitems = state.cart.reduce((prev, current)=>current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current)=>(current.price*current.quantity) + prev, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const OrderSummary = {
      numberOfitems,
      subTotal,
      tax:subTotal*taxRate,
      total: subTotal*(taxRate+1)
    }

    dispatch({type:'[Cart] - Update order summary', payload:OrderSummary})


   }, [state.cart])





  const addProductToCart = (product: ICartProduct) => {

    const productIncart = state.cart.some(p=>p._id===product._id)
    if(!productIncart) return dispatch ({type:'[Cart] - Update products in cart',payload:[...state.cart,product]})


    const productInCartButDifferentSize = state.cart.some(p=>p._id===product._id && p.size===product.size)
    if(!productInCartButDifferentSize) return dispatch ({type:'[Cart] - Update products in cart',payload:[...state.cart,product]})

    const updatedProducts = state.cart.map(p=>{
      if(p._id!==product._id) return p
      if(p.size!==product.size) return p

      p.quantity+=product.quantity
      return p
    })

    dispatch ({type:'[Cart] - Update products in cart',payload:updatedProducts})

  }

  const updateProductToCart = (product: ICartProduct) => {
    dispatch ({type:'[Cart] - Change cart quantity',payload:product})
  }

  const removeProductInCart = (product: ICartProduct) => {
    dispatch ({type:'[Cart] - Remove cart product',payload:product})
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateProductToCart,
      removeProductInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}