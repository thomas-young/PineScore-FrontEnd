import React from "react";
import Table from "react-bootstrap/Table";
import MDBProgress from "mdbreact";
import PropTypes from "prop-types";
import FuzzySearch from "react-fuzzy";
import reviewData from '../data.json';

class ProfessorTable extends React.Component {
    state = {
        rows: [],
        expandedRows: [],
        fake_rows: this.props.professorinfo
    };

    getColor = score => {
        if (score >= 75) {
            return "success"
        } else if (score >= 50) {
            return "warning"
        }
        else return "danger"
    };

    addRow() {
        var rows = this.state.rows;
        var fake_rows = this.state.fake_rows;
        var name = this.refs.name.value;
        var data = reviewData;

        //query for your data
        //get request at that endpoint
        // var new_row = fake_rows.pop();
        var new_row = data[name]
        if (!new_row) {
            alert("Professor Not Found")
        }
        else if (rows.indexOf(new_row) == -1) {
            new_row.id_num = rows.length + 1;
            rows.push(new_row);
            this.setState({ fake_rows: fake_rows });
            this.setState({ rows: rows });
        }
    }

    // Add a row to the table by professor name
    addRowWithData(name) {
        var rows = this.state.rows;
        var fake_rows = this.state.fake_rows;
        var data = reviewData;
        var new_row = data[name]

        if (!new_row) {
            alert("Professor Not Found");
            console.log(name);
        }
        else if (rows.indexOf(new_row) == -1) {
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
                                <div>{item.controversy_n} people found this class controversial.</div>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }

        return itemRows;
    }

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
                }} >
                <h1>
                    <b>Professors</b>
                </h1>

                <Table striped bordered style={{ marginBottom: "35vh" }}>
                    <thead style={{ backgroundColor: "#dee2e6" }}>
                        <tr>
                            <th style={{ width: "15%", textAlign: "left", fontSize: "130%" }}>
                                Name
                            </th>
                            <th
                                style={{ width: "75%", textAlign: "center", fontSize: "130%" }} >
                                Pinescore
                            </th>
                            <th
                                style={{ width: "15%", textAlign: "right", fontSize: "130%" }} >
                                Ratings
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allItemRows}
                        <tr>
                            <td colSpan="3" style={{ align: "center", textAlign: "center" }}>
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                                    <div id="fuzzy-container" style={{ alignSelf: "center" }}>
                                        <FuzzySearch
                                            style={{
                                                padding: "0.44rem"
                                            }}
                                            list={Object.keys(reviewData).map(function (k) {
                                                var review = reviewData[k];
                                                review["key"] = k;
                                                return review;
                                            })}
                                            keys={["id"]}
                                            resultsTemplate={(_, state, styles, _clickHandler) => {
                                                return state.results.map((val, i) => {
                                                    const style = state.selectedIndex === i
                                                        ? styles.selectedResultStyle : styles.resultsStyle;
                                                    return (
                                                        <div
                                                            key={i}
                                                            style={style}
                                                            onClick={() => {
                                                                console.log(val);
                                                                this.addRowWithData(val.key);
                                                            }}>
                                                            {val.id}
                                                        </div>
                                                    );
                                                });
                                            }}
                                        />
                                    </div>
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
