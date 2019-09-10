import React from 'react'
import ReactDOM from 'react-dom'
import { Model } from './model'
import InputLayer from './InputLayer'
import Info from './Info'
import OutputLayer from './OutputLayer'
import Network from './Network'
import './index.less'

const model = new Model([150, 16, 16, 10])

const App = () => <>
  <div>
    <InputLayer model={model}/>
    <Info model={model}/>
    <OutputLayer model={model}/>
  </div>
  <Network model={model}/>
</>

ReactDOM.render(<App/>, document.getElementById('root'))
