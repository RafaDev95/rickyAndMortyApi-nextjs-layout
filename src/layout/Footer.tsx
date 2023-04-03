import { Button, useTheme } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useRouter } from 'next/router'

import Logo from 'components/Logo'
import FlexBetween from 'components/FlexBetween'

const Footer = () => {
  const theme = useTheme()
  const router = useRouter()
  return (
    <FlexBetween
      sx={{
        borderRadius: '.5rem',
        boxShadow: theme.shadows[5],
        p: '1rem 3rem'
      }}
    >
      <Logo link="#home" />

      <Button
        variant="contained"
        color="secondary"
        endIcon={<FavoriteIcon />}
        onClick={() => router.push('/favorites')}
      >
        Favoritos
      </Button>
    </FlexBetween>
  )
}
export default Footer
