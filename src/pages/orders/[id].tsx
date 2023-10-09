import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../../components/layouts"
import { CartList, OrderSummary } from "../../../components/cart"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';



const OrderPage = () => {
    return (
        <ShopLayout title="Resumen de la orden 123445646" pageDescription="Resumen de la orden" imageFullUrl={""} >
            <Typography variant="h1" component="h1">Orden:Abc123</Typography>

            {/* <Chip
      sx={{my:2}}
      label="Pendiente de pago"
      variant='outlined'
      color='error'
      icon={<CreditCardOffOutlined/>}
      /> */}

            <Chip
                sx={{ my: 2 }}
                label="Pago realizado"
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable={false} />


                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }}></Divider>

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                                <NextLink href="/checkout/address" passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography>Fernando herrera</Typography>
                            <Typography>Scalabrini ortiz</Typography>
                            <Typography>Canada</Typography>
                            <Typography>+54 2954303064</Typography>

                            <Divider sx={{ my: 1 }}></Divider>


                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref legacyBehavior>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                
                                <Chip
                                    sx={{ my: 2 }}
                                    label="Pago realizado"
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default OrderPage