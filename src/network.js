import { matrix, zeros } from 'mathjs'
import { drop } from 'lodash'
import assert from 'assert'

export class Network {
  constructor(layers) {
    assert(layers.length > 1, 'The network must have at least two layers')
    this.layers = layers.map(size => matrix(zeros(size, 1)))
    this.biases = drop(layers, 1).map(size => matrix(zeros(size, 1)))
    this.weights = drop(layers, 1).map((_, i) => matrix(zeros(layers[i + 1], layers[i])))
  }
}
