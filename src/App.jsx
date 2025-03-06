import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthPage from './containers/Patient/AuthPage';
import Dashboard from './containers/Patient/Dashboard';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage';
import QuizContainer from "./containers/Quiz/QuizContainer.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import MedecinList from "./components/MedecinList/MedecinList.jsx";
import Calendrier from "./components/Calendrier/Calendrier.jsx";
import Home from "./containers/Home/Home.jsx";
import MesRendezVous from "./components/MesRendezVous/MesRendezVous.jsx";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>

                    <Route path="/" element={<AuthPage />} />


                    <Route path="/dashboard"
                           element={
                               localStorage.getItem('userEmail')
                                   ? <Dashboard />
                                   : <Navigate to="/" replace />
                           }
                    />


                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/quiz" element={<QuizContainer />} />
                    <Route path="/main" element={<MainContent />} />
                    <Route path="/rendezvous" element={<Home />} />
                    <Route path="/search" element={<SearchBar />} />
                    <Route path="/medecins" element={<MedecinList />} />
                    <Route path="/calendrier/:medecinId" element={<Calendrier />} />


                    <Route path="/mes-rendezvous" element={<MesRendezVous />} />


                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
