import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'antd'
import { times } from 'lodash'
import Pad from './Pad'
import Info from './Info'
import Graph from './Graph'
import Result from './Result'
import { Network } from './network'
import './index.less'

const App = () => {
  const [pixmap, setPixmap] = useState(() => times(15, () => times(10, () => false)))
  const [network] = useState(() => new Network())
  const [result, setResult] = useState(null)

  useEffect(() => {
    const handleKey = event => {
      if(event.code === 'Escape')
        setPixmap(times(15, () => times(10, () => false)))
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <div id='digitai'>
      <Row>
        <Col span={8}>
          <Pad
            pixmap={pixmap}
            setPixmap={setPixmap}
          />
        </Col>
        <Col span={8}>
          <Info pixmap={pixmap}/>
        </Col>
        <Col span={8}>
          <Result result={result}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Graph network={network}/>
        </Col>
      </Row>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
