import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Button
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import FlexBetween from 'components/FlexBetween'
import Logo from 'components/Logo'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Header = () => {
  const router = useRouter()

  const isMobile = useMediaQuery('(min-width:600px)')

  return (
    <AppBar position="static" sx={{ borderRadius: '.5rem', mt: '.5rem' }}>
      <Container maxWidth="lg" id="home">
        <Toolbar>
          <FlexBetween sx={{ flexGrow: 1 }}>
            <Logo />

            <Typography
              fontWeight={600}
              sx={{ display: isMobile ? 'block' : 'none' }}
            >
              Bem vindo, Visitante.
            </Typography>

            <FlexBetween flexGrow={0.1}>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<FavoriteIcon />}
                onClick={() => router.push('/favorites')}
              >
                Favoritos
              </Button>
              <Avatar src="/avatar.jpg" sx={{ width: 50, height: 50 }} />
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
