import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Users, Package, Store, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, Edit, Bell, BarChart3, Shield, FileText, Truck, MessageSquare, Search, Filter } from 'lucide-react';

interface AdminAppProps {
  onBack: () => void;
}

export default function AdminApp({ onBack }: AdminAppProps) {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedListing, setSelectedListing] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-purple-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Sahaj Admin Dashboard</h1>
              <p className="text-purple-100">Platform Management & Monitoring</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">Admin Panel</p>
            <p className="font-semibold">Super Admin</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement setShowModal={setShowModal} setSelectedUser={setSelectedUser} />
          </TabsContent>

          <TabsContent value="listings">
            <ListingManagement setShowModal={setShowModal} setSelectedListing={setSelectedListing} />
          </TabsContent>

          <TabsContent value="storage">
            <StorageManagement setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="transport">
            <TransportManagement setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyManagement setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsNotifications setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsAnalytics setShowModal={setShowModal} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showModal && (
        <AdminModals 
          modal={showModal} 
          onClose={() => setShowModal(null)}
          selectedUser={selectedUser}
          selectedListing={selectedListing}
        />
      )}
    </div>
  );
}

// Admin Overview Dashboard
function AdminOverview({ setShowModal }: any) {
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Listings', value: '1,234', change: '+8%', icon: Package, color: 'text-green-600' },
    { label: 'Storage Facilities', value: '156', change: '+3%', icon: Store, color: 'text-purple-600' },
    { label: 'Monthly Revenue', value: '₹4.2L', change: '+18%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentActivity = [
    { type: 'user', action: 'New farmer registered', user: 'Rajesh Kumar', time: '5 min ago', status: 'pending' },
    { type: 'listing', action: 'Crop listing flagged', user: 'Suresh Patel', time: '12 min ago', status: 'review' },
    { type: 'payment', action: 'Payment dispute raised', user: 'AgriCorp Ltd', time: '25 min ago', status: 'urgent' },
    { type: 'storage', action: 'Storage capacity updated', user: 'Cold Storage Co', time: '1 hour ago', status: 'completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button onClick={() => setShowModal('verify-users')} className="flex flex-col h-20">
              <Shield className="w-6 h-6 mb-2" />
              Verify Users
            </Button>
            <Button onClick={() => setShowModal('send-alert')} className="flex flex-col h-20" variant="outline">
              <Bell className="w-6 h-6 mb-2" />
              Send Alert
            </Button>
            <Button onClick={() => setShowModal('moderate-content')} className="flex flex-col h-20" variant="outline">
              <FileText className="w-6 h-6 mb-2" />
              Moderate Content
            </Button>
            <Button onClick={() => setShowModal('system-health')} className="flex flex-col h-20" variant="outline">
              <BarChart3 className="w-6 h-6 mb-2" />
              System Health
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'urgent' ? 'bg-red-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' :
                    activity.status === 'review' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user} • {activity.time}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">⚠️ System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-orange-700">• 3 farmers pending KYC verification</p>
            <p className="text-orange-700">• 2 storage facilities at 90%+ capacity</p>
            <p className="text-orange-700">• Heavy rainfall alert active for Khandwa region</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// User Management Component
function UserManagement({ setShowModal, setSelectedUser }: any) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      type: 'Farmer',
      location: 'Khandwa, MP',
      phone: '9876543210',
      verified: true,
      kycStatus: 'Verified',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      totalOrders: 15,
      rating: 4.8
    },
    {
      id: 2,
      name: 'AgriCorp Ltd',
      type: 'Buyer',
      location: 'Indore, MP',
      phone: '9876543211',
      verified: true,
      kycStatus: 'Verified',
      joinDate: '2024-01-10',
      lastActive: '1 day ago',
      totalOrders: 45,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Priya Sharma',
      type: 'Farmer',
      location: 'Bhopal, MP',
      phone: '9876543212',
      verified: false,
      kycStatus: 'Pending',
      joinDate: '2024-01-20',
      lastActive: '5 hours ago',
      totalOrders: 3,
      rating: 4.2
    },
    {
      id: 4,
      name: 'Village Cold Storage',
      type: 'Storage Provider',
      location: 'Dewas, MP',
      phone: '9876543213',
      verified: true,
      kycStatus: 'Verified',
      joinDate: '2024-01-08',
      lastActive: '3 hours ago',
      totalOrders: 89,
      rating: 4.9
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.type === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('bulk-verify')} variant="outline">
            Bulk Actions
          </Button>
          <Button onClick={() => setShowModal('add-user')}>
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search users by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="Farmer">Farmers</SelectItem>
                <SelectItem value="Buyer">Buyers</SelectItem>
                <SelectItem value="Storage Provider">Storage Providers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.location}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={user.verified ? 'bg-green-500' : 'bg-yellow-500'}>
                        {user.verified ? 'Verified' : 'Pending'}
                      </Badge>
                      <p className="text-xs text-gray-500">KYC: {user.kycStatus}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">Joined: {user.joinDate}</p>
                      <p className="text-sm text-gray-600">Last: {user.lastActive}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{user.totalOrders} orders</p>
                      <p className="text-sm text-gray-600">⭐ {user.rating}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal('view-user');
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal('edit-user');
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {!user.verified && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Listing Management Component
function ListingManagement({ setShowModal, setSelectedListing }: any) {
  const listings = [
    {
      id: 1,
      crop: 'Wheat',
      farmer: 'Rajesh Kumar',
      quantity: '50 Quintal',
      price: '₹2,200/Quintal',
      status: 'Active',
      flagged: false,
      views: 45,
      inquiries: 8,
      datePosted: '2024-01-20',
      grade: 'Premium',
      storageRecommended: 'Village Cold Storage'
    },
    {
      id: 2,
      crop: 'Rice',
      farmer: 'Priya Sharma',
      quantity: '30 Quintal',
      price: '₹2,800/Quintal',
      status: 'Flagged',
      flagged: true,
      views: 23,
      inquiries: 2,
      datePosted: '2024-01-18',
      grade: 'Standard',
      flagReason: 'Price seems unusually high'
    },
    {
      id: 3,
      crop: 'Cotton',
      farmer: 'Suresh Patel',
      quantity: '20 Quintal',
      price: '₹5,500/Quintal',
      status: 'Sold',
      flagged: false,
      views: 67,
      inquiries: 15,
      datePosted: '2024-01-15',
      grade: 'Premium',
      soldDate: '2024-01-22'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Crop Listings Management</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('bulk-moderate')} variant="outline">
            Bulk Moderate
          </Button>
          <Button onClick={() => setShowModal('listing-analytics')}>
            View Analytics
          </Button>
        </div>
      </div>

      {/* Listings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop Details</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Storage Suggestion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map(listing => (
                <TableRow key={listing.id} className={listing.flagged ? 'bg-red-50' : ''}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{listing.crop}</p>
                      <p className="text-sm text-gray-600">{listing.quantity}</p>
                      <p className="text-sm text-gray-500">Grade: {listing.grade}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{listing.farmer}</p>
                      <p className="text-sm text-gray-600">Posted: {listing.datePosted}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{listing.price}</p>
                      {listing.flagged && listing.flagReason && (
                        <p className="text-xs text-red-600">{listing.flagReason}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{listing.views} views</p>
                      <p className="text-sm text-gray-600">{listing.inquiries} inquiries</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      listing.status === 'Active' ? 'bg-green-500' :
                      listing.status === 'Flagged' ? 'bg-red-500' :
                      'bg-gray-500'
                    }>
                      {listing.status}
                    </Badge>
                    {listing.soldDate && (
                      <p className="text-xs text-gray-500 mt-1">Sold: {listing.soldDate}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-blue-600">{listing.storageRecommended || 'None'}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedListing(listing);
                          setShowModal('view-listing');
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {listing.flagged && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Storage Management Component
function StorageManagement({ setShowModal }: any) {
  const storageOptions = [
    {
      id: 1,
      name: 'Village Cold Storage',
      type: 'Cold Storage',
      location: 'Khandwa, MP',
      capacity: '500 Quintal',
      currentUsage: '425 Quintal',
      utilizationRate: 85,
      price: '₹5/day per bag',
      contact: '9876543210',
      rating: 4.8,
      verified: true,
      status: 'Active'
    },
    {
      id: 2,
      name: 'District Warehouse',
      type: 'Warehouse',
      location: 'Indore, MP',
      capacity: '2000 Quintal',
      currentUsage: '1850 Quintal',
      utilizationRate: 92,
      price: '₹3/day per bag',
      contact: '9876543211',
      rating: 4.5,
      verified: true,
      status: 'Nearly Full'
    },
    {
      id: 3,
      name: 'FCI Godown',
      type: 'Government',
      location: 'Bhopal, MP',
      capacity: '5000 Quintal',
      currentUsage: '3200 Quintal',
      utilizationRate: 64,
      price: '₹2/day per bag',
      contact: '9876543212',
      rating: 4.2,
      verified: true,
      status: 'Available'
    }
  ];

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Nearly Full': return 'bg-yellow-100 text-yellow-800';
      case 'Full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Storage Facility Management</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('add-storage')} variant="outline">
            Add Storage
          </Button>
          <Button onClick={() => setShowModal('storage-analytics')}>
            Usage Analytics
          </Button>
        </div>
      </div>

      {/* Storage Overview Cards */}
      <div className="grid gap-4">
        {storageOptions.map(storage => (
          <Card key={storage.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{storage.name}</h3>
                    {storage.verified && (
                      <Badge className="bg-blue-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type</p>
                      <p className="font-medium">{storage.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{storage.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-medium">{storage.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rating</p>
                      <p className="font-medium">⭐ {storage.rating}</p>
                    </div>
                  </div>

                  {/* Capacity Usage */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600">Capacity Utilization</p>
                      <p className={`text-sm font-medium ${getUtilizationColor(storage.utilizationRate)}`}>
                        {storage.utilizationRate}% Used
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          storage.utilizationRate >= 90 ? 'bg-red-500' :
                          storage.utilizationRate >= 75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${storage.utilizationRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {storage.currentUsage} / {storage.capacity} used
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(storage.status)}>
                    {storage.status}
                  </Badge>
                  <br />
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Manage
                  </Button>
                  <br />
                  <a href={`tel:${storage.contact}`} className="text-sm text-blue-600">
                    📞 {storage.contact}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Storage Performance Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Store className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-600">Total Facilities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">7,500</p>
            <p className="text-sm text-gray-600">Total Capacity (Quintal)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">78%</p>
            <p className="text-sm text-gray-600">Average Utilization</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Transport Management Component
function TransportManagement({ setShowModal }: any) {
  const transportProviders = [
    {
      id: 1,
      name: 'FarmLogistics Pro',
      vehicleType: 'Refrigerated Truck (5 Ton)',
      totalVehicles: 15,
      activeBookings: 8,
      rating: 4.8,
      price: '₹18/km',
      specialFeatures: ['Temperature Control', 'GPS Tracking', 'Insurance'],
      verified: true,
      contact: '9876543220'
    },
    {
      id: 2,
      name: 'Agri Transport Co',
      vehicleType: 'Multi-type Fleet',
      totalVehicles: 25,
      activeBookings: 12,
      rating: 4.5,
      price: '₹12-15/km',
      specialFeatures: ['Real-time Tracking', 'Flexible Scheduling'],
      verified: true,
      contact: '9876543221'
    }
  ];

  const recentBookings = [
    {
      id: 'BK001',
      from: 'Rajesh Kumar Farm',
      to: 'Village Cold Storage',
      crop: 'Wheat - 20 Quintal',
      provider: 'FarmLogistics Pro',
      status: 'In Transit',
      estimatedArrival: '2 hours',
      trackingCode: 'TRK001'
    },
    {
      id: 'BK002',
      from: 'District Warehouse',
      to: 'AgriCorp Facility',
      crop: 'Rice - 50 Quintal',
      provider: 'Agri Transport Co',
      status: 'Delivered',
      completedAt: '1 hour ago',
      trackingCode: 'TRK002'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transport Management</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('add-transport')} variant="outline">
            Add Provider
          </Button>
          <Button onClick={() => setShowModal('transport-analytics')}>
            Route Analytics
          </Button>
        </div>
      </div>

      {/* Transport Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Transport Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transportProviders.map(provider => (
              <div key={provider.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{provider.name}</h4>
                      {provider.verified && (
                        <Badge className="bg-green-500">Verified</Badge>
                      )}
                    </div>
                    <p className="text-gray-600">{provider.vehicleType}</p>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-500">Total Vehicles</p>
                        <p className="font-medium">{provider.totalVehicles}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Active Bookings</p>
                        <p className="font-medium">{provider.activeBookings}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rating</p>
                        <p className="font-medium">⭐ {provider.rating}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {provider.specialFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{provider.price}</p>
                    <Button size="sm" className="mt-2" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transport Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.map(booking => (
              <div key={booking.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-semibold">{booking.id}</h5>
                    <p className="text-gray-600">{booking.from} → {booking.to}</p>
                    <p className="text-sm text-gray-500">{booking.crop}</p>
                    <p className="text-sm text-blue-600">Provider: {booking.provider}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      booking.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {booking.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.estimatedArrival || booking.completedAt}
                    </p>
                    <p className="text-xs text-gray-400">Track: {booking.trackingCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Alerts and Notifications Component
function AlertsNotifications({ setShowModal }: any) {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: 'weather',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected in Khandwa region for next 48 hours',
      priority: 'high',
      affectedUsers: 245,
      createdAt: '2024-01-23 10:30 AM',
      status: 'active'
    },
    {
      id: 2,
      type: 'scheme',
      title: 'PM-Kisan Scheme Deadline',
      message: 'Last date to apply for PM-Kisan scheme is approaching',
      priority: 'medium',
      affectedUsers: 1200,
      createdAt: '2024-01-22 2:15 PM',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Alerts & Notifications</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('create-alert')}>
            <Bell className="w-4 h-4 mr-2" />
            Create Alert
          </Button>
          <Button onClick={() => setShowModal('bulk-notify')} variant="outline">
            Bulk Notify
          </Button>
        </div>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Platform Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className={`p-4 border rounded-lg ${
                alert.priority === 'high' ? 'border-red-200 bg-red-50' :
                alert.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <Badge className={
                        alert.priority === 'high' ? 'bg-red-500' :
                        alert.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }>
                        {alert.priority} priority
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 {alert.createdAt}</span>
                      <span>👥 {alert.affectedUsers} users affected</span>
                      <span>📧 Type: {alert.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Deactivate</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Alert Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Alert Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => setShowModal('weather-alert')}
            >
              <AlertTriangle className="w-6 h-6 mb-2 text-orange-500" />
              Weather Alert
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => setShowModal('scheme-notification')}
            >
              <FileText className="w-6 h-6 mb-2 text-blue-500" />
              Scheme Notification
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => setShowModal('price-update')}
            >
              <TrendingUp className="w-6 h-6 mb-2 text-green-500" />
              Price Update
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col"
              onClick={() => setShowModal('system-maintenance')}
            >
              <Shield className="w-6 h-6 mb-2 text-purple-500" />
              System Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Analytics */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">2,456</p>
            <p className="text-sm text-gray-600">Notifications Sent Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">89%</p>
            <p className="text-sm text-gray-600">Delivery Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-gray-600">Active Recipients</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Emergency Management Component
function EmergencyManagement({ setShowModal }: any) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const emergencyContacts = {
    "Madhya Pradesh": {
      state: {
        disaster: "1077",
        dm: "0755-2234567",
        agri: "0755-2234789",
        lastUpdated: "2024-01-20"
      },
      districts: {
        "Khandwa": {
          disaster: "1077",
          dm: "07571-234567",
          agri: "07571-234789",
          police: "100",
          hospital: "108",
          lastUpdated: "2024-01-18"
        },
        "Indore": {
          disaster: "1077",
          dm: "0731-2234567",
          agri: "0731-2234789",
          police: "100",
          hospital: "108",
          lastUpdated: "2024-01-19"
        },
        "Bhopal": {
          disaster: "1077",
          dm: "0755-2234567",
          agri: "0755-2234789",
          police: "100",
          hospital: "108",
          lastUpdated: "2024-01-20"
        }
      }
    },
    "Punjab": {
      state: {
        disaster: "1077",
        dm: "0172-2234567",
        agri: "0172-2234789",
        lastUpdated: "2024-01-19"
      },
      districts: {
        "Ludhiana": {
          disaster: "1077",
          dm: "0161-2234567",
          agri: "0161-2234789",
          police: "100",
          hospital: "108",
          lastUpdated: "2024-01-18"
        }
      }
    }
  };

  const emergencyRequests = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "9876543210",
      location: "Khandwa, MP",
      type: "Flood Damage",
      description: "Urgent help needed for flood damaged crops",
      priority: "High",
      status: "Pending",
      requestTime: "2024-01-23 10:30 AM",
      assignedTo: null
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "9876543211",
      location: "Indore, MP",
      type: "Crop Disease",
      description: "White rust disease in mustard crop spreading rapidly",
      priority: "Medium",
      status: "In Progress",
      requestTime: "2024-01-23 9:15 AM",
      assignedTo: "Dr. Suresh Patel"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Emergency Management System</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('add-emergency-contact')} variant="outline">
            Add Contact
          </Button>
          <Button onClick={() => setShowModal('emergency-broadcast')}>
            Emergency Broadcast
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">8</p>
            <p className="text-sm text-gray-600">Pending Requests</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">15</p>
            <p className="text-sm text-gray-600">Active Officers</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">127</p>
            <p className="text-sm text-gray-600">Resolved Today</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">3.2</p>
            <p className="text-sm text-gray-600">Avg Response (min)</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact Management */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>State</Label>
                <Select value={selectedState} onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedDistrict('');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(emergencyContacts).map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>District</Label>
                <Select 
                  value={selectedDistrict} 
                  onValueChange={setSelectedDistrict}
                  disabled={!selectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedState && Object.keys(emergencyContacts[selectedState as keyof typeof emergencyContacts].districts).map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedState && selectedDistrict && (
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">{selectedDistrict}, {selectedState}</h4>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm">Update Numbers</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-3">Emergency Contacts</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Disaster Management:</span>
                        <a href={`tel:${emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].disaster}`} className="text-blue-600 font-medium">
                          {emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].disaster}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>District Magistrate:</span>
                        <a href={`tel:${emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].dm}`} className="text-blue-600 font-medium">
                          {emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].dm}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>Agriculture Officer:</span>
                        <a href={`tel:${emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].agri}`} className="text-blue-600 font-medium">
                          {emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].agri}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>Police Emergency:</span>
                        <a href={`tel:${emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].police}`} className="text-blue-600 font-medium">
                          {emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].police}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical Emergency:</span>
                        <a href={`tel:${emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].hospital}`} className="text-blue-600 font-medium">
                          {emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].hospital}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium mb-3">Contact Status</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span>{emergencyContacts[selectedState as keyof typeof emergencyContacts].districts[selectedDistrict].lastUpdated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verification Status:</span>
                        <Badge className="bg-green-500">Verified</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="text-green-600">2.1 min avg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Emergency Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyRequests.map(request => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{request.name}</h4>
                    <p className="text-sm text-gray-600">{request.location} • {request.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">{request.requestTime}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <br />
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="font-medium text-sm">Issue: {request.type}</p>
                  <p className="text-sm text-gray-700 mt-1">{request.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {request.assignedTo ? (
                      <span>Assigned to: <strong>{request.assignedTo}</strong></span>
                    ) : (
                      <span className="text-red-600">Unassigned</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <a href={`tel:${request.phone}`}>📞 Call</a>
                    </Button>
                    {!request.assignedTo && (
                      <Button size="sm">Assign Officer</Button>
                    )}
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reports and Analytics Component
function ReportsAnalytics({ setShowModal }: any) {
  const analyticsData = {
    totalUsers: 2847,
    userGrowth: '+12%',
    totalListings: 1234,
    listingsGrowth: '+8%',
    totalRevenue: '₹4.2L',
    revenueGrowth: '+18%',
    storageUtilization: '78%'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowModal('generate-report')} variant="outline">
            Generate Report
          </Button>
          <Button onClick={() => setShowModal('export-data')}>
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{analyticsData.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-sm text-green-600">{analyticsData.userGrowth} this month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{analyticsData.totalListings}</p>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-sm text-green-600">{analyticsData.listingsGrowth} this month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{analyticsData.totalRevenue}</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-sm text-green-600">{analyticsData.revenueGrowth} this month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Store className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{analyticsData.storageUtilization}</p>
              <p className="text-sm text-gray-600">Storage Utilization</p>
              <p className="text-sm text-blue-600">Across all facilities</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">User Engagement</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Daily Active Users</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Session Time</span>
                  <span className="font-medium">12 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Successful Transactions</span>
                  <span className="font-medium">89%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Marketplace Health</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Listing Success Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Response Time</span>
                  <span className="font-medium">2.3 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>User Satisfaction</span>
                  <span className="font-medium">4.6/5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col"
              onClick={() => setShowModal('user-report')}
            >
              <Users className="w-6 h-6 mb-2" />
              <span>User Report</span>
              <span className="text-xs text-gray-500">Weekly active users</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col"
              onClick={() => setShowModal('sales-report')}
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              <span>Sales Report</span>
              <span className="text-xs text-gray-500">Revenue & transactions</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col"
              onClick={() => setShowModal('storage-report')}
            >
              <Store className="w-6 h-6 mb-2" />
              <span>Storage Report</span>
              <span className="text-xs text-gray-500">Utilization & capacity</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Admin Modals Component
function AdminModals({ modal, onClose, selectedUser, selectedListing }: any) {
  return (
    <Dialog open={!!modal} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {modal === 'view-user' && 'User Details'}
            {modal === 'create-alert' && 'Create Platform Alert'}
            {modal === 'verify-users' && 'Bulk User Verification'}
            {modal === 'view-listing' && 'Listing Details & Moderation'}
            {modal === 'send-alert' && 'Send Custom Alert'}
            {modal === 'generate-report' && 'Generate Analytics Report'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {modal === 'view-user' && selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">User Information</h3>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Type:</strong> {selectedUser.type}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p><strong>Location:</strong> {selectedUser.location}</p>
                    <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>
                    <p><strong>Last Active:</strong> {selectedUser.lastActive}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Verification Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Account Verified:</span>
                      <Badge className={selectedUser.verified ? 'bg-green-500' : 'bg-red-500'}>
                        {selectedUser.verified ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>KYC Status:</span>
                      <Badge variant="outline">{selectedUser.kycStatus}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Orders:</span>
                      <span>{selectedUser.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span>⭐ {selectedUser.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {!selectedUser.verified && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify User
                  </Button>
                )}
                <Button variant="outline">Edit Details</Button>
                <Button variant="destructive">Suspend Account</Button>
              </div>
            </div>
          )}

          {modal === 'create-alert' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Alert Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weather">Weather Alert</SelectItem>
                      <SelectItem value="scheme">Government Scheme</SelectItem>
                      <SelectItem value="price">Price Update</SelectItem>
                      <SelectItem value="system">System Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Alert Title</Label>
                <Input placeholder="Enter alert title" />
              </div>

              <div>
                <Label>Alert Message</Label>
                <Textarea 
                  placeholder="Enter detailed alert message..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="farmers">Farmers Only</SelectItem>
                      <SelectItem value="buyers">Buyers Only</SelectItem>
                      <SelectItem value="location">By Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Send Immediately</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Create & Send Alert
              </Button>
            </div>
          )}

          {modal === 'view-listing' && selectedListing && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Listing Details</h3>
                  <div className="space-y-2">
                    <p><strong>Crop:</strong> {selectedListing.crop}</p>
                    <p><strong>Farmer:</strong> {selectedListing.farmer}</p>
                    <p><strong>Quantity:</strong> {selectedListing.quantity}</p>
                    <p><strong>Price:</strong> {selectedListing.price}</p>
                    <p><strong>Grade:</strong> {selectedListing.grade}</p>
                    <p><strong>Date Posted:</strong> {selectedListing.datePosted}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Performance</h3>
                  <div className="space-y-2">
                    <p><strong>Views:</strong> {selectedListing.views}</p>
                    <p><strong>Inquiries:</strong> {selectedListing.inquiries}</p>
                    <p><strong>Status:</strong> 
                      <Badge className="ml-2">{selectedListing.status}</Badge>
                    </p>
                    {selectedListing.flagged && (
                      <p><strong>Flag Reason:</strong> {selectedListing.flagReason}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {selectedListing.flagged && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Listing
                  </Button>
                )}
                <Button variant="outline">Contact Farmer</Button>
                <Button variant="destructive">Remove Listing</Button>
              </div>
            </div>
          )}

          {modal === 'generate-report' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">User Analytics</SelectItem>
                      <SelectItem value="listings">Listing Performance</SelectItem>
                      <SelectItem value="revenue">Revenue Report</SelectItem>
                      <SelectItem value="storage">Storage Utilization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Include Metrics</Label>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>User Growth & Engagement</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Transaction Volume</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Geographic Distribution</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Storage Utilization Trends</span>
                  </label>
                </div>
              </div>

              <div>
                <Label>Export Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Generate Report
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}