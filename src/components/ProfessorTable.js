import React from "react";
import Table from "react-bootstrap/Table";
import { MDBProgress } from "mdbreact";
import PropTypes from "prop-types";

class ProfessorTable extends React.Component {
  state = {
    rows: this.props.professorinfo,
    expandedRows: []
  };

  getColor = score => {
    return score >= 50 ? "success" : "danger";
  };

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id);
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.id}>
        <td>
          <b>{item.name}</b>
        </td>
        <td style={{ alignItems: "center" }}>
          <MDBProgress
            color={this.getColor(item.rating)}
            material
            value={item.rating}
          >
            {item.rating + "%"}
          </MDBProgress>
        </td>
        <td style={{ textAlign: "right" }}>{item.reviews}</td>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr>
          <td colspan="3">
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
                <b>Consensus: </b> {item.consensus}
              </div>
              <div
                style={{
                  width: "25%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1%",
                  justifyContent: "center"
                }}
              >
                <div>
                  Most Hated:<b>{item.worst}</b>
                </div>
                <div>
                  <MDBProgress
                    material
                    value={item.worstConfidence}
                    color="danger"
                  />
                </div>
              </div>
              <div
                style={{
                  width: "25%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1%",
                  justifyContent: "center"
                }}
              >
                <div>
                  Most Loved:<b>{item.best}</b>
                </div>
                <div>
                  <MDBProgress
                    material
                    value={item.bestConfidence}
                    color="success"
                  />
                </div>
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
          marginTop: "5%",
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
          <tbody>{allItemRows}</tbody>
        </Table>
      </div>
    );
  }
}

ProfessorTable.propTypes = {
  professorinfo: PropTypes.array.isRequired
};
export default ProfessorTable;
