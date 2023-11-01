import { ICartProduct } from '../../interfaces';
import { Cartstate } from './index';

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change cart quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove cart product', payload: ICartProduct }
    | { type: '[Cart] - Update order summary', 
        payload: {
            numberOfitems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
}

export const cartReducer = (state: Cartstate, action: CartActionType): Cartstate => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded:true,
                cart: [...action.payload]
            }
        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map(cart=>{
                    if(cart._id!==action.payload._id) return
                    if(cart.size!==action.payload.size) return
                    return action.payload
                })

                
            }

            case '[Cart] - Remove cart product':
                return {
                    ...state,
                    cart: state.cart.filter(cart=>!(cart._id===action.payload._id && cart.size===action.payload.size))
                }
            
            case '[Cart] - Update order summary':
                return {
                    ...state,
                    ...action.payload
                }
    



        default:
            return state;
    }
}