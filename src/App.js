import React from "react";
import Main from "./components/Main";
import StickyFooter from "react-sticky-footer";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
class App extends React.Component {
  state = {
    professors: [
      {
        id: 1,
        name: "Thomas Corman",
        rating: 92,
        worstConfidence: 75,
        numWorst: 52,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 82
      },
      {
        id: 2,
        name: "Charles Palmer",
        rating: 98,
        worstConfidence: 95,
        numWorst: 3,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 51
      },
      {
        id: 3,
        name: "Phil Hanlon",
        rating: 35,
        worstConfidence: 55,
        numWorst: 45,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 666
      },
      {
        id: 4,
        name: "Xia Zhou",
        rating: 84,
        worstConfidence: 76,
        numWorst: 23,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 76
      },
      {
        id: 5,
        name: "Andreas Bentz",
        rating: 45,
        worstConfidence: 96,
        numWorst: 56,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 43
      },
      {
        id: 6,
        name: "Robert Drysdale",
        rating: 51,
        worstConfidence: 55,
        numWorst: 32,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 102
      },
      {
        id: 7,
        name: "Tim Hemdrich",
        rating: 71,
        worstConfidence: 75,
        numWorst: 11,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 122
      },
      {
        id: 8,
        name: "Sal McSanders",
        rating: 61,
        worstConfidence: 95,
        numWorst: 22,
        consensus:
          " Lorem ipsum dolor sit amet, consecteturadipiscin gelit, sed do eiusmod tempor incididunt ut labore et dolorema gna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ulla mco laboris nisi ut aliquip ex ea commodo consequat.",
        reviews: 5
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <Navbar
          bg="light"
          variant="light"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Link style={{ textAlign: "center" }} to="/">
            <Navbar.Brand>PineScore</Navbar.Brand>{" "}
          </Link>
          <Link style={{ marginRight: "1%" }} to="/info">
            Info
          </Link>
        </Navbar>
        <Main professorinfo={this.state.professors} />
        <StickyFooter
          bottomThreshold={500}
          normalStyles={{
            backgroundColor: "#f6f6f6",
            padding: "1rem"
          }}
          stickyStyles={{
            backgroundColor: "#f6f6f6",
            padding: "1rem"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img src="pine.svg" alt="PineScore" height="30px" width="30px" />
            <br />
            PineScore <br /> 2019
          </div>
        </StickyFooter>
      </div>
    );
  }
}

export default App;
