import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Offers from './pages/Offers'
import Locations from './pages/Locations'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/ueber" element={<About />} />
                            <Route path="/produkte" element={<Products />} />
                            <Route path="/angebote" element={<Offers />} />
                            <Route path="/standorte" element={<Locations />} />
                            <Route path="/kontakt" element={<Contact />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
