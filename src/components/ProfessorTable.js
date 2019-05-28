import React from "react";
import Table from "react-bootstrap/Table";
import { MDBProgress, MDBBtn } from "mdbreact";
import PropTypes from "prop-types";

class ProfessorTable extends React.Component {
  state = {
    rows: [],
    expandedRows: [],
    fake_rows: this.props.professorinfo
  };

  getColor = score => {
    return score >= 50 ? "success" : "danger";
  };

  addRow() {
    var rows = this.state.rows;
    var fake_rows = this.state.fake_rows;
    var name = this.refs.name.value;
    var data = {"Vaughn Booker": {"id": "Vaughn Booker", "summary": "'2 papers outlining main topics in the class and discussion posts, participation', 'I like how the professor leaves writing assignments open ended because it gives students a chance to explore the topics in new ways', 'I really appreciated the comprehensive feedback on papers.', 'I really enjoyed the two essays we had to write for the course.", "pinescore": [67, 28], "controversy_score": 55, "controversy_n": 6}, "Anne Phillips": {"id": "Anne Phillips", "summary": "I took this course because of all the protests that have been happening the past couple years at Dartmouth and I wanted to learn more about it.', 'I learned to analyze and think critically about sources and ideas.', 'I think that it really reinforced a lot of what I had already learned in my other courses.', 'I want to incorporate AAAS into my major/minor.', 'It made me more interested in the subject .', 'It set fairly high standards', 'Provided a class that I covered topics I was truly interested in and had a personal connection too.', 'I most defininetly and interested in taking similar classes', 'It has challenged me to improve my reading, writing, and analytical skills.", "pinescore": [64, 16], "controversy_score": 52, "controversy_n": 1}}

    console.log(data[name])
    //query for your data
    //get request at that endpoint
    // var new_row = fake_rows.pop();
    var new_row = data[name]
    if (! new_row) {
      alert("Professor Not Found")

    }
    else {
    new_row.id_num = rows.length + 1;

    rows.push(new_row);
    this.setState({ fake_rows: fake_rows });
    this.setState({ rows: rows });
  }
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id_num => id_num !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id_num);
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.id_num}>
        <td>
          <b>{item.id}</b>
        </td>
        <td style={{ alignItems: "center" }}>
          <MDBProgress
            color={this.getColor(item.pinescore[0])}
            material
            value={item.pinescore[0]}
          >
            {item.pinescore[0] + "%"}
          </MDBProgress>
        </td>
        <td style={{ textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {item.pinescore[1]}{" "}
            <img src="chevron.svg" alt="Show More" height="30px" width="30px" />
          </div>
        </td>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id_num)) {
      itemRows.push(
        <tr>
          <td colSpan="3">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  width: "50%",
                  padding: "1%"
                }}
              >
                <b>Consensus: </b> {item.summary}
              </div>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1%",
                  justifyContent: "center"
                }}
              >
                <div>
                  <b>Controversy Score: {item.controversy_score + "%"}</b>
                </div>
                <div>
                  <MDBProgress
                    material
                    value={item.controversy_score}
                    color="danger"
                  />
                </div>
                <div>N={item.controversy_n}</div>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    return itemRows;
  }

  /*render() {
    return this.props.professorinfo.map(todo => (
      <Todoitem key={todo.id} todo={todo} />
    ));
  }
  */
  render() {
    let allItemRows = [];
    this.state.rows.forEach(item => {
      const perItemRows = this.renderItem(item);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <div
        style={{
          width: "70%",
          marginLeft: "15%",
          marginRight: "15%",
          marginTop: "2%",
          marginBottom: "10%"
        }}
      >
        <h1>
          <b>Professors</b>
        </h1>

        <Table striped bordered>
          <thead style={{ backgroundColor: "#dee2e6" }}>
            <tr>
              <th style={{ width: "15%", textAlign: "left", fontSize: "130%" }}>
                Name
              </th>
              <th
                style={{ width: "75%", textAlign: "center", fontSize: "130%" }}
              >
                Pinescore
              </th>
              <th
                style={{ width: "15%", textAlign: "right", fontSize: "130%" }}
              >
                Ratings
              </th>
            </tr>
          </thead>
          <tbody>
            {allItemRows}
            <tr>
              <td colSpan="3">
                <div style={{ textAlign: "center", alignItems: "center" }}>
                  <input
                    style={{ padding: "0.44rem " }}
                    type="text"
                    name="name"
                    ref="name"
                  />
                  <MDBBtn
                    color="primary"
                    id="addBtn"
                    onClick={this.addRow.bind(this)}
                  >
                    Add{" "}
                  </MDBBtn>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

ProfessorTable.propTypes = {
  professorinfo: PropTypes.array.isRequired
};
export default ProfessorTable;
