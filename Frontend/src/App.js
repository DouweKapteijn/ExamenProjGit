import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { routes } from './routes'
import Sidebar from './components/sidebar'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
