import React from 'react'
import cn from 'classnames'

export default ({ pixmap, setPixmap }) => (
  <div
    id='pad'
    onPointerDown={event => {
      event.preventDefault()
    }}>
      {pixmap.map((row, i) => (
        <div key={i}>
        {row.map((pix, j) => (
          <div
            key={j}
            className={cn({ active: pix })}
            onMouseEnter={event => {
              if(event.nativeEvent.which === 1) {
                pixmap[i][j] = true
                setPixmap([...pixmap])
              }
            }}
          />
        ))}
        </div>
      ))}
  </div>
)
