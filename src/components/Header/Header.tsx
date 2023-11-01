import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

const HEADER_SX = {
  flexGrow: 1,
}

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={HEADER_SX}>
          Next.js
        </Typography>
        <Button component={Link} href="/" color="inherit">
          Photos
        </Button>
        <Button component={Link} href="posts" color="inherit">
          Posts
        </Button>
        <Button component={Link} href="comments" color="inherit">
          Comments
        </Button>
        <Button component={Link} href="users" color="inherit">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export { Header }
