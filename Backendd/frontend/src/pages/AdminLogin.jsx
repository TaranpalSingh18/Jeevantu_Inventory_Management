import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { UserCog, ArrowLeft } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useAppContext } from "../context/AppContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { login } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate credentials against hardcoded admin values.
      if (username === "admin" && password === "admin") {
        // Call the context's login function with admin info and a token.
        await login({ username, role: "admin" }, "dummy-admin-token");
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard!",
        });
        // Redirect to the dashboard page.
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F1DE] to-white p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-[#2A9D8F] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <UserCog className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#264653]">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#2A9D8F] hover:bg-[#1E7268]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-[#2A9D8F]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
