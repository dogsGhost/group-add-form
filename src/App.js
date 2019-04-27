import React from 'react';
import ScreenRows from './ScreenRows'
import ScreenPaste from './ScreenPaste'
import Select from './Select'
import PersonRow from './PersonRow'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.optionsCount = 50
    this.genId = function () {
      return Math.random().toString().substr(2, 15)
    }

    this.makeEntry = function (fname = '', lname = '', email = '') {
      return {
        fname,
        lname,
        email,
        id: this.genId()
      }
    }

    this.state = {
      rowData: [this.makeEntry()],
      showRows: true,
    }

    this.toggleView = this.toggleView.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.changeRowCount = this.changeRowCount.bind(this)
    this.removeRow = this.removeRow.bind(this)
  }

  changeRowCount(e) {
    const val = e.target.value
    const len = this.state.rowData.length

    if (val < len) {
      // TODO: alert user we need to remove rows!
      this.setState({
        rowData: this.state.rowData.filter((row, i) => i < val)
      })
    } else {
      let diff = val - len
      let newRows = []
      for (let i = 0; i < diff; i++) {
        newRows.push(this.makeEntry())
      }

      this.setState({
        rowData: [...this.state.rowData, ...newRows]
      })
    }
  }

  options() {
    let o = []
    for (let i = 1; i <= this.optionsCount; i++) {
      if (i === this.state.rowData.length) {
        o.push(<option key={i} defaultValue={i}>{i}</option>)
      } else {
        o.push(<option key={i} value={i}>{i}</option>)
      }
    }
    return o
  }

  toggleView() {
    this.setState({
      showRows: !this.state.showRows
    })
  }

  addPerson() {
    this.setState({
      rowData: [...this.state.rowData, this.makeEntry()]
    })
  }

  makeRows() {
    return this.state.rowData.map((row, i) => {
      return <PersonRow
        change={this.onInputChange}
        count={i}
        key={row.id}
        person={row}
        remove={this.removeRow} />
    })
  }

  removeRow(e) {
    this.setState({
      rowData: this.state.rowData.filter(row => row.id !== e.target.dataset.id)
    })
  }

  onInputChange({ target }) {
    const val = target.value
    const prop = target.id.match(/[a-z]+/g)[0]
    const id = target.id.match(/[0-9]+/g)[0]
    let filtered = this.state.rowData.filter(row => row.id !== id)
    let updatedIndex = -1
    let updated = this.state.rowData.filter((row, i) => {
      if (row.id === id) updatedIndex = i
      return row.id === id
    })
    updated = Object.assign({}, updated[0], { [prop]: val })
    filtered.splice(updatedIndex, 0, updated)

    this.setState({
      rowData: filtered
    })
  }

  render() {
    return (
      <div className="container-fluid">
        {
          this.state.showRows ?
            <ScreenRows
              select={<Select change={this.changeRowCount} count={this.optionsCount} active={this.state.rowData.length} />}
              addPerson={this.addPerson}
              toggleView={this.toggleView}>
              {this.makeRows()}
            </ScreenRows> :
            <ScreenPaste />
        }
      </div>
    );
  }
}

export default App;
