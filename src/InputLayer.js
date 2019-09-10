import React from 'react'
import { Button } from 'antd'
import useForceUpdate from 'use-force-update'
import { times } from 'lodash'

export default ({ model }) => {
  const forceUpdate = useForceUpdate()
  return (
    <div id='input'>
      <h2>Input</h2>
      <div
        id='pad'
        onPointerDown={event => event.preventDefault()}>
        {times(15, i => (
          <div key={i}>
          {times(10, j => {
            const index = i * 10 + j
            return (
              <div
                key={j}
                style={{ background: `rgba(43, 124, 233, ${model.neuron(0, index).value})` }}
                onMouseEnter={event => {
                  if(event.nativeEvent.which === 1) {
                    model.neuron(0, index).value = 1
                    forceUpdate()
                  }
                }}
              />
          )})}
          </div>
        ))}
      </div>
      <Button
        icon='delete'
        onClick={() => {
          times(150, index => { model.neuron(0, index).value = 0 })
          forceUpdate()
        }}
      />
    </div>
  )
}
