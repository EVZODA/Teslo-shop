import { useContext, useState } from "react"
import { Router, useRouter } from "next/router"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UiContext } from "../../context"


export const SideMenu = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext)
    const { toogleSideMenu, isMenuOpen } = useContext(UiContext)
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        navigateTo(`/search/${searchTerm}`)
    }



    const navigateTo = (url: string) => {
        toogleSideMenu()
        router.push(url)

    }


    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toogleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            tabIndex={0}
                            autoFocus
                            type='text'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" ? onSearchTerm() : null}
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    {isLoggedIn === true ?
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>

                        </> : ""
                    }


                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => (navigateTo('/category/men'))}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => (navigateTo('/category/women'))}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        button
                        sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => (navigateTo('/category/kid'))}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>


                    {isLoggedIn === false ? (<ListItem
                        onClick={() => (navigateTo(`/auth/login?p=${router.asPath}`))}
                        button>
                        <ListItemIcon>
                            <VpnKeyOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>) :

                        (<ListItem button onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>)}


                    {/* Admin */}
                    <Divider />
                    {user?.role === "admin" ? <>
                        <ListSubheader>Admin Panel</ListSubheader>

                        <ListItem button>
                            <ListItemIcon>
                                <CategoryOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Productos'} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ordenes'} />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <AdminPanelSettings />
                            </ListItemIcon>
                            <ListItemText primary={'Usuarios'} />
                        </ListItem>
                    </> : ""}
                </List>
            </Box>
        </Drawer>
    )
}