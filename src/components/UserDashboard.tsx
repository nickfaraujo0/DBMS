import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Heart, 
  DollarSign, 
  Users, 
  LogOut,
  TrendingUp,
  Calendar
} from 'lucide-react';

type UserDashboardProps = {
  onNavigate: (page: 'user-dashboard' | 'donations' | 'volunteers' | 'home') => void;
  onLogout: () => void;
};

const donationHistory = [
  { id: 1, campaign: 'Clean Water Initiative', amount: 100, date: '2025-01-15' },
  { id: 2, campaign: 'Education for All', amount: 250, date: '2025-02-03' },
  { id: 3, campaign: 'Green Planet Foundation', amount: 50, date: '2025-02-28' },
];

const volunteerApplications = [
  {
    id: 1,
    role: 'Community Outreach Coordinator',
    ngo: 'Clean Water Initiative',
    status: 'Approved',
    appliedDate: '2025-01-10'
  },
  {
    id: 2,
    role: 'English Teacher',
    ngo: 'Education for All',
    status: 'Applied',
    appliedDate: '2025-02-15'
  },
];

const followedCampaigns = [
  {
    id: 1,
    name: 'Clean Water Initiative',
    goal: 50000,
    raised: 32500
  },
  {
    id: 2,
    name: 'Education Support Program',
    goal: 75000,
    raised: 48000
  },
];

export function UserDashboard({ onNavigate, onLogout }: UserDashboardProps) {
  const totalDonated = donationHistory.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-xl">NGO Connect</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('user-dashboard')} className="text-blue-600">Dashboard</button>
            <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition">Home</button>
            <button onClick={() => onNavigate('donations')} className="hover:text-blue-600 transition">Campaigns</button>
            <button onClick={() => onNavigate('volunteers')} className="hover:text-blue-600 transition">Volunteer</button>
          </div>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Your Dashboard</h1>
          <p className="text-slate-600">Track your impact and contributions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Donated</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-1">${totalDonated.toLocaleString()}</div>
              <p className="text-xs text-slate-600">{donationHistory.length} donations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Volunteer Applications</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-1">{volunteerApplications.length}</div>
              <p className="text-xs text-slate-600">
                {volunteerApplications.filter(v => v.status === 'Approved').length} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-1">850</div>
              <p className="text-xs text-green-600">+15% this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Your contribution history</CardDescription>
                </div>
                <Button onClick={() => onNavigate('donations')} variant="outline" size="sm">
                  Donate More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="mb-1">{donation.campaign}</div>
                      <div className="text-sm text-slate-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(donation.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-green-600">${donation.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Volunteer Applications</CardTitle>
                  <CardDescription>Track your applications</CardDescription>
                </div>
                <Button onClick={() => onNavigate('volunteers')} variant="outline" size="sm">
                  Browse More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteerApplications.map((app) => (
                  <div key={app.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="mb-1">{app.role}</div>
                        <div className="text-sm text-slate-600">{app.ngo}</div>
                      </div>
                      <Badge
                        className={
                          app.status === 'Approved' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied {new Date(app.appliedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Followed Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Campaigns You Support</CardTitle>
            <CardDescription>Track the progress of campaigns you've donated to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {followedCampaigns.map((campaign) => {
                const percentage = (campaign.raised / campaign.goal) * 100;
                return (
                  <div key={campaign.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{campaign.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="mb-1">${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</div>
                        <div className="text-sm text-slate-600">{percentage.toFixed(0)}% funded</div>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
