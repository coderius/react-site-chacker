import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, HashRouter, Router, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Home from './components/pages/Home';
import PageLinkAnalyzer from './components/pages/PageLinkAnalyzer';
import WebsiteLinkAnalyzer from './components/pages/WebsiteLinkAnalyzer';


function App() {
  return (
    <div className="App">
      <Container>
        <Header />

        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Check url</Breadcrumb.Item>
        </Breadcrumb>


        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/page-link-analyzer" element={<PageLinkAnalyzer></PageLinkAnalyzer>} />
          <Route path="/website-link-analyzer" element={<WebsiteLinkAnalyzer></WebsiteLinkAnalyzer>} />
        </Routes>

        <Footer />
      </Container>
    </div>
  );
}

export default App;
