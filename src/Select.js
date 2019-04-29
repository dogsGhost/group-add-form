import React from 'react'

const Select = React.memo(function Select(props) {
  function options() {
    let o = []
    for (let i = 1; i <= props.count; i++) {
      o.push(<option key={i} value={i}>{i}</option>)
    }
    return o
  }

  return (
    <select className="mr-2" value={props.active} onChange={props.change}>
      {options()}
    </select>
  )
})

export default Select