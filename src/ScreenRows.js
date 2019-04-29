import React from 'react'

const ScreenRows = React.memo(function ScreenRows(props) {
  return (
    <div>
      <div>
        <span className="mr-2">person count</span>
        {props.select}
        <button className="btn btn-info" onClick={props.toggleView}>Paste from spreadsheet</button>
      </div>
      {props.children}
      <button className="btn btn-secondary mt-2" onClick={props.addPerson}>+ Add Person</button>
    </div>
  )
})

export default ScreenRows