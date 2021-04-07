import { DataContext } from 'context'
import { useParams } from 'react-router'
import React from 'react'
import Loading from 'components/Loading'

export default function Popup({ photoIndex, setPhotoIndex }) {
  const { albumId } = useParams()
  const [{ photos }] = React.useContext(DataContext)
  const [isLoad, setIsLoad] = React.useState(true)
  const photosAlbum = photos.filter((p) => p.albumId === parseInt(albumId))

  React.useEffect(() => {
    if (photoIndex === undefined) {
      setIsLoad(true)
    } else {
      const url = photosAlbum[photoIndex].url
      let downloadingImage = new Image()
      downloadingImage.onload = () => {
        setIsLoad(false)
      }
      downloadingImage.src = url
    }
  }, [photoIndex, photosAlbum])

  const closePopup = () => {
    setPhotoIndex()
  }
  const prevImage = () => {
    setIsLoad(true)
    setPhotoIndex(photoIndex - 1)
  }
  const nextImage = () => {
    setIsLoad(true)
    setPhotoIndex(photoIndex + 1)
  }

  if (photoIndex === undefined) return null

  return (
    <div className="popup">
      {isLoad ? (
        <Loading />
      ) : (
        <div className="popup-image">
          <img src={photosAlbum[photoIndex].url} alt="" />
          <div className="popup-text">{photosAlbum[photoIndex].title}</div>
        </div>
      )}
      <div onClick={closePopup} className="popup-close"></div>
      {photoIndex !== 0 && <div onClick={prevImage} className="popup-prev"></div>}
      {photoIndex !== photosAlbum.length - 1 && <div onClick={nextImage} className="popup-next"></div>}
      <div className="popup-blackout"></div>
    </div>
  )
}
