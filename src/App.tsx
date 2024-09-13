// import { useState } from 'react'
// import { Button, Space } from 'antd-mobile/2x'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Resize from './pages/resize';
import React from 'react'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <React.Suspense>
      <Routes>
        <Route path="/resize" element={<Resize />} />
      </Routes>
      {/* <WebComponent /> */}
    </React.Suspense>
  )
}

export default App
