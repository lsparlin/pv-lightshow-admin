import React from 'react'

const SequencePreview = (props) => {
  var totalSeconds = props.colorSequence.reduce((sum, next) => sum + next.duration, 0)
  const getPercent = (duration) => (duration / totalSeconds) * 100

  return (
  <div className="SequencePreview">
    { props.colorSequence.map( (seqItem, index) => {
        var spanStyle = {
          width: getPercent(seqItem.duration) + "%",
          backgroundColor: `#${seqItem.color}`
        }
        return (
          <div key={index} style={spanStyle} title={seqItem.duration + 's'}> &nbsp; </div>
        )
      })
    }
  </div>
  )
}

export default SequencePreview
