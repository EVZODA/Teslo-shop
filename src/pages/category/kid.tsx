import { NextPage } from "next"
import { ShopLayout } from "../../../components/layouts"
import { Typography } from "@mui/material"
import { ProductList } from "../../../components/products"
import { useProducts } from "../../../hooks"
import { FullScreenLoading } from "../../../components/ui"



const KidPage:NextPage = () => {

  const {products, isLoading} = useProducts('/products?gender=kid')
 
  return (
   <ShopLayout title={"Teslo-shop - kid"} pageDescription={"Encuentra los mejores productos de niños aqui"} imageFullUrl={""} >
    <Typography variant="h1" component="h1">Tienda</Typography>
    <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>

    {
      isLoading?<FullScreenLoading/>:<ProductList products={products}/>
    }
   </ShopLayout>
  )
}

export default KidPage