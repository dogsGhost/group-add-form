import React from 'react'

const PersonRow = React.memo(function PersonRow({ person, count, remove, change }) {
  const classes = `pt-1 person-row form-row ${(count + 1) % 2 ? 'odd' : 'even'}`
  return (
    <div className={classes}>
      <div className="col form-group">
        <label htmlFor={`fname${person.id}`}>First Name</label>
        <input onChange={change} value={person.fname} type="text" className="form-control" id={`fname${person.id}`} placeholder="First Name" />
      </div>
      <div className="col form-group">
        <label htmlFor={`lname${person.id}`}>Last Name</label>
        <input onChange={change} value={person.lname} type="text" className="form-control" id={`lname${person.id}`} placeholder="Last Name" />
      </div>
      <div className="col form-group">
        <label htmlFor={`email${person.id}`}>Email</label>
        <input onChange={change} value={person.email} type="email" className="form-control" id={`email${person.id}`} placeholder="Email" />
      </div>
      <div className="col">
      {
        count !== 0 ?
        <button data-id={person.id} className="close" onClick={remove}>X</button> :
        false
      }
      </div>
    </div>
  )
})

export default PersonRow