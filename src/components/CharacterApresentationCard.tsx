import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  useTheme,
  Box,
  Typography
} from '@mui/material'

import { Character } from 'types'
import justTheEpisodeNumber from 'utils/JustTheEpisodeFunction'
import Link from 'next/link'

import PwithSpan from './PwithSpan'

type Props = {
  character: Character
}

const CharacterApresentationCard = ({ character }: Props) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        boxShadow: theme.shadows[3],
        border: '1px solid white',
        display: 'flex'
      }}
    >
      <Box display="flex" flexDirection="column">
        <CardMedia
          component="img"
          height="100%"
          image={character?.image}
          sx={{
            minWidth: '300px',
            objectFit: 'contain'
          }}
          alt="character profile"
        />

        <CardContent
          sx={{
            display: 'flex',
            maxWidth: '500px',
            '& >p': {
              fontWeight: 600,
              color: theme.palette.lightColors[200],
              '& >a': {
                color: theme.palette.lightColors[100]
              }
            }
          }}
        >
          <Typography
            sx={{
              '& >a': {
                '&:hover': {
                  color: theme.palette.darkColors[300]
                }
              }
            }}
          >
            Episode(s):{' '}
            {character?.episode?.map((url) => {
              const justTheNumber = justTheEpisodeNumber([url])

              return (
                <Link href={url} target="_blank" key={url}>
                  {justTheNumber}
                </Link>
              )
            })}
          </Typography>
        </CardContent>
      </Box>

      {/* Right */}
      <CardContent
        sx={{
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '& >p': {
            color: theme.palette.lightColors[200],
            fontWeight: 600,

            '& >span': {
              color: theme.palette.lightColors[300]
            }
          }
        }}
      >
        <PwithSpan text="ID" spanText={character.id} />
        <PwithSpan text="Species" spanText={character.species} />
        <PwithSpan text="Status" spanText={character.status} />
        <PwithSpan text="Name" spanText={character.name} />
        <PwithSpan text="Gender" spanText={character.gender} />

        {character.type && <PwithSpan text="Type" spanText={character.type} />}
        <Stack
          spacing={1}
          sx={{
            '&>p': {
              color: theme.palette.lightColors[200],
              fontWeight: 600,
              '&>span': { color: theme.palette.lightColors[300] }
            }
          }}
        >
          <PwithSpan text="Origin" />
          <PwithSpan text={character.origin.name} />
          <Typography
            sx={{
              '& a': {
                color: theme.palette.lightColors[200],
                fontWeight: 600,
                '&:hover': {
                  color: theme.palette.darkColors[300]
                }
              }
            }}
          >
            <Link
              href={character.origin.url}
              target="_blank"
              style={{
                textDecoration: 'none'
              }}
            >
              {character.location.url}
            </Link>
          </Typography>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            '&>p': {
              color: theme.palette.lightColors[200],
              fontWeight: 600,
              '&>span': { color: theme.palette.lightColors[300] }
            }
          }}
        >
          <PwithSpan text="Location:" />
          <PwithSpan text={character.location.name} />
          <Typography
            sx={{
              '& a': {
                color: theme.palette.lightColors[200],
                fontWeight: 600,
                '&:hover': {
                  color: theme.palette.darkColors[300]
                }
              }
            }}
          >
            <Link
              href={character.location.url}
              target="_blank"
              style={{
                textDecoration: 'none'
              }}
            >
              {character.location.url}
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
export default CharacterApresentationCard
