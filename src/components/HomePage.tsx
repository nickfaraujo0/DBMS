import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Heart, Users, TrendingUp, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type HomePageProps = {
  onNavigate: (page: 'login' | 'donations' | 'volunteers') => void;
  isLoggedIn: boolean;
  userType: 'ngo' | 'user' | null;
};

const campaigns = [
  {
    id: 1,
    ngo: 'Clean Water Initiative',
    title: 'Bring Clean Water to Rural Communities',
    description: 'Help us provide clean drinking water to 500 families in rural areas.',
    goal: 50000,
    raised: 32500,
    image: 'https://images.unsplash.com/photo-1759521393404-dfbacf56a3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwZWR1Y2F0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc2Mjg4NDc0NHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    ngo: 'Education for All',
    title: 'Build Schools in Underserved Areas',
    description: 'Support education by helping us build 3 new schools this year.',
    goal: 100000,
    raised: 78000,
    image: 'https://images.unsplash.com/photo-1601071723681-6a00b8b0908c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwc2Nob29sfGVufDF8fHx8MTc2MjgzNDM4MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    ngo: 'Green Planet Foundation',
    title: 'Plant 10,000 Trees This Season',
    description: 'Join us in our mission to combat climate change through reforestation.',
    goal: 25000,
    raised: 18750,
    image: 'https://images.unsplash.com/photo-1669553228878-bcacc4e49168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY29uc2VydmF0aW9uJTIwZm9yZXN0fGVufDF8fHx8MTc2Mjg4NDc0NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
];

export function HomePage({ onNavigate, isLoggedIn, userType }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl">NGO Connect</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button className="hover:text-blue-600 transition">Home</button>
            <button onClick={() => onNavigate('donations')} className="hover:text-blue-600 transition">Campaigns</button>
            <button className="hover:text-blue-600 transition">NGOs</button>
            <button onClick={() => onNavigate('donations')} className="hover:text-blue-600 transition">Donate</button>
            <button onClick={() => onNavigate('volunteers')} className="hover:text-blue-600 transition">Volunteer</button>
          </div>
          {!isLoggedIn ? (
            <Button onClick={() => onNavigate('login')}>Login</Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                Welcome, {userType === 'ngo' ? 'Organization' : 'User'}!
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwdm9sdW50ZWVycyUyMGhlbHBpbmclMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYyODg0NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl mb-6 max-w-3xl mx-auto">Connecting NGOs with Changemakers</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our platform to make a real difference in communities worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-slate-100"
              onClick={() => onNavigate('donations')}
            >
              Donate Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('volunteers')}
            >
              Join as a Volunteer
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl mb-2">1,234</h3>
              <p className="text-slate-600">Active Campaigns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-4xl mb-2">45,678</h3>
              <p className="text-slate-600">Volunteers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-4xl mb-2">$2.5M</h3>
              <p className="text-slate-600">Raised This Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Campaigns */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Ongoing Campaigns</h2>
            <p className="text-xl text-slate-600">Support causes that matter to you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              const percentage = (campaign.raised / campaign.goal) * 100;
              return (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback 
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-sm text-blue-600 mb-2">{campaign.ngo}</div>
                    <CardTitle>{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress value={percentage} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          ${campaign.raised.toLocaleString()} raised
                        </span>
                        <span>
                          ${campaign.goal.toLocaleString()} goal
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => onNavigate('donations')}
                    >
                      Donate Now
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you want to donate, volunteer, or run a campaign, we're here to help you create positive change.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-slate-100"
            onClick={() => onNavigate('login')}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6" />
                <span className="text-lg">NGO Connect</span>
              </div>
              <p className="text-slate-400">
                Connecting NGOs with donors and volunteers to create meaningful impact worldwide.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Contact Us</h3>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@ngoconnect.org</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Charity Lane, City, Country</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>© 2025 NGO Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
