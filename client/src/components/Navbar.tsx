import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import NavDrawer from './NavDrawer'
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
          <Box>
            <Typography
              variant='subtitle1'
              sx={{
                cursor: 'pointer',
                margin: '0 1rem',
                display: { xs: 'none', md: 'inherit' },
              }}
              component='div'
            >
              <a color='inherit'>Developers</a>
            </Typography>
          </Box>
          <Box>
            <Typography
              variant='subtitle1'
              sx={{ cursor: 'pointer', display: { xs: 'none', md: 'inherit' } }}
              component='div'
            >
              <a color='inherit'>Register</a>
            </Typography>
          </Box>
          <NavDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
