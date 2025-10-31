import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate login (in real app, this would call an API)
    localStorage.setItem("isAuthenticated", "true");
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Welcome back</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[hsl(var(--input-bg))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[hsl(var(--input-bg))]"
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
