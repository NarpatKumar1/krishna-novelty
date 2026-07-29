import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Admin from './pages/Admin';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Testimonials />
        <Contact />
        <Admin />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
