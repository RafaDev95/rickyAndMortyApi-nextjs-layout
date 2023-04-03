/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import { CircularProgress, Box } from '@mui/material'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { getCharactersForSSR, getSingleCharacter } from 'api'
import { AllCharactersResponse, Character } from 'types'
import CharacterApresentationCard from 'components/CharacterApresentationCard'
import CenterSpinner from 'components/CenterSpinner'

type Props = {
  character: Character
}

const Character = ({ character }: Props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <CenterSpinner />
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {!character ? (
        <CircularProgress color="info" size={80} />
      ) : (
        <CharacterApresentationCard character={character} />
      )}
    </Box>
  )
}

export default Character

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['characters'], getCharactersForSSR)

  const { data } = dehydrate(queryClient).queries[0].state as {
    data: AllCharactersResponse
  }

  let paths: any[] = []

  data?.results?.forEach((character: Character) =>
    paths.push({ params: { id: String(character.id) } })
  )

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['character'], () =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getSingleCharacter(String(params!.id))
  )

  const { data } = dehydrate(queryClient).queries[0].state as {
    data: Character
  }

  return {
    props: { character: data }
  }
}
