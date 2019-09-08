import React, { useState } from 'react'
import cn from 'classnames'

export default ({ pixmap, setPixmap }) => {
  const [on, setOn] = useState(false)
  return (
    <div
      id='pad'
      onPointerDown={event => {
        event.preventDefault()
        setOn(true)
      }}
      onPointerUp={() => setOn(false)}>
        {pixmap.map((row, i) => (
          <div key={i}>
          {row.map((pix, j) => (
            <div
              key={j}
              className={cn({ active: pix })}
              onMouseEnter={event => {
                if(on) {
                  if(event.nativeEvent.which === 0)
                    setOn(false)
                  else {
                    pixmap[i][j] = true
                    setPixmap([...pixmap])
                  }
                }
              }}
            />
          ))}
          </div>
        ))}
    </div>
  )
}
