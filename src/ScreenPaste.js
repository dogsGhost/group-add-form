import React from 'react'

function ScreenPaste(props) {

  return (
    <div>
      <div>
        <textarea></textarea>
      </div>
      <button className="btn btn-primary" onClick={props.addPerson}>Add People</button>
      <button className="btn btn-secondary" onClick={props.addPerson}>Cancel</button>
    </div>
  )
}

export default ScreenPaste