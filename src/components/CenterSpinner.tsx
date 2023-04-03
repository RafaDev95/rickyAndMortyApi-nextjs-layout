import { Box, CircularProgress } from '@mui/material'

const CenterSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="400px"
    >
      <CircularProgress color="info" size={80} />
    </Box>
  )
}
export default CenterSpinner
