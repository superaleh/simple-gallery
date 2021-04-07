import React from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { DataContext } from 'context'
import Loading from './Loading'

export default function Albums() {
  const { userId } = useParams()
  const match = useRouteMatch()
  let history = useHistory()
  const [{ albums, photos }] = React.useContext(DataContext)

  const onBack = () => {
    history.push('/')
  }
  const onOpen = (id) => {
    history.push(`${match.url}/albums/${id}`)
  }

  if (!albums || !photos) return <Loading />

  return (
    <div>
      <div onClick={onBack} className="back">
        Back to all authors
      </div>
      <div className="albums">
        {albums
          .filter((album) => album.userId === parseInt(userId))
          .map((album) => {
            const photosAlbum = photos.filter((photo) => photo.albumId === album.id)
            return (
              <div onClick={() => onOpen(album.id)} className="album" key={album.id}>
                <div className="album-cover">
                  <img src={photosAlbum[0].thumbnailUrl} alt={album.title} />
                </div>
                <div className="album-text">{album.title}</div>
                <div className="album-length">{photosAlbum.length}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
