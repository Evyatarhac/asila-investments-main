import { useState, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';

const AuthenticatedApp = ({ splashDone, onVideoReady }) => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // While splash is showing OR auth is loading, show nothing (splash covers the screen)
  if (!splashDone || isLoadingPublicSettings || isLoadingAuth) {
    return null;
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home onVideoReady={onVideoReady} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const handleSplashDone = useCallback(() => setSplashDone(true), []);
  const handleVideoReady = useCallback(() => setVideoReady(true), []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        {/* Splash renders on top while app loads behind it */}
        {!splashDone && <SplashScreen onDone={handleSplashDone} videoReady={videoReady} />}

        <Router>
          <ScrollToTop />
          <AuthenticatedApp splashDone={splashDone} onVideoReady={handleVideoReady} />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App