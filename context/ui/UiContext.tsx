import { createContext } from 'react';


interface contextProps {
   isMenuOpen: boolean;
   toogleSideMenu: () => void;
}
export const UiContext = createContext({} as contextProps);