import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import headerLogo from "../../../assets/LULA-HeaderLogo.png";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'https://api.lula-asbl.org';
const AUTH_LOGIN_URL = `${BACKEND_BASE_URL.replace(/\/$/, '')}/api/auth/login`;

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoggingIn(true);

    try {
      const response = await fetch(AUTH_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password,
        }).toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Unable to sign in.');
      }

      const tokenData = await response.json() as { access_token: string; token_type: string };
      window.localStorage.setItem('lula-admin-token', tokenData.access_token);
      toast.success('Signed in successfully.');
      navigate('/admin');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <img
        src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-green-900/70" />
      <Link to="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" className="text-white border border-white/50 hover:bg-green-600 hover:border-green-600 hover:text-white gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go to Homepage
        </Button>
      </Link>
      <Card className="relative z-10 w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={headerLogo}
              alt="LULA Let Us Live Association"
              className="h-20 w-auto max-w-[240px] object-contain"
            />
          </div>
          <CardTitle className="text-2xl">LULA Admin Portal</CardTitle>
          <CardDescription>Sign in to manage your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@lulacongo.org"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={isLoggingIn}>
              {isLoggingIn ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
