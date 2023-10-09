import NextLink from 'next/link';
import { DataGrid, GridColDef,GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "../../../components/layouts"
import { Chip, Grid, Link, Typography } from '@mui/material';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field:'paid',
        headerName:'Pagada',
        description:'Muestra informacion si esta pagada la orden',
        width:200,
        renderCell:(params: GridRenderCellParams)=>{

            return ( 
                params.row.paid
            ?<Chip color="success" label='Pagada' variant="outlined"/>
            :<Chip color="error" label='No pagada' variant="outlined"/>
            )
        }
    },

    {
        field:'Ver orden',
        headerName:'Ver orden',
        description:'Ir a la orden',
        sortable:false,
        width:200,
        renderCell:(params: GridRenderCellParams)=>{

            return ( 
             <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                <Link underline='always'>Ver orden</Link>
             </NextLink>
            )
        }
    }
]

const rows = [
    { id: 1, paid: true, fullname: 'Enzo Giacoia' },
    { id: 2, paid: true, fullname: 'Roberto Gonzalez' },
    { id: 3, paid: false, fullname: 'Maria Vallejo' },
    { id: 4, paid: false, fullname: 'Raul Melgarejo' },
    { id: 5, paid: true, fullname: 'Melba Gonzalez' },
    { id: 6, paid: false, fullname: 'Raul Soca' },
]



const HistoryPage = () => {
    return (
        <ShopLayout title="Historial de ordenes" pageDescription="Historial de ordenes del cliente" imageFullUrl="" >
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>


            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}

                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default HistoryPage