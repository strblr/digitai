import React, { useRef, useEffect } from 'react'
import vis from 'vis-network'
import { take, takeRight } from 'lodash'

export default ({ network }) => {
  const node = useRef()
  useEffect(() => {
    const data = neuronsToData(network)
    data.nodes = new vis.DataSet(data.nodes)
    data.edges = new vis.DataSet(data.edges)
    new vis.Network(node.current, data, {
      physics: false
    })
  }, [network])

  return <div ref={node}/>
}

const neuronsToData = network => ({
  nodes: network.layers.reduce((acc, layer, layerIndex) => {
    let array = []
    layer.forEach((value, index) => array.push({
      id: `${layerIndex}-${index[0]}`,
      label: value.toString(),
      x: layerIndex * 210,
      y: (index[0] - (layer.size()[0] / 2 - .5)) * ((16 / layer.size()[0]) ** .8 * 50)
    }))
    return [...acc, ...array]
  }, []),
  edges: network.weights.reduce((acc, weights, layerIndex) => {
    const array = []
    weights.forEach((weight, index) => array.push({
      id: `${layerIndex}-${index[0]}-${index[1]}`,
      label: weight,
      from: `${layerIndex}-${index[1]}`,
      to: `${layerIndex + 1}-${index[0]}`
    }))
    return [...acc, ...array]
  }, [])
})
