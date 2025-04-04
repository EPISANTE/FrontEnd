import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MedecinList from "../../components/MedecinList/MedecinList";
import api from "../../axios";

const Home = () => {
    const [medecins, setMedecins] = useState([]);
    const [selectedSpecialite, setSelectedSpecialite] = useState("");

    const handleSearch = async (specialite) => {
        setSelectedSpecialite(specialite);

        if (!specialite) {
            setMedecins([]);
            return;
        }

        try {
            const response = await api.get(`/api/medecins/specialite/${encodeURIComponent(specialite)}`);
            setMedecins(response.data);
        } catch (error) {
            console.error("Erreur :", error.response?.data || error.message);
            alert("Erreur de chargement : " + (error.response?.data?.message || "Service indisponible"));
        }
    };

    useEffect(() => {
        const handleUpdate = () => handleSearch(selectedSpecialite);
        window.addEventListener('reservation-update', handleUpdate);
        return () => window.removeEventListener('reservation-update', handleUpdate);
    }, [selectedSpecialite]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rechercher un médecin</h1>
            <SearchBar onSearch={handleSearch} />
            <MedecinList medecins={medecins} />
        </div>
    );
};

export default Home;