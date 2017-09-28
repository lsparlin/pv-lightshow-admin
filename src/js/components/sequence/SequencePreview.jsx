import React from 'react'

const SequencePreview = (props) => {
  var totalSeconds = props.colorSequence.reduce((sum, next) => sum + next.duration, 0)
  const getPercent = (duration) => (duration / totalSeconds) * 100

  if (props.colorSequence.length) {
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
  } else {
    return (
      <div className="SequencePreview">
        <div style={{width: "100%", backgroundColor: "#FFF"}}> &nbsp; </div>
      </div>
    )
  }
}

export default SequencePreview
