import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthPage from './containers/Patient/AuthPage';
import Dashboard from './containers/Patient/Dashboard';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage';
import DiagnosticContainer from "./containers/Diagnostic/DiagnosticContainer.jsx";
import SearchBar from "src/components/SearchBar/SearchBar.jsx";
import Calendrier from "src/components/Calendrier/Calendrier.jsx";
import Home from "src/containers/Home/Home.jsx";
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="App flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>

                        <Route path="/" element={<AuthPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                localStorage.getItem('userEmail')
                                    ? <Dashboard />
                                    : <Navigate to="/" replace />
                            }
                        />
                        <Route path="/patients" element={<PatientsPage />} />

                        <Route path="/main" element={<MainContent />} />
                        <Route path="/rendezvous" element={<Home />} />
                        <Route path="/rendezvous/medecins" element={<Home />} />
                        <Route path="/search" element={<SearchBar />} />
                        <Route path="/diagnostic" element={<DiagnosticContainer />} />
                        <Route path="/calendrier/:medecinId" element={<Calendrier />} />


                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;