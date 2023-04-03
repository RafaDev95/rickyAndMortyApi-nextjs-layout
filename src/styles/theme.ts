import { createTheme } from '@mui/material/styles'

declare module '@mui/material' {
  interface PaletteOptions {
    darkColors: {
      [key: number]: string
    }

    lightColors: {
      [key: number]: string
    }
  }
}
declare module '@mui/material' {
  interface Palette {
    darkColors: {
      [key: number]: string
    }

    lightColors: {
      [key: number]: string
    }
  }
}

// declare module '@mui/material/styles' {
//   interface BreakpointsOptions {
//     mobile: number
//     tablet: number // adds the `tablet` breakpoint
//     laptop: number
//     desktop: number
//   }
// }

const theme = createTheme({
  palette: {
    darkColors: {
      100: '#46456a',
      200: '#181645',
      300: '#131237',
      400: '#0e0d29',
      500: '#0a091c',
      600: '#05040e'
    },
    lightColors: {
      100: '#d1d0da',
      200: '#a3a2b5',
      300: '#74738f'
    },
    primary: {
      main: '#0e0d29',
      contrastText: '#d1d0da'
    },
    secondary: {
      main: '#181645',
      contrastText: 'white'
    },
    info: {
      main: '#46456a'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif'
  }
  // typography: {
  //   fontFamily: '"Caveat", sans-serif'
  // }
  // breakpoints: {
  //   mobile: 0,
  //   tablet: 640,
  //   laptop: 900,
  //   desktop: 1200
  // }
})

export default theme
