import React, { useState } from 'react'
import './app.scss'

import oneImg from './assets/images/one.png';
import fiveImg from './assets/images/five.jpg'
function App() {
  const [count, setCounts] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  return (
    <>
      {/* <img src={oneImg} alt=""  />
        <img src={fiveImg} alt=""  />
        <h2>webpack5-react-ts</h2> */}
      <h2>修改一下</h2>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
    </>
  )

}
export default App