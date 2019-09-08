import React from 'react'
import { Descriptions } from 'antd'
import { sumBy } from 'lodash'

export default ({ pixmap }) => (
  <Descriptions title='Info' column={1}>
    <Descriptions.Item label='Pixel Total'>
      {pixmap.length * pixmap[0].length}
    </Descriptions.Item>
    <Descriptions.Item label='Active Pixels'>
      {sumBy(pixmap, row => sumBy(row, pix => pix ? 1 : 0))}
    </Descriptions.Item>
  </Descriptions>
)
