import React, { Component } from "react";
import CategoryList from "./CategoryList";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import NewsContainer from "./NewsContainer";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Navi from "./Navi";
import axios from "axios";
import alertify from "alertifyjs";


export default class Dashboard extends Component {

  state = {
    CategoryList: [
      "My Profile",
      "Latest News",
      "US",
      "WORLD",
      "BUSINESS",
      "SPORTS",
      "FRIEND'S NEWS"
    ],
    news: "",
    displayNews: [],
    searchValue: "",
    allUrl: "",
    liked: [],
    favorite_id: "",
    sources: {
      nyt: false,
      cnn: false,
      wsj: false,
      abc: false,
      fox: false,
      cbs: false,
      twp: false
    }
  };


  getSourceCheck = e => {
    console.log(e.target.value)
    this.setState(
      { sources: { [e.target.name]: e.target.checked } },
      this.filterNews
    );
  };

  slugify = str => {

    str = str.replace(/^\s+|\s+$/g, "");

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    // Remove invalid chars
    str = str
      .replace(/[^a-z0-9 -]/g, " ")
      // Collapse whitespace and replace by -
      .replace(/\s+/g, "-")
      // Collapse dashes
      .replace(/-+/g, "-");

    return str;
  };

  getLastCha = word => {
    if (word.slice(-1) === "-") {
      return word.slice(0, -1);
    } else {
      return word;
    }
  };

