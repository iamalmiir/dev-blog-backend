import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material'
import { MdOutlineDeveloperMode } from 'react-icons/md'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='secondary'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MdOutlineDeveloperMode />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            DevBlog
          </Typography>
          <Button color='inherit'>Developers</Button>
          <Button color='inherit'>Register</Button>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
