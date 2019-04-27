import React from 'react';
import ScreenRows from './ScreenRows'
import ScreenPaste from './ScreenPaste'
import Select from './Select'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.optionsCount = 50
    this.genId = function () {
      return Math.random().toString().substr(2, 15)
    }

    this.makeEntry = function (first = '', last = '', email = '') {
      return {
        first,
        last,
        email,
        id: this.genId()
      }
    }

    this.state = {
      rowData: [this.makeEntry()],
      showRows: true,
    }

    this.toggleView = this.toggleView.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.changeRowCount = this.changeRowCount.bind(this)
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

  render() {
    return (
      <div className="container-fluid">
        {
          this.state.showRows ?
            <ScreenRows
              select={<Select change={this.changeRowCount} count={this.optionsCount} active={this.state.rowData.length} />}
              addPerson={this.addPerson}
              toggleView={this.toggleView}>

            </ScreenRows> :
            <ScreenPaste />
        }
      </div>
    );
  }
}

export default App;
