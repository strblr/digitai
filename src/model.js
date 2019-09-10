import { pull, times } from 'lodash'
import assert from 'assert'

class Neuron {
  constructor(backLayer) {
    this.value = Math.random()
    this.bias = Math.random()
    this.weights = (backLayer || []).map(() => Math.random())
    this.backLayer = backLayer
  }
}

export class Model {
  constructor(layers) {
    assert(layers.length > 1, 'The model must have at least two layers')
    let backLayer = null
    this.layers = layers.map(size => (backLayer = times(size, () => new Neuron(backLayer))))
    this.listeners = {
      'change': []
    }
  }

  size(layerIndex) {
    if(layerIndex === undefined)
      return this.layers.length
    return this.layers[layerIndex].length
  }

  layer(layerIndex) {
    return this.layers[layerIndex]
  }

  neuron(layerIndex, i) {
    return this.layers[layerIndex][i]
  }

  map(callback) {
    return this.layers.reduce((acc, layer, layerIndex) =>
      [...acc, ...layer.map((neuron, i) => callback(neuron, layerIndex, i, layer.length))],
    [])
  }

  mapWeights(callback) {
    return this.layers.reduce((acc, layer, layerIndex) =>
      [...acc, ...layer.reduce((acc, neuron, i) =>
        [...acc, ...neuron.weights.map((weight, j) => callback(weight, layerIndex, i, j))],
      [])],
    [])
  }

  on(event, callback) {
    this.listeners[event].push(callback)
  }

  off(event, callback) {
    pull(this.listeners[event], callback)
  }
}
