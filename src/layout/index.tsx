import { Container, Box, Typography, useTheme } from '@mui/material'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Container maxWidth="lg" sx={{ height: '100vh' }}>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
export default Layout
