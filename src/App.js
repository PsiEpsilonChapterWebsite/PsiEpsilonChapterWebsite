import React, { useState, useEffect } from "react";
import AppHeader from "./AppHeader";
import MainPage from "./MainPage";
import AppPagesEnum from "./AppPagesEnum.ts";
import Gallery from "./Gallery";
import FamilyTree from "./family_tree";
import Footer from "./Footer";
import Tree from "./tree.js";
import Members from "./members.js";
import History from "./history.js";
import MobileAppHeader from "./MobileAppHeader";
import JoinUs from "./JoinUs";
import Events from "./Events";
import i18next from "./i18n";

// import "./App.css";

class App extends React.Component {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  state = {};

  constuctor() {
    this.setState({
      currentPage: AppPagesEnum.Home,
      isMobile: window.innerWidth <= 768,
      showModal: false,
    });

    this.setPage = this.setPage.bind(this);
  }

  setPage = (page) => {
    console.log(
      "setPage called with name " +
        AppPagesEnum[page] +
        " and type " +
        typeof page
    );
    console.log(String(page));
    var previousPage = this.state.currentPage;
    if (previousPage == AppPagesEnum.Home) {
    }
    this.setState({
      currentPage: page,
      previousPage: previousPage,
      showModal: false,
      isMobile: window.innerWidth <= 768,
    });
    console.log(`Current state is ${this.state.currentPage}`);
  };

  setLanguage = (language) => {
    console.log("setLanguage called with language " + language);
    i18next.changeLanguage(language);
    this.setState({
      currentPage: this.state.currentPage,
      previousPage: this.state.previousPage,
      showModal: this.state.showModal,
      isMobile: this.state.isMobile,
      language: language,
    });
  };

  componentDidMount() {
    this.setState({
      currentPage: this.state.page,
      previousPage: this.state.previousPage,
      showModal: false,
      isMobile: window.innerWidth <= 768,
    });
  }

  handleResize() {
    this.setState({
      currentPage: this.state.currentPage,
      previousPage: this.state.previousPage,
      isMobile: window.innerWidth <= 768,
    });
    console.log(`Current state is ${this.state.currentPage}`);
  }

  appHeader = (
    <AppHeader setPage={this.setPage} setLanguage={this.setLanguage} />
  );
  openModal = () => {
    console.log("openModal called");
  };
  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({
        isMobile: true,
      });
    }
  }

  render() {
    console.log("render called");
    console.log(this.state.currentPage);
    console.log("Is Mobile: ");
    console.log(this.state.isMobile);
    console.log(`Window width si ${window.innerWidth} px`);
    console.log(`Current state is ${this.state.currentPage}`);

    var isMobile = false;
    if (this.state.isMobile) {
      isMobile = true;
      console.log("isMobile is true");
      this.appHeader = (
        <MobileAppHeader
          setPage={this.setPage}
          openModal={this.openModal}
          setLanguage={this.setLanguage}
        />
      );
    }
    if (this.state.openModal) {
      console.log("openModal is true");
    }

    if (this.state.currentPage === AppPagesEnum.Home) {
      var ret = this.renderHomePage(isMobile);
    } else if (this.state.currentPage === AppPagesEnum.History) {
      ret = this.renderHistoryPage();
    } else if (this.state.currentPage === AppPagesEnum.Members) {
      ret = this.renderMembersPage();
    } else if (this.state.currentPage === AppPagesEnum.Gallery) {
      ret = this.renderGalleryPage();
    } else if (this.state.currentPage === AppPagesEnum.Silly) {
      ret = this.renderSillySection();
    } else if (this.state.currentPage === AppPagesEnum.JoinUs) {
      ret = this.renderJoinUsPage();
    } else if (this.state.currentPage === AppPagesEnum.Events) {
      ret = this.renderEventsPage();
    } else {
      ret = this.renderHomePage(isMobile);
    }
    return ret;
  }
  backdrop = (<div id="backdrop" className="backdrop"></div>);

  renderHomePage(isMobile) {
    console.log("renderHomePage called");
    console.log(`isMobile is ${isMobile}`);
    return (
      <div className="App">
        {this.appHeader}
        {this.backdrop}
        <MainPage isMobile={isMobile} />
        <Footer />
      </div>
    );
  }

  renderHistoryPage() {
    return (
      <div className="App">
        {this.backdrop}
        {this.appHeader}
        <History />
        <Footer />
      </div>
    );
  }

  renderMembersPage() {
    return (
      <div className="App">
        {this.backdrop}
        {this.appHeader}
        <Members />
        <Footer />
      </div>
    );
  }

  renderGalleryPage() {
    return (
      <div className="App">
        {this.backdrop}
        {this.appHeader}
        <Gallery />
        <Footer />
      </div>
    );
  }

  renderJoinUsPage() {
    return (
      <div className="App">
        {this.backdrop}
        {this.appHeader}
        <JoinUs />
        <Footer />
      </div>
    );
  }

  renderEventsPage() {
    return (
      <div className="App">
        {this.backdrop}
        {this.appHeader}
        <Events />
        <Footer />
      </div>
    );
  }

  renderSillySection() {
    return (
      <div className="App">
        {this.backdrop}
        {this.appHeader}
        <div className="ver-flex">
          <h1>🤡Under Construction🤡</h1>
          <h3> Come back later? </h3>
          <img src="https://i.pinimg.com/originals/d9/1f/97/d91f97ff683eb493ed92f2350cb64579.png" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
