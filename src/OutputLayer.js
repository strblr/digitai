import React, { useEffect } from 'react'
import useForceUpdate from 'use-force-update'

export default ({ model }) => {
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    const id = setInterval(() => forceUpdate(), 100)
    return () => clearInterval(id)
  }, [forceUpdate])

  let max = { value: 0, index: 0 }
  model.layer(model.size() - 1).forEach((neuron, index) => {
    if(neuron.value > max.value)
      max = { value: neuron.value, index }
  })

  return (
    <div id='output'>
      <h2>Output</h2>
      <b>{max.index}</b>
    </div>
  )
}
