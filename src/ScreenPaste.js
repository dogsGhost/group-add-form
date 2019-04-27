import React from 'react'

function ScreenPaste(props) {

  return (
    <div className="row">
      <div className="col-md-6">
        <textarea ref={props.textarea} className="peopleTextarea" placeholder="Paste from spreadsheet here"></textarea>
        <button className="btn btn-primary" onClick={props.add}>Add People</button>
        <button className="btn btn-secondary" onClick={props.toggle}>Cancel</button>
      </div>
    </div>
  )
}

export default ScreenPaste