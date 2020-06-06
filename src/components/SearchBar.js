import React, { Component } from "react";
import SearchBari from "material-ui-search-bar";
import styled from "styled-components";

import { bindActionCreators } from "redux";
import * as newsActions from "../redux/actions/newsActions";
import { connect } from "react-redux";

const Div = styled.div`
  margin-top: 40px;
  margin-bottom: 25px;
  padding: 0;
  border: 3px solid #3f51b5;

  height: 50px;
  input {
    width: 400px;
    font-size: 20px;
    font-family: roboto;
    height: 40px;
    padding: 0px 10px;
  }

  button {
    height: 100%;
    width: 80px;
    background: #3f51b5;
  }

  @media (max-width: 768px) {
    margin-top: 50px;

    input {
      width: 200px;
      height: 30px;
      padding: 0px 5px;
    }

    button {
      height: 100%;
      width: 60px;
      background: #3f51b5;
    }
  }
`;

class SearchBar extends Component {
  state = {
    word: "",
  };

  searchSetState = (e) => {
    this.setState(
      {
        word: e.target.value,
      },
      this.searchSubmit
    );
  };

  searchSubmit = () => {
    this.props.actions.searchNews(this.state.word);
  };

  render() {
    return (
      <Div>
        <input
          onChange={(e) => this.searchSetState(e)}
          type="text"
          name="box"
          placeholder="Search"
          onChange={(e) => this.searchSetState(e)}
          onRequestSearch={(e) => this.searchSubmit(e)}
        ></input>
      </Div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.newsListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getNews: bindActionCreators(newsActions.getNews, dispatch),
      filterNews: bindActionCreators(newsActions.filterNews, dispatch),
      searchNews: bindActionCreators(newsActions.searchNews, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

// class SearchBar extends Component {
//   state = {
//     word: ""
//   };

//   searchSetState = e => {
//     this.setState(
//       {
//         word: e
//       },
//       this.searchSubmit
//     );
//   };

//   searchSubmit = () => {
//     this.props.actions.searchNews(this.state.word);
//   };

//   render() {
//     return (
//       <SearchBari
//         onChange={e => this.searchSetState(e)}
//         onRequestSearch={e => this.searchSubmit(e)}
//         value=""
//         style={{
//           margin: "0 auto",
//           marginTop: 30,
//           marginBottom: 30,
//           maxWidth: 800
//         }}
//       />
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     news: state.newsListReducer
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       getNews: bindActionCreators(newsActions.getNews, dispatch),
//       filterNews: bindActionCreators(newsActions.filterNews, dispatch),
//       searchNews: bindActionCreators(newsActions.searchNews, dispatch)
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
