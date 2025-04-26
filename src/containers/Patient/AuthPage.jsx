import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from 'src/api/Patient';
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [age, setAge] = useState("");
    const [taille, setTaille] = useState("");
    const [poids, setPoids] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [sexe, setSexe] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Added for button disabling

    const navigate = useNavigate(); // Hook for navigation

    const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400";


    const buttonClasses = "w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await login(email, password);
            localStorage.setItem('userEmail', email);

            navigate('/main');
        } catch (error) {
            setError("Email ou mot de passe incorrect.");
            setIsLoading(false);
        }

    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password.length < 6) { // Basic validation example
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }
        setError("");
        setIsLoading(true);
        const patient = { nom, prenom, age, taille, poids, adresse, email, telephone, sexe, mdp: password };

        try {
            await register(patient);

            setIsLogin(true);
            setError("Inscription réussie ! Vous pouvez maintenant vous connecter.");
            setPassword("");

            setNom(''); setPrenom(''); setAge(''); setTaille(''); setPoids(''); setAdresse(''); setTelephone(''); setSexe(''); setEmail('');
        } catch (error) {
            setError(`Erreur lors de l'inscription: ${error.response?.data?.message || error.message || 'Veuillez vérifier vos informations.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError("");
        setPassword("");
        setEmail(email);
    };

    return (


        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-12 sm:px-6 lg:px-8">


            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-8">


                {isLogin ? (
                    <form className="space-y-6" onSubmit={handleLogin} noValidate>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Connectez-vous
                        </h2>

                        {error && (
                            <p className={`p-3 rounded-md text-sm text-center ${error.includes('réussie') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {error}
                            </p>
                        )}

                        <div>
                            <label htmlFor="login-email" className="sr-only">Email</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={inputClasses}
                                placeholder="Adresse Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="login-password" className="sr-only">Mot de passe</label>
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={inputClasses}
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/*Remember me / Forgot password  comming soon*/}
                        {/* <div className="flex items-center justify-between text-sm">...</div> */}

                        <button type="submit" className={buttonClasses} disabled={isLoading}>
                            {isLoading ? 'Connexion...' : 'Me connecter'}
                        </button>

                        <p className="text-sm text-center text-gray-600">
                            Pas encore inscrit ?{' '}
                            <button type="button" onClick={toggleForm} className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">
                                Créer un compte
                            </button>
                        </p>
                    </form>
                ) : (

                    <form className="space-y-4" onSubmit={handleRegister} noValidate>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Créer un compte
                        </h2>

                        {error && (
                            <p className="p-3 rounded-md text-sm text-center bg-red-100 text-red-700">
                                {error}
                            </p>
                        )}


                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="nom" className="sr-only">Nom</label>
                                <input id="nom" name="nom" type="text" required className={inputClasses} placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="prenom" className="sr-only">Prénom</label>
                                <input id="prenom" name="prenom" type="text" required className={inputClasses} placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="age" className="sr-only">Âge</label>
                                <input id="age" name="age" type="number" required className={inputClasses} placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="sexe" className="sr-only">Sexe</label>
                                <select id="sexe" name="sexe" required className={inputClasses} value={sexe} onChange={(e) => setSexe(e.target.value)}>
                                    <option value="" disabled>Sexe</option>
                                    <option value="HOMME">Homme</option>
                                    <option value="FEMME">Femme</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="taille" className="sr-only">Taille (cm)</label>
                                <input id="taille" name="taille" type="number" step="0.1" required className={inputClasses} placeholder="Taille (cm)" value={taille} onChange={(e) => setTaille(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="poids" className="sr-only">Poids (kg)</label>
                                <input id="poids" name="poids" type="number" step="0.1" required className={inputClasses} placeholder="Poids (kg)" value={poids} onChange={(e) => setPoids(e.target.value)} />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="adresse" className="sr-only">Adresse</label>
                            <input id="adresse" name="adresse" type="text" required className={inputClasses} placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="register-email" className="sr-only">Email</label>
                            <input id="register-email" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="Adresse Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="telephone" className="sr-only">Téléphone</label>
                            <input id="telephone" name="telephone" type="tel" required className={inputClasses} placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="register-password" className="sr-only">Mot de passe</label>
                            <input id="register-password" name="password" type="password" required className={inputClasses} placeholder="Mot de passe (min. 6 caractères)" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className={buttonClasses} disabled={isLoading}>
                            {isLoading ? 'Inscription...' : "M'inscrire"}
                        </button>

                        <p className="text-sm text-center text-gray-600">
                            Déjà inscrit ?{' '}
                            <button type="button" onClick={toggleForm} className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">
                                Se connecter
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;