import React, { useRef, useEffect } from 'react'
import { compact } from 'lodash'
import vis from 'vis-network'

export default ({ model }) => {
  const node = useRef()
  useEffect(() => {
    const data = {
      nodes: new vis.DataSet(compact(model.map(neuronToNode))),
      edges: new vis.DataSet(compact(model.mapWeights(weightToLink)))
    }
    const network = new vis.Network(node.current, data, {
      physics: false,
      nodes: {
        fixed: true,
        borderWidth: 2
      }
    })

    network.on('afterDrawing', ctx => {
      ctx.setLineDash([6])
      ctx.strokeStyle = 'rgb(43, 124, 233)'
      ctx.beginPath()
      ctx.moveTo(0, -100)
      ctx.lineTo(0, 100)
      ctx.stroke()
    })

    const id = setInterval(() => data.nodes.update(compact(model.map(neuronToNode))), 100)
    return () => clearInterval(id)
  }, [model])
  return <div ref={node}/>
}

const neuronToNode = (neuron, layerIndex, i, layerSize) => {
  if(layerIndex === 0) {
    if(i >= 8 && i < 142)
      return null
    layerSize = 22
    i = i >= 142 ? i - 128 : i
  }
  return {
    id: `${layerIndex}-${i}`,
    color: { background: `rgba(255, 255, 255, ${neuron.value})` },
    x: layerIndex * 350,
    y: (i - (layerSize / 2 - .5)) * ((16 / layerSize) ** .8 * 50)
  }
}

const weightToLink = (weight, layerIndex, i, j) => {
  if(layerIndex === 1) {
    if(j >= 8 && j < 142)
      return null
    j = j >= 142 ? j - 128 : j
  }
  return {
    id: `${layerIndex}-${i}-${j}`,
    label: weight,
    from: `${layerIndex - 1}-${j}`,
    to: `${layerIndex}-${i}`
  }
}
