import { useLocation, Link } from "react-router-dom";
import { SEO } from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  // Only log in development, not production
  if (process.env.NODE_ENV === 'development') {
    console.warn("404: Route not found:", location.pathname);
  }

  return (
    <>
      <SEO 
        title="404 - Stránka nenalezena"
        description="Omlouváme se, požadovaná stránka nebyla nalezena."
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-2xl font-semibold">Stránka nenalezena</p>
          <p className="text-muted-foreground max-w-md">
            Omlouváme se, ale stránka kterou hledáte neexistuje nebo byla přesunuta.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
