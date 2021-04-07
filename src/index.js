import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DataProvider } from 'context'
import 'index.css'
import Users from 'components/Users'
import Albums from 'components/Albums'
import Photos from 'components/Photos'

function App() {
  return (
    <div className="gallery">
      <div className="gallery-wrapper">
        <DataProvider>
          <Router>
            <Switch>
              <Route path="/users/:userId/albums/:albumId">
                <Photos />
              </Route>
              <Route path="/users/:userId">
                <Albums />
              </Route>
              <Route path="/">
                <Users />
              </Route>
            </Switch>
          </Router>
        </DataProvider>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
