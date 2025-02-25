
import './App.css';
import './styles/sidebar.css';
import './styles/borders.css';
import './styles/colors.css';
import './styles/fonts.css';
import './styles/margins_paddings.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from 'react';
import { useAuth } from "./context/authentication_context";
import BasicTopNav from "./app/basic/components/basic_top_nav/basic_top_nav";
import SignedinTopNav from './app/signedin/components/signedin_top_nav/signedin_top_nav';
import LoadingSpinner from './Component/SharedComponent/Loader';
import LowStockPage from './pages/LowStockPage';

// Lazy-loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const About = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BasicUserSignupScreen = lazy(() => import("./app/basic/screens/basic_user_signup_screen/basic_user_signup_screen"));
const BasicUserLoginScreen = lazy(() => import("./app/basic/screens/basic_user_login_screen/basic_user_login_screen"));
const WelcomeScreen = lazy(() => import('./app/signedin/screens/home_screen'));
const InvoicesScreen = lazy(() => import('./app/signedin/screens/invoices_screen'));
const InventoryScreen = lazy(() => import('./app/signedin/screens/inventory_screen'));
const VendorsScreen = lazy(() => import('./app/signedin/screens/vendors_screen'));
const ItemsScreen = lazy(() => import('./app/signedin/screens/items_screen'));
const UomsScreen = lazy(() => import('./app/signedin/screens/uom_screen'));
const ConsuptionDaysPage = lazy(() => import('./pages/ConsuptionDaysPage'));
const RecipePage = lazy(() => import('./pages/RecipePage'));
const RecipeCategoryPage = lazy(() => import('./pages/RecipeCategoryPage'));
const DailyConsumptionPage = lazy(() => import('./pages/ConsumptionPage'));
const RecipeIngridentsPage = lazy(() => import('./pages/RecipeIngridentsPage'));
const UserScreen = lazy(() => import('./app/signedin/screens/user_screen'));
const TranscationPage= lazy(() => import('./pages/TranscationPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const NotFoundPage = lazy(() => import('./pages/NotfoundPage'));
const UserStatusPage = lazy(() => import('./pages/UserStatusPage'));

function App() {
    const [auth] = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [isOperator, setOperator] = useState(false);
    const [isOwner, setOwner] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const checkLoggedIn = () => {
            setIsLoggedIn(auth.user !== null);

            if (auth.user && auth.user.roles) {
                const admin = auth.user.roles.includes("admin");
                setAdmin(admin);

                const operator = auth.user.roles.includes("operator");
                setOperator(operator);

                const owner = auth.user.roles.includes("owner");
                setOwner(owner);
            } else {
                setAdmin(false);
                setOperator(false);
                setOwner(false);
            }
        };
        checkLoggedIn();
    }, [auth]);

    const handleLogin = (loginData) => {
        setUserDetails(loginData.user);
        setIsLoggedIn(true);

        if (loginData.user && loginData.user.roles) {
            const admin = loginData.user.roles.includes("admin");
            setAdmin(admin);

            const operator = loginData.user.roles.includes("operator");
            setOperator(operator);

            const owner = loginData.user.roles.includes("owner");
            setOwner(owner);
        } else {
            setAdmin(false);
            setOperator(false);
            setOwner(false);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAdmin(false);
        setOperator(false);
        setOwner(false);
        setUserDetails({});
    };

    return (
        <> 
            <BrowserRouter>
                {isLoggedIn ? (
                    <SignedinTopNav loggedout={handleLogout} isAdmin={isAdmin}
                        isOperator={isOperator} isOwner={isOwner} isLoggedIn={isLoggedIn} />
                ) : (
                    <BasicTopNav />
                )}
                <Suspense fallback={<LoadingSpinner/>}>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <WelcomeScreen currentUser={auth.user} isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <HomePage />} />
                        <Route path="/login" element={<BasicUserLoginScreen loggedin={handleLogin} />} />
                        <Route path="/signup" element={<BasicUserSignupScreen />} />
                        <Route path="/forgot-password" element={<ForgetPassword />} />
                        <Route path="/about-us" element={<About />} />
                        <Route path="/contact-us" element={<ContactPage />} />
                        <Route path="/profile" element={isLoggedIn ? <ProfilePage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/users" element={isAdmin || isOperator || isOwner ? <UserScreen isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/invoices" element={isAdmin || isOperator ? <InvoicesScreen isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/inventory" element={isAdmin || isOperator || isOwner ? <InventoryScreen isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/vendors" element={isAdmin || isOperator ? <VendorsScreen isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/items" element={isAdmin || isOperator ? <ItemsScreen isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/uoms" element={isAdmin || isOperator ? <UomsScreen isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/ingridents" element={isAdmin || isOperator || isOwner ? <RecipeIngridentsPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/Consuption_days" element={isAdmin || isOperator || isOwner ? <ConsuptionDaysPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/DailyConsumptionPage" element={isAdmin || isOperator || isOwner ? <DailyConsumptionPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/category" element={isAdmin || isOperator || isOwner ? <RecipeCategoryPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/recipe" element={isAdmin || isOperator || isOwner ? <RecipePage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/store" element={isAdmin || isOperator || isOwner ? <StorePage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/transcation" element={isAdmin || isOperator || isOwner ? <TranscationPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/User-status" element={isAdmin || isOperator || isOwner ? <UserStatusPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="/low-stock" element={isAdmin || isOperator || isOwner ? <LowStockPage isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner} /> : <NotFoundPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
            <ToastContainer autoClose={2500} />
        </>
    );
}

export default App;
