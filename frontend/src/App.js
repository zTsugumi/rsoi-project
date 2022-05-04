import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './components/views/about/About';
import Home from './components/views/home/Home';
import Conv from './components/views/convolution/Conv';

function App() {
  return (
    <div className='relative pb-10 min-h-screen'>
      <Router>
        <Header />
        <div className='p-3'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/deconv' element={<Conv />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
