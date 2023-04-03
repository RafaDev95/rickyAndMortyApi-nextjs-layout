/* eslint-disable prefer-const */
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  useTheme
} from '@mui/material'
import { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useRouter } from 'next/router'

import PwithSpan from './PwithSpan'
import { Character } from 'types'
import { setFavorite } from 'reduxState/slices/favorite'
import justTheEpisodeNumber from 'utils/JustTheEpisodeFunction'
import { useAppDispatch, useAppSelector } from 'reduxState/hooks'
import isServer from './isServer'

type Props = {
  sx?: {
    [key: string]: string | number
  }
  character: Character
}

const CardComponent = ({ sx, character }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const favList = useAppSelector((state) => state.favorite.list)

  useEffect(() => {
    if (!isServer()) {
      const favListIds = favList.map(({ id }) => id)

      if (favListIds.includes(character.id)) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    }
  }, [isServer(), favorited])

  const theme = useTheme()
  return (
    <Card sx={sx}>
      <CardActionArea
        sx={{ height: '700px' }}
        onClick={() => router.push(`/character/${character.id}`)}
      >
        <CardMedia
          component="img"
          sx={{ objectFit: 'contain' }}
          image={character.image}
          alt="character profile"
        />
        <CardContent
          sx={{
            '& >p': {
              mt: '.3rem',
              fontSize: '15px',
              fontWeight: 600,
              color: theme.palette.lightColors[200],

              '& >span': {
                color: theme.palette.lightColors[300]
              }
            }
          }}
        >
          <PwithSpan text="ID" spanText={character.id} />
          <PwithSpan text="Name" spanText={character.name} />
          <PwithSpan text="Species" spanText={character.species} />
          <PwithSpan text="Status" spanText={character.status} />
          <PwithSpan text="Gender" spanText={character.gender} />
          <PwithSpan text="Location" spanText={character.location.name} />
          <PwithSpan text="Origin" spanText={character.origin.name} />
          {character.type && (
            <PwithSpan text="Type" spanText={character.type} />
          )}
        </CardContent>
        <CardContent
          sx={{
            '& >p': {
              fontWeight: 600,
              color: theme.palette.lightColors[200],
              gridColumn: 'span 2',
              fontSize: '15px',

              '& >span': {
                color: theme.palette.lightColors[100]
              }
            }
          }}
        >
          <PwithSpan
            text="Episode(s)"
            spanText={justTheEpisodeNumber(character.episode)}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="Favorite"
          title="Favorite"
          sx={{
            marginLeft: 'auto',
            marginRight: '1rem'
          }}
          onClick={() => {
            dispatch(setFavorite(character))
            setFavorited(!favorited)
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: theme.palette.darkColors[300] }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default CardComponent
