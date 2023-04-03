/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Container,
  useTheme,
  Grid,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Pagination,
  Box,
  Button
} from '@mui/material'
import { Toaster, toast } from 'react-hot-toast'
import { useState, useRef, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import CardComponent from 'components/CardComponent'
import FlexBetween from 'components/FlexBetween'
import { AllCharactersResponse, Character } from 'types'
import SearchIcon from '@mui/icons-material/Search'
import { getCharactersForClient, getFilteredCharacters } from 'api'
import CenterSpinner from 'components/CenterSpinner'

type Props = {
  characters?: AllCharactersResponse
  isFavoritePage?: boolean
  favoriteCharacters?: Character[]
  pageTitle?: string
}

const searchKeys = ['name', 'status', 'species', 'type', 'gender']

const HeroContent = ({
  characters,
  isFavoritePage,
  favoriteCharacters,
  pageTitle = 'Página Inicial'
}: Props) => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery('(min-width:1000px)')

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [charactersForRender, setCharactersForRender] = useState<Character[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('name')
  const [filteredPagesQty, setFilteredPagesQty] = useState({
    isNew: false,
    pages: 0
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearchClick = async () => {
    setIsLoading(true)
    const name = searchInputRef.current?.value
    setSearchValue(name!.toLowerCase())

    const data = await getFilteredCharacters(searchKey, searchValue)

    if (data?.results) {
      setCharactersForRender(data.results)
      setFilteredPagesQty({ isNew: true, pages: data.info.pages })
      setIsLoading(false)
    } else {
      toast.error(`${searchKey.toUpperCase()} Inválida(o)`)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handlePagination = async (pageNumber: number) => {
    let nextCharactersPage

    filteredPagesQty.isNew
      ? (nextCharactersPage = await getFilteredCharacters(
          searchKey,
          searchValue,
          Number(pageNumber)
        ))
      : (nextCharactersPage = await getCharactersForClient(Number(pageNumber)))

    console.log(nextCharactersPage)

    setCharactersForRender(nextCharactersPage.results)
  }

  const handleSearchKeys = (key: string) => {
    setSearchKey(key)
    setSearchValue('')
  }

  useEffect(() => {
    if (isFavoritePage) {
      setCharactersForRender(favoriteCharacters)
    } else {
      setCharactersForRender(characters?.results)
    }
  }, [isFavoritePage, favoriteCharacters])

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '60vh',
        boxShadow: theme.shadows[3],
        bgcolor: theme.palette.darkColors[200],
        my: '2rem',
        borderRadius: '.5rem',
        padding: '2rem'
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <FlexBetween
        sx={{
          mb: '1rem',
          bgcolor: theme.palette.darkColors[100],
          p: '.5rem',
          borderRadius: '.5rem'
        }}
      >
        {!isFavoritePage && (
          <FlexBetween
            sx={{
              flex: 0.9,
              flexDirection: isMediumScreen ? 'row' : 'column',
              gap: isMediumScreen ? '0' : '2rem',
              maxWidth: '100%'
            }}
          >
            <Box>
              <Typography
                mb="1rem"
                sx={{ textDecoration: 'underline', fontSize: '18px' }}
              >
                Escolha qual filtro dessa usar para busca:
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns={
                  isMediumScreen ? 'repeat(4,1fr)' : 'repeat(2,1fr)'
                }
                mb=".5rem"
                gap=".5rem"
              >
                {searchKeys.map((key) => (
                  <Button
                    sx={{ textTransform: 'capitalize' }}
                    variant="contained"
                    color={searchKey === key ? 'secondary' : 'primary'}
                    key={key}
                    onClick={() => handleSearchKeys(key)}
                  >
                    <Typography>{key}</Typography>
                  </Button>
                ))}
              </Box>
              <TextField
                placeholder={`Busca por ${searchKey}`}
                size="small"
                value={searchValue}
                onChange={handleSearchChange}
                inputRef={searchInputRef}
                onKeyDown={handleKeyDown}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchClick}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  bgcolor: 'white',
                  borderRadius: '5px',
                  // width: isMediumScreen ? '100%' : '200px',

                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none'
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ maxWidth: '400px' }}>
              <Typography>
                Atenção: Ao utilizar a busca, lembre-se de usar valores iguais
                aos apresentados em cada carta do personagem. <br />
                Por exemplo:{' '}
                <span
                  style={{
                    fontWeight: 600,
                    color: 'black',
                    textDecoration: 'underline'
                  }}
                >
                  Name: Rick
                </span>{' '}
                <span
                  style={{
                    fontWeight: 600,
                    color: 'black',
                    textDecoration: 'underline'
                  }}
                >
                  Species: Human
                </span>
              </Typography>
            </Box>
          </FlexBetween>
        )}

        {isFavoritePage && (
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              textDecoration: 'underline',
              marginLeft: 'auto'
            }}
          >
            {pageTitle}
          </Typography>
        )}
      </FlexBetween>
      <Grid container spacing={2}>
        {isLoading ? (
          <CenterSpinner />
        ) : (
          charactersForRender?.map((character) => (
            <Grid item key={character.id} md={4} sm={6} xs={12}>
              <CardComponent character={character} />
            </Grid>
          ))
        )}
      </Grid>
      {!isFavoritePage && (
        <Box
          sx={{
            bgcolor: theme.palette.darkColors[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            m: '1rem 0',
            borderRadius: '.5rem',
            p: '.5rem'
          }}
        >
          <Pagination
            sx={{ bgcolor: 'white', p: '.5rem', borderRadius: '.5rem' }}
            count={
              filteredPagesQty.isNew
                ? filteredPagesQty.pages
                : characters?.info.pages
            }
            variant="outlined"
            shape="rounded"
            defaultPage={1}
            defaultChecked={true}
            onClick={(e: React.BaseSyntheticEvent) =>
              handlePagination(e.target.innerText)
            }
            hideNextButton
            hidePrevButton
          />
        </Box>
      )}
    </Container>
  )
}
export default HeroContent
