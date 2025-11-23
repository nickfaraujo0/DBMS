import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Heart, 
  LayoutDashboard, 
  FolderOpen, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type NGODashboardProps = {
  onNavigate: (page: 'ngo-dashboard' | 'campaigns' | 'donations' | 'volunteers') => void;
  onLogout: () => void;
};

const donationData = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3000 },
  { month: 'Mar', amount: 5000 },
  { month: 'Apr', amount: 4500 },
  { month: 'May', amount: 6000 },
  { month: 'Jun', amount: 7500 },
];

const campaigns = [
  {
    id: 1,
    name: 'Clean Water Initiative',
    status: 'Active',
    goal: 50000,
    raised: 32500,
    startDate: '2025-01-15'
  },
  {
    id: 2,
    name: 'Education Support Program',
    status: 'Active',
    goal: 75000,
    raised: 48000,
    startDate: '2025-02-01'
  },
  {
    id: 3,
    name: 'Healthcare Outreach',
    status: 'Completed',
    goal: 30000,
    raised: 30000,
    startDate: '2024-11-01'
  },
];

export function NGODashboard({ onNavigate, onLogout }: NGODashboardProps) {
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
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-50 text-blue-600 mb-2"
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
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-100 mb-2"
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard Overview</h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with your campaigns.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Campaigns</CardTitle>
              <FolderOpen className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-1">12</div>
              <p className="text-xs text-slate-600">2 active, 10 completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-1">$129,500</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Volunteers</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-1">48</div>
              <p className="text-xs text-slate-600">23 active this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Donations Over Time</CardTitle>
              <CardDescription>Monthly donation trends for 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Donations by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={campaigns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-20} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="raised" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Manage your ongoing fundraising efforts</CardDescription>
              </div>
              <Button onClick={() => onNavigate('campaigns')} className="bg-green-600 hover:bg-green-700">
                Manage Campaigns
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => {
                const percentage = (campaign.raised / campaign.goal) * 100;
                return (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{campaign.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(campaign.startDate).toLocaleDateString()}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            campaign.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
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
      </main>
    </div>
  );
}
