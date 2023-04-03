import HeroContent from 'layout/HeroContent'
import { useAppSelector } from 'reduxState/hooks'

const Favorites = () => {
  const favoriteCharacters = useAppSelector((state) => state.favorite.list)

  return (
    <HeroContent
      isFavoritePage
      favoriteCharacters={favoriteCharacters}
      pageTitle="Favoritos"
    />
  )
}
export default Favorites
