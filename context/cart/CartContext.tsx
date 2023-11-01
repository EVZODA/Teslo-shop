import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface contextProps {
   isLoaded:boolean;
   cart: ICartProduct[];
   numberOfitems: number;
   subTotal: number;
   tax: number;
   total: number;
   addProductToCart: (product: ICartProduct) => void
   updateProductToCart: (product: ICartProduct) => void
   removeProductInCart: (product: ICartProduct) => void
}
export const CartContext = createContext({} as contextProps);