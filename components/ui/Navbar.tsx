import NextLink from 'next/link'
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography, Badge, Input, InputAdornment } from "@mui/material"
import { ClearOutlined, Search, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router';
import { CartContext, UiContext } from '../../context';
import { useContext, useState } from 'react';


export const Navbar = () => {

    const { asPath, push } = useRouter();

    const {toogleSideMenu, isMenuOpen} = useContext(UiContext)
    const {numberOfitems} = useContext(CartContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchVisible, setSearchVisible] = useState(false)
    

    const onSearchTerm = () => {
        if (searchTerm.trim().length===0) return 
        push(`/search/${searchTerm}`)
    }


    

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

        <Box sx={{display: searchVisible ? "none" : {xs:'none', sm:'block'}}}  className='fadeIn'>
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

     {
        searchVisible
        ?
        (
<Input

                    sx={{display:{xs:'none', sm:'flex'}}}
                    className='fadeIn'
                    autoFocus
                        type='text'
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" ? onSearchTerm() : null}
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                               onClick={()=>(setSearchVisible(false))}
                                >
                                 <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
        ) : (
            <IconButton
            className='fadeIn'
            onClick={()=>(setSearchVisible(true))}
            sx={{display:{xs:'none', sm: "flex"}}}
            >
                <SearchOutlined/>
            </IconButton>
        )
     }



        <IconButton sx={{display:{xs:'flex', sm: "none"}}}
        onClick={toogleSideMenu}
        >
            <SearchOutlined/>
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
                <Link>
                <IconButton>
                    <Badge badgeContent={numberOfitems>9?"+9":numberOfitems} color='secondary'>
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
