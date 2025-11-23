import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Heart, Mail, Lock, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type LoginPageProps = {
  onLogin: (type: 'ngo' | 'user') => void;
  onNavigate: (page: 'home') => void;
};

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (type: 'ngo' | 'user') => {
    if (isRegister && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onLogin(type);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Image */}
      <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=1000&fit=crop"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-white text-center max-w-md">
          <Heart className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl mb-4">Connecting NGOs with Changemakers</h1>
          <p className="text-xl opacity-90">Join our platform to make a real difference in communities worldwide</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-4">
              ← Back to Home
            </Button>
            <h2 className="text-3xl mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to continue your journey</p>
          </div>

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user">User Login</TabsTrigger>
              <TabsTrigger value="ngo">NGO Login</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <Card>
                <CardHeader>
                  <CardTitle>{isRegister ? 'Create Account' : 'User Login'}</CardTitle>
                  <CardDescription>
                    {isRegister ? 'Register as a donor or volunteer' : 'Sign in to donate or volunteer'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="user-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="user-name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="user-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="user-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="user-confirm">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="user-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                  {!isRegister && (
                    <div className="text-right">
                      <button className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                  )}
                  <Button onClick={() => handleSubmit('user')} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isRegister ? 'Create Account' : 'Sign In'}
                  </Button>
                  <p className="text-center text-sm text-slate-600">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      onClick={() => setIsRegister(!isRegister)}
                      className="text-blue-600 hover:underline"
                    >
                      {isRegister ? 'Sign In' : 'Register'}
                    </button>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ngo">
              <Card>
                <CardHeader>
                  <CardTitle>{isRegister ? 'Register NGO' : 'NGO Login'}</CardTitle>
                  <CardDescription>
                    {isRegister ? 'Register your organization' : 'Sign in to manage campaigns'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="ngo-name">Organization Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="ngo-name"
                          placeholder="Your NGO Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="ngo-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="ngo-email"
                        type="email"
                        placeholder="contact@ngo.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ngo-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="ngo-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="ngo-confirm">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="ngo-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                  {!isRegister && (
                    <div className="text-right">
                      <button className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                  )}
                  <Button onClick={() => handleSubmit('ngo')} className="w-full bg-green-600 hover:bg-green-700">
                    {isRegister ? 'Register NGO' : 'Sign In'}
                  </Button>
                  <p className="text-center text-sm text-slate-600">
                    {isRegister ? 'Already registered?' : 'New organization?'}{' '}
                    <button
                      onClick={() => setIsRegister(!isRegister)}
                      className="text-blue-600 hover:underline"
                    >
                      {isRegister ? 'Sign In' : 'Register'}
                    </button>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