  likeToNews = (e, info) => {
        let likes = this.state.liked.map(like => like.title)
            const { loggedInUserId } = this.props;
                let new_url = this.slugify(info.url);
                    let last_url = this.getLastCha(new_url);
                    const { token } = this.props;




    if(likes.includes(info.title)){
      console.log("true")
      fetch(`http://localhost:3000/favorites/${last_url}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: token
        }
      }).then(
        this.setState({
          liked: this.state.liked.filter(like => like.title !== info.title)
        })
      );
      
    }
    else{
      
      axios({
        method: 'post',
        url: 'http://localhost:3000/favorites',
        data: {
          title: info.title,
          description: info.description,
          img_url: info.urlToImage,
          news_url: info.url,
          date: info.publishedAt,
          user_id: loggedInUserId,
          istrue: true
        }
      }).then(this.setState({
        liked : [...this.state.liked, info]
      }),
      alertify.success("You Liked " + info.title)
      );
      
      
    // const { loggedInUserId } = this.props;
    // let new_url = this.slugify(info.url);
    // let last_url = this.getLastCha(new_url);

    // let title = info.title;
    // let likes = this.state.liked.map(like => like.title)

    // if (likes.includes(title)) {
    //   const { token } = this.props;

    //   fetch(`http://localhost:3000/favorites/${last_url}`, {
    //     method: "delete",
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: token
    //     }
    //   }).then(
    //     this.setState({
    //       liked: this.state.liked.filter(like => like.title !== title)
    //     })
    //   );
    // } else if (!likes.includes(title)) {
    //   fetch(`http://localhost:3000/favorites`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       title: info.title,
    //       description: info.description,
    //       img_url: info.urlToImage,
    //       news_url: info.url,
    //       date: info.publishedAt,
    //       user_id: loggedInUserId,
    //       istrue: true
    //     })
    //   })
    //     .then(resp => resp.json())
    //     .then(
    //       this.setState({
    //         liked: [...this.state.liked, title]
    //       })
    //     );
    // }
  };
}

  letsfetch = () => {
    if (this.state.allUrl !== "") {
      fetch(
        `https://newsapi.org/v2/top-headlines?sources=${this.state.allUrl}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      )
        .then(resp => resp.json())
        .then(data =>
          this.setState({
            displayNews: data.articles
          })
        );
    }
  };

  filterNews = () => {
    // NY TIMES
    
    if (this.state.sources.nyt === true && !this.state.allUrl.includes("the-new-york-times"))
    {
      console.log("nyc hit")
      this.setState({ allUrl: this.state.allUrl + "the-new-york-times," }, this.letsfetch);
      
    } else if (
      this.state.sources.nyt === false &&
      this.state.allUrl.includes("the-new-york-times")
    ) {

      this.setState(
        { allUrl: this.state.allUrl.replace("the-new-york-times,", "") },
        this.letsfetch
      );
    }

    //CNN
    if (this.state.sources.cnn === true && !this.state.allUrl.includes("cnn")) {
      this.setState({ allUrl: this.state.allUrl + "cnn," }, this.letsfetch);
      console.log("cnn hit")
    } else if (
      this.state.sources.cnn === false &&
      this.state.allUrl.includes("cnn")
    ) {
      this.setState(
        { allUrl: this.state.allUrl.replace("cnn,", "") },
        this.letsfetch
      );
    }

    //NYT

    // if(this.state.sources.nyt === true && !this.state.allUrl.includes("the-new-york-times")){this.setState({ allUrl: this.state.allUrl + "the-new-york-times," }, this.letsfetch);} else if (
    //   this.state.sources.nyt === false &&
    //   this.state.allUrl.includes("the-new-york-times,")
    // ) {

    //   this.setState(
    //     { allUrl: this.state.allUrl.replace("the-new-york-times,", "") },
    //     this.letsfetch
    //   );
    // }

    

    //WALL STREET
    if (
      this.state.sources.wsj === true &&
      !this.state.allUrl.includes("the-wall-street-journal")
    ) {
      this.setState(
        { allUrl: this.state.allUrl + "the-wall-street-journal," },
        this.letsfetch
      );
    } else if (
      this.state.sources.wsj === false &&
      this.state.allUrl.includes("the-wall-street-journal")
    ) {
      this.setState(
        { allUrl: this.state.allUrl.replace("the-wall-street-journal,", "") },
        this.letsfetch
      );
    }

    ///ABC NEWS
    if (
      this.state.sources.abc === true &&
      !this.state.allUrl.includes("abc-news")
    ) {
      this.setState(
        { allUrl: this.state.allUrl + "abc-news," },
        this.letsfetch
      );
    } else if (
      this.state.sources.abc === false &&
      this.state.allUrl.includes("abc-news")
    ) {
      this.setState(
        { allUrl: this.state.allUrl.replace("abc-news,", "") },
        this.letsfetch
      );
    }

    //FOX NEWS
    if (
      this.state.sources.fox === true &&
      !this.state.allUrl.includes("fox-news")
    ) {
      this.setState(
        { allUrl: this.state.allUrl + "fox-news," },
        this.letsfetch
      );
    } else if (
      this.state.sources.fox === false &&
      this.state.allUrl.includes("fox-news")
    ) {
      this.setState(
        { allUrl: this.state.allUrl.replace("fox-news,", "") },
        this.letsfetch
      );
    }

    //CBS NEWS
    if (
      this.state.sources.cbs === true &&
      !this.state.allUrl.includes("cbs-news")
    ) {
      this.setState(
        { allUrl: this.state.allUrl + "cbs-news," },
        this.letsfetch
      );
    } else if (
      this.state.sources.cbs === false &&
      this.state.allUrl.includes("cbs-news")
    ) {
      this.setState(
        { allUrl: this.state.allUrl.replace("cbs-news,", "") },
        this.letsfetch
      );
    }

    //WASHINGTON POST
    if (
      this.state.sources.twp === true &&
      !this.state.allUrl.includes("the-washington-post")
    ) {
      this.setState(
        { allUrl: this.state.allUrl + "the-washington-post," },
        this.letsfetch
      );
    } else if (
      this.state.sources.twp === false &&
      this.state.allUrl.includes("the-washington-post")
    ) {
      this.setState(
        { allUrl: this.state.allUrl.replace("the-washington-post,", "") },
        this.letsfetch
      );
    }
  };

  allFav = () => {
    
    const { token } = this.props;

    const { loggedInUserId } = this.props;
    

    if (loggedInUserId) {
      fetch(`http://localhost:3000/users/${loggedInUserId}`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(user =>
          this.setState({
            liked: user.favorites
          })
        );
    }
  };
  // componentWillMount() {
  //   this.allFav();
  // }

  componentDidMount() {
    if (this.state.searchValue === "" && this.state.allUrl === "") {
      this.allFav()
      this.fetchNewsApi();
    }
  }

  fetchNewsApi = () => {
    

    let url = `https://newsapi.org/v2/top-headlines?sources=the-new-york-times,cnn,the-wall-street-journal,abc-news,fox-news,cbs-news,the-washington-post,&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
    fetch(url)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          displayNews: data.articles
        })
      );
  };


  //Category Fetchs
  submitLatestNews = (e) => {
    console.log("latest news")
  }

  submitScienceNews = (e) => {
    
    
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
      fetch(url)
        .then(resp => resp.json())
        .then(data =>
          this.setState({
            displayNews: data.articles
          })
        );
    };
  

  submitBusinessNews = (e) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
      fetch(url)
        .then(resp => resp.json())
        .then(data =>
          this.setState({
            displayNews: data.articles
          })
        );
  }

  submitSportNews = (e) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
    fetch(url)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          displayNews: data.articles
        })
      );  }

      submitTechNews = (e) => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
        fetch(url)
          .then(resp => resp.json())
          .then(data =>
            this.setState({
              displayNews: data.articles
            })
          );  }

          submitHealthNews = (e) => {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
            fetch(url)
              .then(resp => resp.json())
              .then(data =>
                this.setState({
                  displayNews: data.articles
                })
              );  }

              submitEntertainment = (e) => {
                let url = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=100`;
                fetch(url)
                  .then(resp => resp.json())
                  .then(data =>
                    this.setState({
                      displayNews: data.articles
                    })
                  );  }

  submitSearch = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${this.state.searchValue}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    )
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          displayNews: data.articles
        })
      );
      
  };


  stateMapping = () => {
    return this.state.CategoryList.map(category => {
      return (
        <ListGroup>
          <ListGroupItem>{category}</ListGroupItem>
        </ListGroup>
      );
    });
  };

  handleValue = e => {
    this.setState({
      searchValue: e
    });
  };

  

  render() {

    return (
      <div>
        <Row>
         
          <Col xs="2" >
            
            <CategoryList category={this.stateMapping()} fetchNewsApi = {this.fetchNewsApi} submitScienceNews= {this.submitScienceNews} submitBusinessNews={this.submitBusinessNews} submitSportNews={this.submitSportNews}
            submitTechNews = {this.submitTechNews}  submitHealthNews = {this.submitHealthNews} submitEntertainment = {this.submitEntertainment}/>
          </Col>
          <Col xs="9" >
       
            <SearchBar
              handleValue={this.handleValue}
              submitSearch={this.submitSearch}/>   
                 <Row>
    <Col xs="2"></Col>
    <Col><FilterBar
              checkSources={this.state.sources}
              getSourceCheck={this.getSourceCheck}
            /></Col>
    
  </Row>         
            <NewsContainer
              displayNews={this.state.displayNews}
              likeToNews={this.likeToNews}
              favs={this.state.liked}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
