import React, { Component } from "react";

export class Info extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1 style={{ alignSelf: "center" }}>About PineScore</h1>
        <div>
          {" "}
          We use Watson Sentiment Analysis to process reviews aggregated for
          each professor on the Course Assesment Portal to determine how well
          each professor is generally liked by their students. Additionally, we
          use Waston Text Analysis to summerize reviews into a single consensus
          review. We also use this servicec to determine which topics were
          particularly polarizing for the professor, reporting both the most
          disliked and liked topics aggregated across all reviews.
        </div>
      </div>
    );
  }
}

export default Info;
