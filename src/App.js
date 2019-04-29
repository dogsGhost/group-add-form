import React from 'react';
import PersonRow from './PersonRow'
import ScreenPaste from './ScreenPaste'
import ScreenRows from './ScreenRows'
import Select from './Select'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.optionsCount = 50
    this.textarea = React.createRef()
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

    this.addPeople = this.addPeople.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.changeRowCount = this.changeRowCount.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.toggleView = this.toggleView.bind(this)
  }

  addPeople() {
    const val = this.textarea.current.value
    const split = val.indexOf('	') > -1 ? '	' : val.indexOf(',') > -1 ? ',' : ' '
    let entries = val.split('\n').map(p => p.split(split))
    // remove arrays of all empty values
    entries = entries.filter(entry => entry[0] || entry[1] || entry[2])
    entries = entries.map(entry => this.makeEntry(entry[0], entry[1], entry[2]))
    entries = entries.length ? entries : [this.makeEntry()]

    this.setState({
      rowData: entries,
      showRows: true
    })
  }

  addPerson() {
    this.setState({
      rowData: [...this.state.rowData, this.makeEntry()]
    })
  }

  changeRowCount(e) {
    const val = e.target.value
    const len = this.state.rowData.length

    if (val < len) {
      const count = len - val
      const msg = `Warning! This will remove the last ${count} row${count > 1 ? 's' : ''}!`
      if (window.confirm(msg)) {
        this.setState({
          rowData: this.state.rowData.filter((row, i) => i < val)
        })
      }
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

  removeRow(e) {
    this.setState({
      rowData: this.state.rowData.filter(row => row.id !== e.target.dataset.id)
    })
  }

  toggleView() {
    this.setState({
      showRows: !this.state.showRows
    })
  }

  render() {
    return (
      <div className="container-fluid p-4">
        {
          this.state.showRows ?
            <ScreenRows
              select={<Select change={this.changeRowCount} count={this.optionsCount} active={this.state.rowData.length} />}
              addPerson={this.addPerson}
              toggleView={this.toggleView}>
              {this.state.rowData.map((row, i) => <PersonRow
                change={this.onInputChange}
                count={i}
                key={row.id}
                person={row}
                remove={this.removeRow} />)}
            </ScreenRows> :
            <ScreenPaste textarea={this.textarea} toggle={this.toggleView} add={this.addPeople} />
        }
      </div>
    );
  }
}

export default App;
