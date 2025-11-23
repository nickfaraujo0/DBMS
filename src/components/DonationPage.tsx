import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Heart, 
  LayoutDashboard, 
  FolderOpen, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  CreditCard,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type DonationPageProps = {
  onNavigate: (page: any) => void;
  isLoggedIn: boolean;
  userType: 'ngo' | 'user' | null;
  onLogout: () => void;
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

type DonationHistory = {
  id: number;
  campaign: string;
  amount: number;
  date: string;
};

const initialHistory: DonationHistory[] = [
  { id: 1, campaign: 'Clean Water Initiative', amount: 100, date: '2025-01-15' },
  { id: 2, campaign: 'Education for All', amount: 250, date: '2025-02-03' },
  { id: 3, campaign: 'Green Planet Foundation', amount: 50, date: '2025-02-28' },
];

export function DonationPage({ onNavigate, isLoggedIn, userType, onLogout }: DonationPageProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>(initialHistory);

  const handleDonate = (campaign: typeof campaigns[0]) => {
    setSelectedCampaign(campaign);
    setDonationAmount('');
  };

  const handleConfirmDonation = () => {
    if (selectedCampaign && donationAmount) {
      const newDonation: DonationHistory = {
        id: Date.now(),
        campaign: selectedCampaign.title,
        amount: parseFloat(donationAmount),
        date: new Date().toISOString().split('T')[0]
      };
      setDonationHistory([newDonation, ...donationHistory]);
      setSelectedCampaign(null);
      setShowSuccessModal(true);
    }
  };

  const renderContent = () => {
    if (userType === 'ngo') {
      return (
        <div className="min-h-screen bg-slate-50 flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r min-h-screen sticky top-0">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Heart className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-sm text-slate-600">NGO Dashboard</div>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <button
                onClick={() => onNavigate('ngo-dashboard')}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-100 mb-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => onNavigate('campaigns')}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-100 mb-2"
              >
                <FolderOpen className="w-5 h-5" />
                <span>My Campaigns</span>
              </button>
              <button
                onClick={() => onNavigate('donations')}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-50 text-blue-600 mb-2"
              >
                <DollarSign className="w-5 h-5" />
                <span>Donations</span>
              </button>
              <button
                onClick={() => onNavigate('volunteers')}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-100 mb-2"
              >
                <Users className="w-5 h-5" />
                <span>Volunteers</span>
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-100 mb-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl mb-2">Donation Management</h1>
              <p className="text-slate-600">View and track all donations to your campaigns</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest contributions to your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="mb-1">{donation.campaign}</div>
                        <div className="text-sm text-slate-600">
                          {new Date(donation.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-green-600">${donation.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl">NGO Connect</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition">Home</button>
              <button onClick={() => onNavigate('donations')} className="hover:text-blue-600 transition">Campaigns</button>
              <button onClick={() => onNavigate('volunteers')} className="hover:text-blue-600 transition">Volunteer</button>
            </div>
            {isLoggedIn ? (
              <Button onClick={onLogout} variant="outline">Logout</Button>
            ) : (
              <Button onClick={() => onNavigate('login')}>Login</Button>
            )}
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl mb-4">Support a Campaign</h1>
            <p className="text-xl text-slate-600">Your donation can change lives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                      onClick={() => handleDonate(campaign)}
                    >
                      Donate Now
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {isLoggedIn && userType === 'user' && (
            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
                <CardDescription>Track your contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="mb-1">{donation.campaign}</div>
                        <div className="text-sm text-slate-600">
                          {new Date(donation.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-green-600">${donation.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Donation Modal */}
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
              <DialogDescription>
                {selectedCampaign?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  {[25, 50, 100, 250].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDonationAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="card" placeholder="1234 5678 9012 3456" className="pl-10" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmDonation} className="bg-green-600 hover:bg-green-700">
                Confirm Donation
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <DialogTitle className="text-2xl mb-2">Thank You!</DialogTitle>
              <DialogDescription className="text-lg">
                Your donation of ${donationAmount} has been successfully processed.
              </DialogDescription>
              <Button 
                onClick={() => setShowSuccessModal(false)} 
                className="mt-6 bg-green-600 hover:bg-green-700"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return renderContent();
}
