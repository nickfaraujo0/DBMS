import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Heart, 
  LayoutDashboard, 
  FolderOpen, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Calendar
} from 'lucide-react';
import { Progress } from './ui/progress';

type CampaignManagementProps = {
  onNavigate: (page: 'ngo-dashboard' | 'campaigns' | 'donations' | 'volunteers') => void;
  onLogout: () => void;
};

type Campaign = {
  id: number;
  name: string;
  description: string;
  goal: number;
  raised: number;
  startDate: string;
  status: 'Active' | 'Completed' | 'Paused';
};

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Clean Water Initiative',
    description: 'Provide clean drinking water to 500 families in rural areas.',
    goal: 50000,
    raised: 32500,
    startDate: '2025-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Education Support Program',
    description: 'Build schools and provide educational materials to underserved communities.',
    goal: 75000,
    raised: 48000,
    startDate: '2025-02-01',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Healthcare Outreach',
    description: 'Mobile healthcare clinics for remote villages.',
    goal: 30000,
    raised: 30000,
    startDate: '2024-11-01',
    status: 'Completed'
  },
];

export function CampaignManagement({ onNavigate, onLogout }: CampaignManagementProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    startDate: '',
    status: 'Active' as 'Active' | 'Completed' | 'Paused'
  });

  const handleCreate = () => {
    setEditingCampaign(null);
    setFormData({
      name: '',
      description: '',
      goal: '',
      startDate: '',
      status: 'Active'
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      description: campaign.description,
      goal: campaign.goal.toString(),
      startDate: campaign.startDate,
      status: campaign.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...formData, goal: parseFloat(formData.goal) }
          : c
      ));
    } else {
      const newCampaign: Campaign = {
        id: Math.max(...campaigns.map(c => c.id)) + 1,
        name: formData.name,
        description: formData.description,
        goal: parseFloat(formData.goal),
        raised: 0,
        startDate: formData.startDate,
        status: formData.status
      };
      setCampaigns([...campaigns, newCampaign]);
    }
    setIsDialogOpen(false);
  };

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
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-blue-50 text-blue-600 mb-2"
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Campaign Management</h1>
            <p className="text-slate-600">Create and manage your fundraising campaigns</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
                </DialogTitle>
                <DialogDescription>
                  {editingCampaign ? 'Update your campaign details' : 'Fill in the details for your new campaign'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your campaign"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Goal Amount ($)</Label>
                    <Input
                      id="goal"
                      type="number"
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      placeholder="50000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Launch Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'Active' | 'Completed' | 'Paused') => 
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  {editingCampaign ? 'Update' : 'Create'} Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-6">
          {campaigns.map((campaign) => {
            const percentage = (campaign.raised / campaign.goal) * 100;
            return (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.description}</CardDescription>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(campaign.startDate).toLocaleDateString()}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          campaign.status === 'Active' 
                            ? 'bg-green-100 text-green-700' 
                            : campaign.status === 'Paused'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(campaign)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(campaign.id)}
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">
                        ${campaign.raised.toLocaleString()} raised
                      </span>
                      <span>
                        ${campaign.goal.toLocaleString()} goal
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <div className="text-right text-sm">
                      {percentage.toFixed(1)}% funded
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
