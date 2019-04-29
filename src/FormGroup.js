import React from 'react'

const FormGroup = React.memo(function FormGroup({ val, change, id, name, label, type = 'text' }) {
  return (
    <div className="col form-group">
      <label htmlFor={name + id}>{label}</label>
      <input
        className="form-control"
        id={name + id}
        name={name + id}
        onChange={change}
        placeholder={label}
        type={type}
        value={val} />
    </div>
  )
})

export default FormGroup