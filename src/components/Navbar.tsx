import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ isAuthenticated, onLogout }: NavbarProps) => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border bg-card">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <GraduationCap className="h-6 w-6" />
          EduTask
        </Link>
        
        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="text-sm font-medium text-[hsl(var(--nav-link))] transition-colors hover:text-foreground">
                Home
              </Link>
              <Link to="/register" className="text-sm font-medium text-[hsl(var(--nav-link))] transition-colors hover:text-foreground">
                About
              </Link>
              <Link to="/register" className="text-sm font-medium text-[hsl(var(--nav-link))] transition-colors hover:text-foreground">
                Contact
              </Link>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-[hsl(var(--nav-link))] transition-colors hover:text-foreground">
                Today
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-[hsl(var(--nav-link))] transition-colors hover:text-foreground">
                Upcoming
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-[hsl(var(--nav-link))] transition-colors hover:text-foreground">
                Completed
              </Link>
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
