import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { User, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function UserSignup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    contact: "",
    avatar: ""
  });
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.contact && !/^\d+$/.test(formData.contact)) {
      toast({
        title: "Invalid Contact",
        description: "Contact number should contain only digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          address: formData.address,
          contact: formData.contact,
          avatar: formData.avatar
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. Welcome to our shop!",
        });
        navigate("/shop");
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "Failed to create account",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-white px-8 py-6 border-b border-gray-200 text-center">
          <div className="mx-auto bg-[#E76F51] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#264653]">Create Account</CardTitle>
        </CardHeader>
        <CardContent className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <Label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</Label>
                <div className="flex items-center mt-1 gap-4">
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('avatar').click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Button>
                  {formData.avatar && (
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300">
                      <img 
                        src={formData.avatar} 
                        alt="Avatar preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#E76F51] hover:bg-[#D75F41] text-white py-2 rounded-md shadow-md transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#E76F51] hover:underline">
              Login
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-[#264653] text-sm"
            >
              <ArrowLeft className="mr-1 h-4 w-4 inline-block" />
              Back to Home
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
