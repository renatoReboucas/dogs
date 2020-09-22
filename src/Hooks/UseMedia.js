import React from 'react'

export default function UseMedia(media) {
  const [match, setMatch] = React.useState(null)

  React.useEffect(() => {
    function changeMatch(){
      const { matches } = window.matchMedia(media);
      setMatch(matches)
    }
    changeMatch()
    window.addEventListener("resize", changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [match, media])
  return match
}
