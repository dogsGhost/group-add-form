import React from 'react'
import FormGroup from './FormGroup'

const PersonRow = React.memo(function PersonRow({ person, count, remove, change }) {
  const classes = `pt-1 person-row form-row ${(count + 1) % 2 ? 'odd' : 'even'}`
  return (
    <div className={classes}>
      <FormGroup
        change={change}
        id={person.id}
        label='First Name'
        name='fname'
        val={person.fname} />
      <FormGroup
        change={change}
        id={person.id}
        label='First Name'
        name='lname'
        val={person.lname} />
      <FormGroup
        change={change}
        id={person.id}
        label='Email'
        name='email'
        type='email'
        val={person.email} />
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