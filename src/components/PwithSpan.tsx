import { Typography } from '@mui/material'

type Props = {
  text: string
  spanText?: any
  sx?: {
    [key: string]: any
  }
}

const PwithSpan = ({ text, spanText, sx }: Props) => {
  return (
    <Typography sx={sx}>
      {text}: {spanText && <span>{spanText}</span>}
    </Typography>
  )
}
export default PwithSpan
