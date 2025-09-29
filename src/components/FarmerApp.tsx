import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { ArrowLeft, User, Phone, MapPin, CheckCircle, AlertCircle, Package, Store, TrendingUp, FileText, Truck, Upload, Camera, CreditCard, Banknote, MessageSquare, Users, Bot, QrCode, Star, ThumbsUp, Send, Zap } from 'lucide-react';

interface FarmerAppProps {
  onBack: () => void;
}

export default function FarmerApp({ onBack }: FarmerAppProps) {
  const [currentStep, setCurrentStep] = useState<'registration' | 'dashboard'>('registration');
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    district: '',
    village: '',
    farmSize: '',
    aadhaar: '',
    landDocument: null,
    bankAccount: '',
    ifsc: ''
  });
  const [showModal, setShowModal] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState('pending');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (registrationStep < 3) {
      setRegistrationStep(registrationStep + 1);
    } else {
      setCurrentStep('dashboard');
    }
  };

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  if (currentStep === 'registration') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4">
          <div className="max-w-2xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-green-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Farmer Registration</h1>
              <p className="text-green-100">Step {registrationStep} of 3</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4">
          <div className="mb-6">
            <Progress value={(registrationStep / 3) * 100} className="w-full" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {registrationStep === 1 && "Personal Information"}
                {registrationStep === 2 && "KYC Verification"}
                {registrationStep === 3 && "Bank Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {registrationStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp">Madhya Pradesh</SelectItem>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="up">Uttar Pradesh</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input 
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="Your district"
                      />
                    </div>
                    <div>
                      <Label htmlFor="village">Village/Area</Label>
                      <Input 
                        id="village"
                        value={formData.village}
                        onChange={(e) => handleInputChange('village', e.target.value)}
                        placeholder="Village name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="farmSize">Total Farm Area (in acres)</Label>
                    <Input 
                      id="farmSize"
                      value={formData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      placeholder="Enter farm size"
                      type="number"
                    />
                  </div>
                </>
              )}

              {registrationStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">📋 KYC Verification Required</h3>
                      <p className="text-sm text-blue-700">
                        KYC verification is mandatory for accessing government schemes and financial services.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input 
                        id="aadhaar"
                        value={formData.aadhaar}
                        onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                        placeholder="12-digit Aadhaar number"
                        maxLength={12}
                      />
                    </div>

                    <div>
                      <Label>Land Ownership Document</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload land records (Khasra, Revenue Record)</p>
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo or Upload
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">✅ Benefits After KYC</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Access to government schemes and subsidies</li>
                        <li>• Crop insurance eligibility</li>
                        <li>• Verified seller badge</li>
                        <li>• Priority buyer connections</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {registrationStep === 3 && (
                <>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">💰 Bank Account for Payments</h3>
                      <p className="text-sm text-green-700">
                        Add your bank account to receive payments directly from buyers.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="bankAccount">Bank Account Number</Label>
                      <Input 
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                        placeholder="Enter account number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ifsc">IFSC Code</Label>
                      <Input 
                        id="ifsc"
                        value={formData.ifsc}
                        onChange={(e) => handleInputChange('ifsc', e.target.value)}
                        placeholder="Bank IFSC code"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">🔒 Secure Payment Options</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>Direct Bank Transfer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-blue-600" />
                          <span>UPI Payments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-4">
                {registrationStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                <Button 
                  onClick={nextStep}
                  className="ml-auto bg-green-600 hover:bg-green-700"
                  disabled={
                    (registrationStep === 1 && (!formData.name || !formData.phone || !formData.state)) ||
                    (registrationStep === 2 && !formData.aadhaar) ||
                    (registrationStep === 3 && (!formData.bankAccount || !formData.ifsc))
                  }
                >
                  {registrationStep === 3 ? 'Complete Registration' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-green-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Welcome, {formData.name || 'Farmer'}</h1>
              <p className="text-green-100 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {formData.village}, {formData.district}
                {verificationStatus === 'verified' && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100">Farm Size</p>
            <p className="font-semibold">{formData.farmSize} acres</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="schemes">Gov. Schemes</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="kisanbot">KisanBot</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <FarmerDashboard setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="marketplace">
            <FarmerMarketplace setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="storage">
            <FarmerStorage setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="schemes">
            <GovernmentSchemes formData={formData} />
          </TabsContent>

          <TabsContent value="logistics">
            <FarmerLogistics setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="community">
            <CommunityForum setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="kisanbot">
            <KisanBotIntegration userType="farmer" userLocation={`${formData.village}, ${formData.district}`} />
          </TabsContent>

          <TabsContent value="profile">
            <FarmerProfile formData={formData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showModal && (
        <FarmerModals 
          modal={showModal} 
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  );
}

// Sub-components for different sections
function FarmerDashboard({ setShowModal }: { setShowModal: (modal: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-600">Active Listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">₹45,000</p>
            <p className="text-sm text-gray-600">This Month Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Store className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-600">Items in Storage</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-600">Pending Orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Weather Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">🌧️ Heavy Rainfall Alert</h3>
              <p className="text-red-700">Expected in next 24-48 hours. Secure your crops and check storage facilities.</p>
              <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                View Flood Relief Schemes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowModal('sell-crop')}>
          <CardContent className="p-6 text-center">
            <Package className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold">List Crop for Sale</h3>
            <p className="text-sm text-gray-600 mt-2">Add new crops to marketplace</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowModal('storage-booking')}>
          <CardContent className="p-6 text-center">
            <Store className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold">Book Storage</h3>
            <p className="text-sm text-gray-600 mt-2">Reserve warehouse space</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowModal('damage-report')}>
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold">Report Damage</h3>
            <p className="text-sm text-gray-600 mt-2">File crop damage claim</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FarmerMarketplace({ setShowModal }: { setShowModal: (modal: string) => void }) {
  const myListings = [
    { id: 1, crop: 'Wheat', quantity: '50 Quintal', price: '₹2,200/Quintal', status: 'Active', inquiries: 3 },
    { id: 2, crop: 'Rice', quantity: '30 Quintal', price: '₹2,800/Quintal', status: 'Sold', inquiries: 0 },
    { id: 3, crop: 'Cotton', quantity: '20 Quintal', price: '₹5,500/Quintal', status: 'Active', inquiries: 7 }
  ];

  const buyerRequests = [
    { id: 1, buyer: 'AgriCorp Ltd', crop: 'Wheat', quantity: '100 Quintal', offering: '₹2,300/Quintal', urgency: 'High' },
    { id: 2, buyer: 'Farm Fresh Co', crop: 'Rice', quantity: '50 Quintal', offering: '₹2,900/Quintal', urgency: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Marketplace</h2>
        <Button onClick={() => setShowModal('sell-crop')} className="bg-green-600 hover:bg-green-700">
          <Package className="w-4 h-4 mr-2" />
          List New Crop
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Listings */}
        <Card>
          <CardHeader>
            <CardTitle>My Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myListings.map(listing => (
                <div key={listing.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{listing.crop}</h4>
                    <p className="text-sm text-gray-600">{listing.quantity} • {listing.price}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={listing.status === 'Active' ? 'default' : 'secondary'}>
                      {listing.status}
                    </Badge>
                    {listing.inquiries > 0 && (
                      <p className="text-sm text-blue-600">{listing.inquiries} inquiries</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buyer Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Buyer Requests for Your Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {buyerRequests.map(request => (
                <div key={request.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{request.buyer}</h4>
                    <Badge variant={request.urgency === 'High' ? 'destructive' : 'secondary'}>
                      {request.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{request.crop} • {request.quantity}</p>
                  <p className="text-sm font-semibold text-green-600">Offering: {request.offering}</p>
                  <Button size="sm" className="mt-2">Contact Buyer</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FarmerStorage({ setShowModal }: { setShowModal: (modal: string) => void }) {
  const storageOptions = [
    { 
      id: 1, 
      name: 'Village Cold Storage', 
      type: 'Cold Storage', 
      capacity: '500 Quintal', 
      price: '₹5/day per bag',
      distance: '2 km',
      contact: '9876543210',
      available: true
    },
    { 
      id: 2, 
      name: 'District Warehouse', 
      type: 'Warehouse', 
      capacity: '2000 Quintal', 
      price: '₹3/day per bag',
      distance: '15 km',
      contact: '9876543211',
      available: true
    },
    { 
      id: 3, 
      name: 'FCI Godown', 
      type: 'Government', 
      capacity: '5000 Quintal', 
      price: '₹2/day per bag',
      distance: '25 km',
      contact: '9876543212',
      available: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Storage Solutions</h2>
        <Button onClick={() => setShowModal('storage-booking')} className="bg-purple-600 hover:bg-purple-700">
          <Store className="w-4 h-4 mr-2" />
          Book Storage
        </Button>
      </div>

      <div className="grid gap-4">
        {storageOptions.map(storage => (
          <Card key={storage.id} className={`${!storage.available ? 'opacity-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{storage.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-gray-600">Type: <span className="font-medium">{storage.type}</span></p>
                      <p className="text-gray-600">Capacity: <span className="font-medium">{storage.capacity}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price: <span className="font-medium">{storage.price}</span></p>
                      <p className="text-gray-600">Distance: <span className="font-medium">{storage.distance}</span></p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge variant={storage.available ? 'default' : 'secondary'}>
                    {storage.available ? 'Available' : 'Full'}
                  </Badge>
                  {storage.available && (
                    <>
                      <br />
                      <Button size="sm">Book Now</Button>
                      <br />
                      <a href={`tel:${storage.contact}`} className="text-sm text-blue-600">
                        📞 {storage.contact}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Storage */}
      <Card>
        <CardHeader>
          <CardTitle>My Current Storage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold">Wheat - 20 Quintal</h4>
                <p className="text-sm text-gray-600">Village Cold Storage • Expires: 15 days</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">₹100/day</p>
                <Button size="sm" variant="outline">Extend</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GovernmentSchemes({ formData }: { formData: any }) {
  const schemes = [
    {
      id: 1,
      name: 'PM-Kisan Samman Nidhi',
      category: 'Financial Support',
      benefit: '₹6,000/year direct cash',
      eligibility: 'All farmers with valid Aadhaar',
      status: 'Eligible',
      priority: false
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'Crop Insurance',
      benefit: 'Crop loss protection',
      eligibility: 'Farmers growing notified crops',
      status: 'Apply Now',
      priority: false
    },
    {
      id: 3,
      name: 'State Disaster Response Fund',
      category: 'Disaster Relief',
      benefit: 'Emergency flood compensation',
      eligibility: 'Flood-affected farmers',
      status: 'Priority',
      priority: true
    },
    {
      id: 4,
      name: 'Kisan Credit Card',
      category: 'Credit',
      benefit: 'Low-interest farm loans',
      eligibility: 'KYC verified farmers',
      status: 'Eligible',
      priority: false
    }
  ];

  const prioritySchemes = schemes.filter(s => s.priority);
  const regularSchemes = schemes.filter(s => !s.priority);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Government Schemes</h2>

      {/* Priority Schemes */}
      {prioritySchemes.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">🚨 Priority Schemes (Due to Weather Alert)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prioritySchemes.map(scheme => (
                <div key={scheme.id} className="p-4 bg-white rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{scheme.name}</h3>
                      <p className="text-gray-600">{scheme.benefit}</p>
                      <p className="text-sm text-gray-500 mt-1">Eligibility: {scheme.eligibility}</p>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regular Schemes */}
      <div className="grid gap-4">
        {regularSchemes.map(scheme => (
          <Card key={scheme.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{scheme.name}</h3>
                    <Badge variant="outline">{scheme.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{scheme.benefit}</p>
                  <p className="text-sm text-gray-500">Eligibility: {scheme.eligibility}</p>
                </div>
                <div className="text-right">
                  <Badge variant={scheme.status === 'Eligible' ? 'default' : 'secondary'}>
                    {scheme.status}
                  </Badge>
                  <br />
                  <Button size="sm" className="mt-2" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FarmerLogistics({ setShowModal }: { setShowModal: (modal: string) => void }) {
  const transportOptions = [
    { id: 1, provider: 'Rural Transport Co', vehicle: 'Truck (5 Ton)', price: '₹15/km', rating: 4.5, contact: '9876543213' },
    { id: 2, provider: 'Farm Logistics', vehicle: 'Mini Truck (2 Ton)', price: '₹12/km', rating: 4.2, contact: '9876543214' },
    { id: 3, provider: 'Agri Express', vehicle: 'Tempo (1 Ton)', price: '₹8/km', rating: 4.0, contact: '9876543215' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Logistics & Transport</h2>
        <Button onClick={() => setShowModal('book-transport')} className="bg-orange-600 hover:bg-orange-700">
          <Truck className="w-4 h-4 mr-2" />
          Book Transport
        </Button>
      </div>

      <div className="grid gap-4">
        {transportOptions.map(option => (
          <Card key={option.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{option.provider}</h3>
                  <p className="text-gray-600">{option.vehicle}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="font-medium text-green-600">{option.price}</span>
                    <span className="flex items-center gap-1">
                      ⭐ {option.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Button size="sm">Book Now</Button>
                  <br />
                  <a href={`tel:${option.contact}`} className="text-sm text-blue-600">
                    📞 Call
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>My Transport Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold">Wheat Transport to Mandi</h4>
                <p className="text-sm text-gray-600">Rural Transport Co • Tomorrow 10:00 AM</p>
              </div>
              <div className="text-right">
                <Badge>Confirmed</Badge>
                <p className="text-sm text-gray-600 mt-1">₹450 (30 km)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Community Forum Component
function CommunityForum({ setShowModal }: { setShowModal: (modal: string) => void }) {
  const [newQuestion, setNewQuestion] = useState('');
  
  const forumPosts = [
    {
      id: 1,
      user: 'Ramesh Patel',
      location: 'Indore, MP',
      question: 'Best time to harvest wheat in current weather?',
      answers: 5,
      likes: 12,
      time: '2 hours ago',
      category: 'Crop Management',
      isAnswered: true
    },
    {
      id: 2,
      user: 'Sunita Devi',
      location: 'Bhopal, MP',
      question: 'How to apply for flood damage compensation online?',
      answers: 8,
      likes: 23,
      time: '4 hours ago',
      category: 'Government Schemes',
      isAnswered: true
    },
    {
      id: 3,
      user: 'Vikram Singh',
      location: 'Khandwa, MP',
      question: 'Storage facility recommendations for soybean?',
      answers: 3,
      likes: 7,
      time: '6 hours ago',
      category: 'Storage',
      isAnswered: false
    }
  ];

  const categories = ['All', 'Crop Management', 'Government Schemes', 'Market Prices', 'Storage', 'Weather'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Forum</h2>
        <Button onClick={() => setShowModal('post-question')} className="bg-green-600 hover:bg-green-700">
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Quick Post */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <Textarea
                placeholder="Ask the community a question about farming, schemes, or market prices..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                rows={2}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  {categories.slice(1, 4).map(cat => (
                    <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-green-100">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" disabled={!newQuestion.trim()}>
                  <Send className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {forumPosts.map(post => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{post.user}</h4>
                    <p className="text-sm text-gray-600">{post.location} • {post.time}</p>
                  </div>
                </div>
                <Badge variant={post.isAnswered ? 'default' : 'secondary'}>
                  {post.category}
                </Badge>
              </div>

              <h3 className="text-lg font-medium mb-3">{post.question}</h3>

              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {post.answers} answers
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {post.likes} helpful
                  </span>
                </div>
                <Button size="sm" variant="outline">
                  View Discussion
                </Button>
              </div>

              {post.isAnswered && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ This question has been answered by the community
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// KisanBot Integration Component
import KisanBot from './KisanBot';
function KisanBotIntegration({ userType, userLocation }: { userType: 'farmer' | 'buyer'; userLocation: string }) {
  const [showChat, setShowChat] = React.useState(false);
  return showChat ? (
    <KisanBot
      onBack={() => setShowChat(false)}
      userType={userType}
      userLocation={userLocation}
    />
  ) : (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">KisanBot - Your AI Assistant</h2>
        <p className="text-gray-600">Get instant help with farming, market prices, and government schemes</p>
      </div>
      {/* Key Features */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">🌾 Crop Management</h3>
            <p className="text-sm text-gray-700">Get advice on crop selection, planting seasons, and best practices for your region</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">👨‍🌾 Process Produce</h3>
            <p className="text-sm text-gray-700">Farmers → What can I do with my produce?

                <h3>Merchants → What should I buy, how to process for profit?</h3> </p>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">💰 Government Schemes</h3>
            <p className="text-sm text-gray-700">See available subsidies, eligibility criteria, and application process</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">📈 Market Prices</h3>
            <p className="text-sm text-gray-700">Get real-time commodity prices and selling recommendations for better profits</p>
          </CardContent>
        </Card>
      </div>
      {/* Recent Conversations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Weather forecast for wheat harvest</p>
                  <p className="text-sm text-gray-600">Asked about best time to harvest wheat in current weather conditions</p>
                </div>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Government schemes for flood relief</p>
                  <p className="text-sm text-gray-600">Information about SDRF and crop insurance claims</p>
                </div>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Start Chat Button */}
      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" onClick={() => setShowChat(true)}>
          <Bot className="w-5 h-5 mr-2" />
          Start Chat with KisanBot
        </Button>
        <p className="text-sm text-gray-600 mt-2">Available 24/7 in Hindi, English, and regional languages</p>
      </div>
    </div>
  );
}

function FarmerProfile({ formData }: { formData: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <Label>Mobile Number</Label>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <Label>State</Label>
              <p className="font-medium">{formData.state}</p>
            </div>
            <div>
              <Label>District</Label>
              <p className="font-medium">{formData.district}</p>
            </div>
            <div>
              <Label>Village</Label>
              <p className="font-medium">{formData.village}</p>
            </div>
            <div>
              <Label>Farm Size</Label>
              <p className="font-medium">{formData.farmSize} acres</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code for Traceability */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            Farm Traceability QR Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-white border-2 border-blue-300 rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Share Your Farm Details</h4>
              <p className="text-sm text-gray-700 mb-3">
                Buyers can scan this QR code to see:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Farm location and certification</li>
                <li>• Farming practices and methods</li>
                <li>• Crop history and quality records</li>
                <li>• Verification status and ratings</li>
              </ul>
              <Button size="sm" className="mt-3" variant="outline">
                Download QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>KYC Verification</span>
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Bank Account</span>
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Land Documents</span>
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Farmer Ratings & Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Buyer Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold">4.8</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">23 reviews</p>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Quality:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-sm">4.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Delivery:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm">4.6</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Communication:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-sm">4.8</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">AgriCorp Ltd</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
              <p className="text-sm text-gray-700">
                "Excellent quality wheat. Well-cleaned and properly stored. Will definitely order again."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FarmerModals({ modal, onClose }: { modal: string; onClose: () => void }) {
  return (
    <Dialog open={!!modal} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {modal === 'sell-crop' && 'List Crop for Sale'}
            {modal === 'storage-booking' && 'Book Storage'}
            {modal === 'damage-report' && 'Report Crop Damage'}
            {modal === 'book-transport' && 'Book Transport'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {modal === 'sell-crop' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Crop Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input placeholder="Enter quantity" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price per Unit</Label>
                  <Input placeholder="₹ per quintal" />
                </div>
                <div>
                  <Label>Quality Grade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Additional details about your crop..." />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                List Crop for Sale
              </Button>
            </>
          )}

          {modal === 'storage-booking' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Storage Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold">Cold Storage</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="government">Government Godown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration (days)</Label>
                  <Input placeholder="Number of days" type="number" />
                </div>
              </div>
              <div>
                <Label>Crop Details</Label>
                <Input placeholder="Crop type and quantity" />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Book Storage
              </Button>
            </>
          )}

          {modal === 'damage-report' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Damage Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select damage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="drought">Drought</SelectItem>
                      <SelectItem value="pest">Pest Attack</SelectItem>
                      <SelectItem value="hail">Hailstorm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Damage Percentage</Label>
                  <Input placeholder="% of crop damaged" type="number" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe the damage..." />
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload damage photos</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Take Photos
                </Button>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Submit Damage Report
              </Button>
            </>
          )}

          {modal === 'book-transport' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From Location</Label>
                  <Input placeholder="Pickup location" />
                </div>
                <div>
                  <Label>To Location</Label>
                  <Input placeholder="Delivery location" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vehicle Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">Truck (5 Ton)</SelectItem>
                      <SelectItem value="mini-truck">Mini Truck (2 Ton)</SelectItem>
                      <SelectItem value="tempo">Tempo (1 Ton)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pickup Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Cargo Details</Label>
                <Textarea placeholder="Describe what you're transporting..." />
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Book Transport
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}