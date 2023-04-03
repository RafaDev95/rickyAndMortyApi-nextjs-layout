import Link from 'next/link'
import { useTheme } from '@mui/material'
type LogoUrl = {
  link?: string
}

const Logo = ({ link = '/' }: LogoUrl) => {
  const theme = useTheme()
  return (
    <Link href={link}>
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          boxShadow: theme.shadows[7],
          borderRadius: '50%'
        }}
      />
    </Link>
  )
}
export default Logo
