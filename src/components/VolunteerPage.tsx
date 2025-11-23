import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Heart, 
  LayoutDashboard, 
  FolderOpen, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  UserPlus,
  Calendar,
  MapPin
} from 'lucide-react';

type VolunteerPageProps = {
  onNavigate: (page: any) => void;
  isLoggedIn: boolean;
  userType: 'ngo' | 'user' | null;
  onLogout: () => void;
};

type Volunteer = {
  id: number;
  name: string;
  email: string;
  role: string;
  skills: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Applied' | 'Approved' | 'Rejected';
};

const ngoVolunteers: Volunteer[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    role: 'Teaching Assistant',
    skills: 'Education, Child Care',
    startDate: '2025-01-15',
    endDate: '2025-06-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@email.com',
    role: 'Water Engineer',
    skills: 'Engineering, Project Management',
    startDate: '2025-02-01',
    endDate: '2025-08-01',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma@email.com',
    role: 'Healthcare Worker',
    skills: 'Nursing, First Aid',
    startDate: '2024-10-01',
    endDate: '2025-01-01',
    status: 'Completed'
  },
];

const userApplications: Volunteer[] = [
  {
    id: 1,
    name: 'Current User',
    email: 'user@email.com',
    role: 'General Volunteer',
    skills: 'Community Service, Event Organization',
    startDate: '2025-03-01',
    endDate: '2025-09-01',
    status: 'Approved'
  },
];

type VolunteerOpportunity = {
  id: number;
  ngo: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  positions: number;
};

const opportunities: VolunteerOpportunity[] = [
  {
    id: 1,
    ngo: 'Clean Water Initiative',
    title: 'Community Outreach Coordinator',
    description: 'Help us engage with local communities to identify water needs and coordinate installation projects.',
    location: 'Rural Kenya',
    duration: '6 months',
    positions: 3
  },
  {
    id: 2,
    ngo: 'Education for All',
    title: 'English Teacher',
    description: 'Teach English to children in underserved communities and help develop educational materials.',
    location: 'Southeast Asia',
    duration: '1 year',
    positions: 5
  },
  {
    id: 3,
    ngo: 'Green Planet Foundation',
    title: 'Environmental Educator',
    description: 'Conduct workshops on sustainability and lead tree-planting initiatives in schools.',
    location: 'South America',
    duration: '3 months',
    positions: 2
  },
];

export function VolunteerPage({ onNavigate, isLoggedIn, userType, onLogout }: VolunteerPageProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(ngoVolunteers);
  const [applications, setApplications] = useState<Volunteer[]>(userApplications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    availability: '',
    motivation: ''
  });

  const handleApply = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDialogOpen(true);
  };

  const handleSubmitApplication = () => {
    const newApplication: Volunteer = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: selectedOpportunity?.title || 'Volunteer',
      skills: formData.skills,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'Applied'
    };
    setApplications([newApplication, ...applications]);
    setIsDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      skills: '',
      availability: '',
      motivation: ''
    });
  };

  const handleUpdateStatus = (id: number, newStatus: 'Approved' | 'Rejected') => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: newStatus } : v
    ));
  };

  const renderNGOView = () => (
    <div className="min-h-screen bg-slate-50 flex">
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
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-slate-100 mb-2"
          >
            <DollarSign className="w-5 h-5" />
            <span>Donations</span>
          </button>
          <button
            onClick={() => onNavigate('volunteers')}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-50 text-blue-600 mb-2"
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
          <h1 className="text-3xl mb-2">Volunteer Management</h1>
          <p className="text-slate-600">Manage volunteers and track their contributions</p>
        </div>

        <div className="grid gap-6">
          {volunteers.map((volunteer) => (
            <Card key={volunteer.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{volunteer.name}</CardTitle>
                    <CardDescription>{volunteer.email}</CardDescription>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="text-sm">
                        <span className="text-slate-600">Role:</span> {volunteer.role}
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-600">Skills:</span> {volunteer.skills}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(volunteer.startDate).toLocaleDateString()} - {volunteer.endDate ? new Date(volunteer.endDate).toLocaleDateString() : 'Ongoing'}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      volunteer.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : volunteer.status === 'Completed'
                        ? 'bg-slate-100 text-slate-700'
                        : volunteer.status === 'Applied'
                        ? 'bg-blue-100 text-blue-700'
                        : volunteer.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {volunteer.status}
                  </Badge>
                </div>
              </CardHeader>
              {volunteer.status === 'Applied' && (
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdateStatus(volunteer.id, 'Approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus(volunteer.id, 'Rejected')}
                      variant="outline"
                      className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );

  const renderUserView = () => (
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
          <h1 className="text-4xl mb-4">Volunteer Opportunities</h1>
          <p className="text-xl text-slate-600">Make a difference with your time and skills</p>
        </div>

        <div className="grid gap-6 mb-12">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-blue-600 mb-2">{opportunity.ngo}</div>
                    <CardTitle className="mb-2">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </div>
                  <Button onClick={() => handleApply(opportunity)} className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {opportunity.duration}
                  </div>
                  <div>
                    {opportunity.positions} position{opportunity.positions > 1 ? 's' : ''} available
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isLoggedIn && userType === 'user' && (
          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track your volunteer applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="mb-1">{app.role}</div>
                      <div className="text-sm text-slate-600">Applied on {new Date(app.startDate).toLocaleDateString()}</div>
                    </div>
                    <Badge
                      className={
                        app.status === 'Approved' 
                          ? 'bg-green-100 text-green-700' 
                          : app.status === 'Applied'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for Volunteer Position</DialogTitle>
            <DialogDescription>
              {selectedOpportunity?.title} - {selectedOpportunity?.ngo}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Experience</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="List your relevant skills and experience"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="When are you available to volunteer?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to volunteer?</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="Tell us about your motivation"
                rows={4}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitApplication} className="bg-green-600 hover:bg-green-700">
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return userType === 'ngo' ? renderNGOView() : renderUserView();
}
