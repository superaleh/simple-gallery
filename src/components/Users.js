import React from 'react'
import { useHistory } from 'react-router'
import { DataContext } from 'context'
import Loading from './Loading'

export default function Authors() {
  const [{ users }] = React.useContext(DataContext)
  let history = useHistory()

  const onOpen = (id) => {
    history.push(`/users/${id}`)
  }

  if (!users) return <Loading />

  return (
    <div className="authors">
      {users.map((user) => (
        <div onClick={() => onOpen(user.id)} className="author" key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  )
}
