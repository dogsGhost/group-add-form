import React from 'react'

function ScreenRows(props) {

  return (
    <div>
      <div>
        person count
        {props.select}
        <button className="btn btn-info" onClick={props.toggleView}>Paste from spreadsheet</button>
      </div>
      <div>{props.children}</div>
      <button className="btn btn-secondary" onClick={props.addPerson}>+ Add Person</button>
    </div>
  )
}

export default ScreenRows