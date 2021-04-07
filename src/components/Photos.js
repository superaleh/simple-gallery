import React from 'react'
import { useHistory, useParams } from 'react-router'
import { DataContext } from 'context'
import Popup from './Popup'
import Loading from './Loading'

export default function Photos() {
  const { albumId } = useParams()
  let history = useHistory()
  const [{ photos }] = React.useContext(DataContext)
  const [photoIndex, setPhotoIndex] = React.useState()

  const onBack = () => {
    history.goBack()
  }
  const openPopup = (index) => {
    setPhotoIndex(index)
  }

  if (!photos) return <Loading />

  const photosAlbum = photos.filter((p) => p.albumId === parseInt(albumId))

  return (
    <div>
      <div onClick={onBack} className="back">
        Back to all albums
      </div>
      <div className="photos">
        {photosAlbum.map((photo, index) => (
          <div key={photo.id}>
            <div onClick={() => openPopup(index)} className="photo">
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          </div>
        ))}
      </div>
      <Popup photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
    </div>
  )
}
