import logo from './logo.svg';
import './App.css';
//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import React, { Component } from 'react';
import Swal from 'sweetalert2';


// function App() {
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">li
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React application
//   //       </a>
//   //     </header>
//   //   </div>
//   // );

// }
class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: '',
      from: '',
      to: '',
      note: '',
      billable: '',
      time: '',
      edditing: false,
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.edditRecord = this.edditRecord.bind(this);
    this.confirmDeletion = this.confirmDeletion.bind(this);
    this.confirmEdditing = this.confirmEdditing.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
    this.totalTime = this.totalTime.bind(this);




  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  confirmDeletion(callback, index) {
    Swal({
      title: 'Are you sure?',
      text: 'Would you like to delete this document?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
      closeOnCancel: false
    },
      (deletionConfirmed) => {
        if (deletionConfirmed) {
          callback(index);
          Swal('Deleted!', 'Your document has been deleted.', 'success');
        } else {
          Swal('Cancelled!', 'Your document  was not deleted.', 'error');
        }
      });
  };
  confirmEdditing(callback, index, clearData) {
    Swal({
      title: 'Are you sure?',
      text: 'Would you like to eddit this document?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes!',
      closeOnConfirm: false,
      closeOnCancel: false
    },
      (edditingConfirmed) => {
        if (edditingConfirmed) {
          callback(index);
          this.setState({ edditing: false });
          clearData();
          Swal('Editted!', 'Your document has been Editted.', 'success');
        } else {
          this.setState({ edditing: false })
          Swal('Cancelled!', 'Your document  was not Editted.', 'error');
        }
      });
  };
  clearFormData() {
    this.setState({
      project: '',
      from: '',
      to: '',
      note: '',
      billable: '',
      time: ''
    });
  }
  deleteRecord(index) {
    let temp = this.state.data
    this.setState({
      data: temp.filter((newInfo, i) =>
        (i !== index)
      )
    });
  }
  edditRecord(index) {
    let temp = this.state.data
    this.setState({
      data: temp.map((oldInfo, pos) => {
        if (pos === index) {
          return this.state
        }
        return oldInfo
      })
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    const time = Math.abs((parseInt(this.state.to) - parseInt(this.state.from)));
    this.state.time = time;
    if (this.state.edditing) {
      this.confirmEdditing(this.edditRecord, this.state.index, this.clearFormData);
      return null;
    }
    this.state.data.push(this.state);
    this.setState({ data: this.state.data });
    this.clearFormData();
  }
  totalTime() {
    let sum = 0;
    this.state.data.forEach((info) => {
      sum += info.time;
    })
    return sum;
  }


  render() {
    return <div>
      <h1 style={{
        fontSize: "80px"
      }}>Post </h1>

      <br />
      {!this.state.edditing ?
        <form className="report" onSubmit={this.handleSubmit}>
          <div className="col-left">

            <label className="text">
              <span>Title</span>
              <input type="text" name="project" value={this.state.project} onChange={this.handleChange} id="project" />
            </label>

            <div className="pair">
              <span>posts via date created </span>
              <label className="pair-left">
                From
                <input type="time" value={this.state.from} onChange={this.handleChange} name="from" id="from" />
              </label>
              <label className="pair-right">
                To
                <input type="time" value={this.state.to} onChange={this.handleChange} name="to" id="to" />
              </label>
            </div>

          </div>
          <div className="col-right">
            <label>
              Content
              <textarea name="note" value={this.state.note} onChange={this.handleChange} id="note" cols="30" rows="10"></textarea>
            </label>
            <button type="submit" class="btn btn-primary" style={{ color: 'white' }}>Save</button>
          </div>
        </form> :
        <form className="report" onSubmit={this.handleSubmit}>
          <div className="col-left">

            <label className="text">
              <span>Title</span>
              <input type="text" name="project" value={this.state.project} onChange={this.handleChange} id="project" />
            </label>
            <div className="pair">
              <span>posts via date created </span>
              <label className="pair-left">
                From
                <input type="time" value={this.state.from} onChange={this.handleChange} name="from" id="from" />
              </label>
              <label className="pair-right">
                To
                <input type="time" value={this.state.to} onChange={this.handleChange} name="to" id="to" />
              </label>
            </div>

          </div>
          <div className="col-right">
            <label>
              Content
              <textarea name="note" value={this.state.note} onChange={this.handleChange} id="note" cols="30" rows="10"></textarea>
            </label>
            <button type="submit">Save</button>
          </div>
        </form>
      }

      {this.state.data[0] ?
        <table class="table table-striped table-class" id="table-id">


          <thead>
            <div class="form-group">
              <select class="form-control" name="state" id="maxRows">
                <option value="5000">Show ALL Rows</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="70">70</option>
                <option value="100">100</option>
              </select>

            </div>
            <tr>
              <th>Title</th>
              <th>From</th>
              <th>To</th>
              <th>Content</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colspan="7">Sum total time: {this.totalTime()}</td>
            </tr>
          </tfoot>
          <tbody>
            {this.state.data.map((info, index) =>
              <tr key={index}>
                <td>{info.project}</td>
                <td>{info.from}</td>
                <td>{info.to}</td>
                <td>{info.note}</td>
                <td><button onClick={() => {
                  this.setState({
                    edditing: true,
                    index
                  });
                  this.clearFormData();
                  Swal('please go back to form and edit')
                }
                }>Edit</button></td>
                <td
                  style={{ color: 'black' }}>
                  <button onClick={() => { this.confirmDeletion(this.deleteRecord, index) }
                  }>Delete</button>
                </td>
              </tr>
            )
            }
          </tbody>
        </table> : ""}



      <div class='pagination-container' >
        <nav>
          <ul class="pagination">

            <li data-page="prev" >
              <span> Prev <span class="sr-only">(current)</span></span>
            </li>

            <li data-page="next" id="prev">
              <span> Next <span class="sr-only">(current)</span></span>
            </li>
          </ul>
        </nav>
      </div>
    </div>;
  }

}

export default Application;
//React.render(<Application />, document.getElementById('app'));
