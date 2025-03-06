import React, { useEffect, useState } from "react";
import api from "../../axios";

const MesRendezVous = ({ patientId }) => {
    const [rendezVous, setRendezVous] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!patientId) return;

        const fetchRendezVous = async () => {
            try {
                const response = await api.get(`/api/rendezvous/patient/${patientId}`);
                setRendezVous(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des rendez-vous :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRendezVous();
    }, [patientId]);

    const handleAnnulerRdv = async (rdvId) => {
        try {
            await api.put(`/api/rendezvous/annuler/${rdvId}`);
            alert("Rendez-vous annulé avec succès !");
            setRendezVous((prev) => prev.filter((rdv) => rdv.id !== rdvId));
        } catch (error) {
            console.error("Erreur lors de l'annulation du rendez-vous :", error);
            alert("Erreur lors de l'annulation du rendez-vous.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4"> Mes rendez-vous</h2>
            {loading ? (
                <p>Chargement des rendez-vous...</p>
            ) : rendezVous.length === 0 ? (
                <p>Aucun rendez-vous trouvé.</p>
            ) : (
                <ul className="space-y-4">
                    {rendezVous.map((rdv) => (
                        <li key={rdv.id} className="p-4 border rounded-lg shadow-md bg-white flex justify-between">
                            <div>
                                <p><strong>Médecin :</strong> Dr. {rdv.medecin.nom}</p>
                                <p><strong>Date :</strong> {new Date(rdv.dateHeure).toLocaleString()}</p>
                                <p><strong>Statut :</strong> {rdv.statut}</p>
                            </div>
                            {rdv.statut === "CONFIRME" && (
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleAnnulerRdv(rdv.id)}
                                >
                                    Annuler
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MesRendezVous;
