import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthPage from './containers/Patient/AuthPage';
import Dashboard from './containers/Patient/Dashboard';
import MainContent from './components/Home/MainContent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PatientsPage from './containers/Patient/PatientsPage';
import QuizContainer from "./containers/Quiz/QuizContainer.jsx";
import DiagnosticContainer from "./containers/Diagnostic/DiagnosticContainer.jsx"
import SearchBar from "src/components/SearchBar/SearchBar.jsx";
import MedecinList from "src/components/MedecinList/MedecinList.jsx";
import Calendrier from "src/components/Calendrier/Calendrier.jsx";
import Home from "src/containers/Home/Home.jsx";
import AkinatorContainer from "./containers/Akinator/AkinatorContainer.jsx";

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

                    <Route path= "/coco" element={<AkinatorContainer/>} />

                    <Route path="/" element={<MainContent />} />


                    <Route path="/main" element={<MainContent />} />


                    <Route path="/rendezvous" element={<Home />} />


                    <Route path="/search" element={<SearchBar />} />


                    <Route path="/medecins" element={<MedecinList />} />


                    <Route path="/calendrier/:medecinId" element={<Calendrier />} />

                    <Route path="/diagnostic" element={<DiagnosticContainer />} />


                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;