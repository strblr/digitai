import React from 'react'
import { Descriptions } from 'antd'
import { sum, sumBy } from 'lodash'

export default ({ model }) => (
  <div>
    <h2>Info</h2>
    <Descriptions column={1}>
      <Descriptions.Item label='Total Layers'>
        {model.size()}
      </Descriptions.Item>
      <Descriptions.Item label='Total Neurons'>
        {sumBy(model.layers, 'length')}
      </Descriptions.Item>
      <Descriptions.Item label='Total Weights'>
        {sum(model.layers.map((layer, layerIndex) =>
          layerIndex === 0 ? 0 : (layer.length * model.size(layerIndex - 1))
        ))}
      </Descriptions.Item>
    </Descriptions>
  </div>
)
