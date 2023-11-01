import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../../../components/layouts"
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { tesloApi } from '../../../api';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '../../../utils';
import { AuthContext } from '../../../context';
import { useRouter } from 'next/router';


type FormInput = {
    name:string,
    email: string
    password: string
}

const RegisterPage = () => {

    const router = useRouter()
    const {registerUser} = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const onLoginRegister = async ({email, password, name}: FormInput) => {
       setShowError(false)
       const {hasError, message} = await registerUser(name, email,password)

       if (hasError) {
        setShowError(true)
        setErrorMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return
       }

       const destination = router.query.p?.toString() || '/'
       router.replace(destination)

    }





  return (
    <AuthLayout title="Ingresar">
        <form onSubmit={handleSubmit(onLoginRegister)} noValidate>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1">Registrarse</Typography>
                    <Chip 
                            label="Algo salio mal intentalo nuevamente" 
                            color='error' 
                            icon={<ErrorOutline/>} 
                            className='fadeIn' 
                            sx={{display:showError?'flex':"none"}}
                            />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                     label="Nombre completo"
                    variant="filled" 
                    fullWidth
                    {
                        ...register('name', {
                            required:'Este campo es requerido',


                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    label="Correo"
                    type='email'
                    variant="filled"
                    fullWidth
                    {
                        ...register('email', {
                            required:'Este campo es requerido',
                            validate:validations.isEmail


                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                     label="Contraseña"
                     type="password" 
                     variant="filled" 
                     fullWidth
                     {
                        ...register('password', {
                            required:'Este campo es requerido',
                            minLength:{value:6,message:'Minimo 6 caracteres'}
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                     />
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" type='submit' fullWidth>Registrar</Button>
                </Grid>
               
                <Grid item xs={12} display="flex" justifyContent="end">
                    <NextLink href={ router.query.p? `/auth/login?p=${router.query.p}`:'/auth/login'} >
                        <Link underline='always'>¿Ya tienes cuenta?</Link>
                    </NextLink>
                </Grid>

            </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage
