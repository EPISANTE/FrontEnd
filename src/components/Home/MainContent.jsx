import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuCalendarDays, LuClipboardCheck } from "react-icons/lu";

const MainContent = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Tableau de bord',
            description: 'Consultez et gérez les dossiers patients',
            icon: <LuLayoutDashboard className="text-5xl text-blue-600 mb-4" />,
            navigateTo: '/dashboard',
            borderColor: 'hover:border-blue-400',
        },
        {
            title: 'Rendez-Vous',
            description: 'Prendre un nouveau rendez-vous',
            icon: <LuCalendarDays className="text-5xl text-teal-600 mb-4" />,
            navigateTo: '/rendezvous',
            borderColor: 'hover:border-teal-400',
        },
        {
            title: 'Diagnostic',
            description: 'Effectuer une évaluation médicale',
            icon: <LuClipboardCheck className="text-5xl text-indigo-600 mb-4" />,
            navigateTo: '/diagnostic',
            borderColor: 'hover:border-indigo-400',
        },
    ];

    return (
        <main className="flex-grow p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <header className="text-center mb-12 md:mb-16">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Bienvenue sur EpiSante
                </h1>
                <p className="text-lg text-gray-600">
                    Gérez vos données de santé efficacement.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {cards.map(({ title, description, icon, navigateTo, borderColor }, index) => (
                    <div
                        key={index}
                        role="button"
                        aria-label={`Naviguer vers ${title}`}
                        onClick={() => navigate(navigateTo)}
                        className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5 border border-transparent ${borderColor} flex flex-col items-center text-center`}
                    >
                        {icon}
                        <h2 className="text-xl font-semibold text-gray-700 mb-1">{title}</h2>
                        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default MainContent;
