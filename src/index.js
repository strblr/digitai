import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Network } from './network'
import InputLayer from './InputLayer'
import OutputLayer from './OutputLayer'
import Graph from './Graph'
import './index.less'

const App = () => {
  const [network] = useState(() => new Network([150, 16, 16, 10]))
  return <>
    <div>
      <InputLayer network={network}/>
      <OutputLayer network={network}/>
    </div>
    <Graph network={network}/>
  </>
}

ReactDOM.render(<App/>, document.getElementById('root'))
