import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Simulate registration (in real app, this would call an API)
    localStorage.setItem("isAuthenticated", "true");
    toast({
      title: "Success!",
      description: "Your account has been created",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Create your account</h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[hsl(var(--input-bg))]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[hsl(var(--input-bg))]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isStudent"
                checked={isStudent}
                onCheckedChange={(checked) => setIsStudent(checked as boolean)}
              />
              <Label htmlFor="isStudent" className="cursor-pointer font-normal">
                I am a student
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
