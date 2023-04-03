const justTheEpisodeNumber = (episode: string[]) => {
  return episode.map((url) => url.slice(40).concat(', '))
}

export default justTheEpisodeNumber
