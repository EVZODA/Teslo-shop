import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../../components/layouts"


const AddressPage = () => {
  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion de destino" imageFullUrl="" >
        <Typography variant="h1" component="h1">Direccion</Typography>

        <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={6}>
                <TextField label="Nombre" variant="filled" fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="apellido" variant="filled" fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="direccion" variant="filled" fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="direccion 2 (opcional)" variant="filled" fullWidth></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                <Select
                variant="filled"
                label="pais"
                value={1}
                >
                <MenuItem value={1}>Costa Rica</MenuItem>
                <MenuItem value={2}>Honduras</MenuItem>
                <MenuItem value={3}>Ecuador</MenuItem>
                <MenuItem value={4}>Peru</MenuItem>
                </Select>
               </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label="Telefono" variant="filled" fullWidth></TextField>
            </Grid>
        </Grid>

        <Box sx={{mt:5, display:'flex', justifyContent:'center'}}>
            <Button color="secondary" className="circular-btn" size="large">
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage