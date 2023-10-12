import NextLink from 'next/link'
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography, Badge } from "@mui/material"
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router';
import { UiContext } from '../../context';
import { useContext } from 'react';


export const Navbar = () => {

    const { asPath, push } = useRouter();

    const {toogleSideMenu} = useContext(UiContext)

  return (
   <AppBar>
    <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
            <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ml:0.5}}>Shop</Typography>
            </Link>
        </NextLink>
    

        <Box flex={1} />

        <Box sx={{display:{xs:'none', sm:'block'}}}>
            <NextLink href="/category/men" passHref legacyBehavior>
                <Link >
                <Button color={asPath==="/category/men"?"primary":"info"} >Hombres</Button>
                </Link>
            </NextLink>

            <NextLink href="/category/women" passHref legacyBehavior>
                <Link>
                <Button color={asPath==="/category/women"?"primary":"info"}>mujeres</Button>
                </Link>
            </NextLink>

            <NextLink href="/category/kid" passHref legacyBehavior>
                <Link>
                <Button color={asPath==="/category/kid"?"primary":"info"}>Niños</Button>
                </Link>
            </NextLink>
            </Box>

        <Box flex={1} />

        <IconButton>
            <SearchOutlined/>
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
                <Link>
                <IconButton>
                    <Badge badgeContent={2} color='secondary'>
                        <ShoppingCartOutlined/>
                    </Badge>
                </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toogleSideMenu}>
                Menu
            </Button>

    </Toolbar>
   </AppBar>
  )
}
