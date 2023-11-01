import { ShopLayout } from "../../../components/layouts"
import { ProductSlideshow, SizeSelector } from "../../../components/products"
import { ItemCounter } from "../../../components/ui"
import { IProduct, ISize } from "../../../interfaces"
import { dbProducts } from "../../../database"
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getAllProductSlugs, getProductBySlug } from "../../../database/dbProducts"
import { ICartProduct } from '../../../interfaces/cart';
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { CartContext } from "../../../context"


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

   const {addProductToCart} = useContext(CartContext)

  const router = useRouter()

  const [temCartProduct, setTemCartProduct] = useState<ICartProduct>({
    _id:product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender:product.gender,
    quantity:1
  })


  const selectedSize = (size: ISize) => {
    setTemCartProduct(currentProduct=>({
      ...currentProduct,
      size
    }))
  }


  const updateQuantity = (quantity:number) => {
    setTemCartProduct(currentProduct=>({
      ...currentProduct,
      quantity
    }))
  }



  



  const onAddProduct = () => {


    if (!temCartProduct.size) return

    //llamar dispatch carrito

    addProductToCart(temCartProduct)

    

    router.push('/cart')
    
  }
  
 






  return (
    <ShopLayout title={product.title} pageDescription={product.description} imageFullUrl={""}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2">Cantidad</Typography>
            <ItemCounter 
            currentValue={temCartProduct.quantity}
            updateQuantity={updateQuantity}
            maxValue={product.inStock}
            />
            <SizeSelector
            selectedSize={temCartProduct.size}
            Sizes={product.sizes}
            onSelectedSize={(size)=>(selectedSize(size))}
            />
          </Box>

          {
            product.inStock > 0 ?
              (<Button color="secondary" className="circular-btn" onClick={onAddProduct}>
                { 
                temCartProduct.size?"Agregar al carrito" : "Selecciones una talla"

                }
              </Button>) :
              (<Chip label="No hay disponibles" color="error" variant="outlined" />)

          }

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Descripcion</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>


        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default ProductPage




export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productsSlugs = await dbProducts.getAllProductSlugs()
  const products: string[] = productsSlugs.map(product => product.slug)



  return {
    paths: products.map(slug => ({
      params: { slug }
    })),
    fallback: "blocking"
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {


  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24
  }
}


