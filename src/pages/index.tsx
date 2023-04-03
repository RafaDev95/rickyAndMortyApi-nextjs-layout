import HeroContent from 'layout/HeroContent'

import type { GetStaticProps } from 'next'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { getCharactersForSSR } from 'api'
import { AllCharactersResponse } from 'types'

type Props = {
  characters: AllCharactersResponse
}

const Index = ({ characters }: Props): JSX.Element => {
  return <HeroContent characters={characters} />
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['characters'], getCharactersForSSR, {
    staleTime: 1000 * 60 * 60 * 24
  })

  const { data } = dehydrate(queryClient).queries[0].state as {
    data: AllCharactersResponse
  }

  return {
    props: { characters: data }
  }
}
