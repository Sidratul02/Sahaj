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
import { ArrowLeft, Search, Filter, Bookmark, ShoppingCart, Truck, Star, MapPin, Clock, CheckCircle, AlertCircle, Package, CreditCard, Smartphone, Upload, Camera, Bot, TrendingUp, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BuyerAppProps {
  onBack: () => void;
}

export default function BuyerApp({ onBack }: BuyerAppProps) {
  const [currentStep, setCurrentStep] = useState<'registration' | 'dashboard'>('registration');
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    businessType: '',
    state: '',
    district: '',
    address: '',
    aadhaar: '',
    gst: '',
    businessLicense: null,
    bankAccount: '',
    ifsc: '',
    upiId: ''
  });
  const [showModal, setShowModal] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    crop: '',
    location: '',
    freshness: '',
    priceRange: ''
  });

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
        <div className="bg-blue-600 text-white p-4">
          <div className="max-w-2xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Buyer Registration</h1>
              <p className="text-blue-100">Step {registrationStep} of 3</p>
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
                {registrationStep === 1 && "Business Information"}
                {registrationStep === 2 && "KYC Verification"}
                {registrationStep === 3 && "Payment Setup"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {registrationStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name / Contact Person</Label>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company/Business Name</Label>
                      <Input 
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <Label>Business Type</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="processor">Food Processor</SelectItem>
                          <SelectItem value="exporter">Exporter</SelectItem>
                          <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                          <SelectItem value="individual">Individual Buyer</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="address">Business Address</Label>
                      <Input 
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Complete address"
                      />
                    </div>
                  </div>
                </>
              )}

              {registrationStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">📋 KYC Verification for Buyers</h3>
                      <p className="text-sm text-blue-700">
                        KYC verification ensures trust and enables secure transactions with farmers.
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
                      <Label htmlFor="gst">GST Number (Optional)</Label>
                      <Input 
                        id="gst"
                        value={formData.gst}
                        onChange={(e) => handleInputChange('gst', e.target.value)}
                        placeholder="GST number if applicable"
                      />
                    </div>

                    <div>
                      <Label>Business License/Registration</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Upload business registration documents</p>
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">✅ Verified Buyer Benefits</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Direct contact with verified farmers</li>
                        <li>• Priority access to fresh produce</li>
                        <li>• Bulk order discounts</li>
                        <li>• Credit terms availability</li>
                        <li>• Quality assurance guarantee</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {registrationStep === 3 && (
                <>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">💳 Payment Setup</h3>
                      <p className="text-sm text-green-700">
                        Setup your payment methods for seamless transactions.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="bankAccount">Bank Account Number</Label>
                      <Input 
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                        placeholder="Account number for refunds"
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

                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        placeholder="your-upi@paytm (for quick payments)"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">💰 Payment Options</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                          <span>UPI Instant Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>Bank Transfer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <span>Cash on Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>Escrow Protection</span>
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
                  className="ml-auto bg-blue-600 hover:bg-blue-700"
                  disabled={
                    (registrationStep === 1 && (!formData.name || !formData.phone || !formData.company)) ||
                    (registrationStep === 2 && !formData.aadhaar) ||
                    (registrationStep === 3 && (!formData.bankAccount || !formData.upiId))
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
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Welcome, {formData.name || 'Buyer'}</h1>
              <p className="text-blue-100 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {formData.company} • {formData.district}
                <Badge className="bg-blue-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Business Type</p>
            <p className="font-semibold">{formData.businessType || 'Retailer'}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="enquiry">Post Requirement</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="kisanbot">KisanBot</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <BuyerMarketplace 
              setShowModal={setShowModal} 
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </TabsContent>

          <TabsContent value="enquiry">
            <BuyerEnquiry setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="orders">
            <BuyerOrders setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="transport">
            <BuyerTransport setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="watchlist">
            <BuyerWatchlist setShowModal={setShowModal} />
          </TabsContent>

          <TabsContent value="kisanbot">
            <BuyerKisanBotIntegration userType="buyer" userLocation={`${formData.district}, ${formData.state}`} />
          </TabsContent>

          <TabsContent value="profile">
            <BuyerProfile formData={formData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showModal && (
        <BuyerModals 
          modal={showModal} 
          onClose={() => setShowModal(null)}
          formData={formData}
        />
      )}
    </div>
  );
}

// Buyer Marketplace Component
function BuyerMarketplace({ setShowModal, selectedFilters, setSelectedFilters }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const listings = [
    {
      id: 1,
      crop: 'Wheat',
      farmer: 'Rajesh Kumar',
      location: 'Khandwa, MP',
      quantity: '50 Quintal',
      price: '₹2,200/Quintal',
      freshness: 'Fresh (3 days)',
      freshnessColor: 'green',
      priceIndicator: 'Excellent',
      priceColor: 'green',
      distance: '15 km',
      verified: true,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b'
    },
    {
      id: 2,
      crop: 'Rice',
      farmer: 'Priya Sharma',
      location: 'Indore, MP',
      quantity: '30 Quintal',
      price: '₹2,800/Quintal',
      freshness: 'Moderate (8 days)',
      freshnessColor: 'yellow',
      priceIndicator: 'Good',
      priceColor: 'yellow',
      distance: '45 km',
      verified: true,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6'
    },
    {
      id: 3,
      crop: 'Tomatoes',
      farmer: 'Suresh Patel',
      location: 'Bhopal, MP',
      quantity: '2 Ton',
      price: '₹25/kg',
      freshness: 'Aging (15 days)',
      freshnessColor: 'red',
      priceIndicator: 'High',
      priceColor: 'red',
      distance: '85 km',
      verified: true,
      special: 'Limited Time - 20% Discount',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea'
    }
  ];

  const getFreshnessColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriceColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search crops by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowModal('advanced-filters')} variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              All Crops
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-green-500 hover:text-white">
              Fresh (0-7 days)
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-500 hover:text-white">
              Within 50km
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-purple-500 hover:text-white">
              Bulk Orders
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Featured Fresh Produce */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            🌱 Featured Fresh Produce
            <Badge className="bg-green-500">Updated 2 hours ago</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {listings.filter(l => l.freshnessColor === 'green').map(listing => (
              <div key={listing.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{listing.crop}</h4>
                  <Badge className={getFreshnessColor(listing.freshnessColor)}>
                    {listing.freshness}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{listing.quantity} • {listing.farmer}</p>
                <p className={`font-semibold ${getPriceColor(listing.priceColor)}`}>{listing.price}</p>
                <Button size="sm" className="mt-2 w-full">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Listings */}
      <div className="grid gap-4">
        {listings.map(listing => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={listing.image}
                    alt={listing.crop}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{listing.crop}</h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        {listing.farmer}
                        {listing.verified && (
                          <Badge className="bg-blue-500 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium">{listing.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">{listing.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Freshness</p>
                      <Badge className={getFreshnessColor(listing.freshnessColor)}>
                        {listing.freshness}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-500">Distance</p>
                      <p className="font-medium">{listing.distance}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-2xl font-bold ${getPriceColor(listing.priceColor)}`}>
                        {listing.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        🟢 {listing.priceIndicator} Price
                      </p>
                      {listing.special && (
                        <p className="text-sm text-orange-600 font-medium">
                          🔥 {listing.special}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        📞 Call
                      </Button>
                      <Button size="sm" variant="outline">
                        💬 WhatsApp
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowModal('product-details')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Buyer Enquiry Component
function BuyerEnquiry({ setShowModal }: any) {
  const [enquiryData, setEnquiryData] = useState({
    crop: '',
    variety: '',
    quantity: '',
    unit: 'quintal',
    maxPrice: '',
    location: '',
    requiredBy: '',
    urgency: 'normal',
    qualityRequirements: '',
    additionalRequirements: ''
  });

  const activeEnquiries = [
    {
      id: 1,
      crop: 'Wheat',
      quantity: '100 Quintal',
      maxPrice: '₹2,300/Quintal',
      requiredBy: '2024-02-15',
      responses: 5,
      status: 'Active',
      urgency: 'High'
    },
    {
      id: 2,
      crop: 'Rice',
      quantity: '50 Quintal',
      maxPrice: '₹2,900/Quintal',
      requiredBy: '2024-02-20',
      responses: 2,
      status: 'Active',
      urgency: 'Normal'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Post Your Crop Requirements</h2>
        <Button onClick={() => setShowModal('post-enquiry')} className="bg-blue-600 hover:bg-blue-700">
          📋 Post New Requirement
        </Button>
      </div>

      {/* Quick Requirement Form */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Requirement Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
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
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="onions">Onions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity Needed</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter quantity" className="flex-1" />
                <Select defaultValue="quintal">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">KG</SelectItem>
                    <SelectItem value="quintal">Quintal</SelectItem>
                    <SelectItem value="ton">Ton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Max Price per Unit</Label>
              <Input placeholder="₹ per unit" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Preferred Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="khandwa">Khandwa</SelectItem>
                  <SelectItem value="indore">Indore</SelectItem>
                  <SelectItem value="bhopal">Bhopal</SelectItem>
                  <SelectItem value="dewas">Dewas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Required By Date</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Urgency Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Quality Requirements</Label>
            <Textarea placeholder="Specify quality standards, grade requirements, certifications needed..." />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Post Requirement
          </Button>
        </CardContent>
      </Card>

      {/* Active Enquiries */}
      <Card>
        <CardHeader>
          <CardTitle>My Active Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeEnquiries.map(enquiry => (
              <div key={enquiry.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{enquiry.crop}</h4>
                    <p className="text-gray-600">{enquiry.quantity} • Max: {enquiry.maxPrice}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={enquiry.urgency === 'High' ? 'destructive' : 'secondary'}>
                      {enquiry.urgency}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">Due: {enquiry.requiredBy}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-blue-600">
                    {enquiry.responses} farmer responses
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm">View Responses</Button>
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

// Buyer Orders Component with Tracking
function BuyerOrders({ setShowModal }: any) {
  const orders = [
    {
      id: 'ORD001',
      crop: 'Wheat',
      farmer: 'Rajesh Kumar',
      quantity: '20 Quintal',
      amount: '₹44,000',
      status: 'In Transit',
      stage: 3,
      trackingCode: 'TRK001ABC',
      estimatedDelivery: '2024-01-25',
      stages: [
        { name: 'Order Confirmed', completed: true, date: '2024-01-20' },
        { name: 'Picked from Farm', completed: true, date: '2024-01-21' },
        { name: 'In Storage', completed: true, date: '2024-01-22' },
        { name: 'Out for Delivery', completed: false, date: '' },
        { name: 'Delivered', completed: false, date: '' }
      ]
    },
    {
      id: 'ORD002',
      crop: 'Rice',
      farmer: 'Priya Sharma',
      quantity: '15 Quintal',
      amount: '₹42,000',
      status: 'Delivered',
      stage: 5,
      trackingCode: 'TRK002XYZ',
      estimatedDelivery: '2024-01-18',
      stages: [
        { name: 'Order Confirmed', completed: true, date: '2024-01-15' },
        { name: 'Picked from Farm', completed: true, date: '2024-01-16' },
        { name: 'In Storage', completed: true, date: '2024-01-16' },
        { name: 'Out for Delivery', completed: true, date: '2024-01-17' },
        { name: 'Delivered', completed: true, date: '2024-01-18' }
      ],
      canReview: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Orders & Tracking</h2>

      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">{order.crop} from {order.farmer}</p>
                  <p className="text-sm text-gray-500">Tracking: {order.trackingCode}</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <p className="text-lg font-semibold mt-1">{order.amount}</p>
                  <p className="text-sm text-gray-500">{order.quantity}</p>
                </div>
              </div>

              {/* Tracking Progress */}
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Order Tracking</h4>
                <div className="relative">
                  {order.stages.map((stage, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        stage.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-white border-gray-300'
                      }`}>
                        {stage.completed && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className={`font-medium ${
                          stage.completed ? 'text-green-800' : 'text-gray-500'
                        }`}>
                          {stage.name}
                        </p>
                        {stage.date && (
                          <p className="text-sm text-gray-400">{stage.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {order.status === 'Delivered' 
                    ? `Delivered on ${order.estimatedDelivery}`
                    : `Expected delivery: ${order.estimatedDelivery}`
                  }
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    📞 Contact Farmer
                  </Button>
                  {order.canReview && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setShowModal('write-review')}
                    >
                      ⭐ Write Review
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    onClick={() => setShowModal('track-order')}
                  >
                    🔍 Track Live
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

// Buyer Transport Component
function BuyerTransport({ setShowModal }: any) {
  const transportOptions = [
    {
      id: 1,
      provider: 'FarmLogistics Pro',
      vehicleType: 'Refrigerated Truck (5 Ton)',
      price: '₹18/km',
      rating: 4.8,
      contact: '9876543220',
      specialFeatures: ['Temperature Control', 'Real-time Tracking', 'Insurance Covered'],
      available: true
    },
    {
      id: 2,
      provider: 'Agri Transport Co',
      vehicleType: 'Open Truck (8 Ton)',
      price: '₹15/km',
      rating: 4.5,
      contact: '9876543221',
      specialFeatures: ['GPS Tracking', 'Quick Loading', 'Bulk Capacity'],
      available: true
    },
    {
      id: 3,
      provider: 'Village Movers',
      vehicleType: 'Mini Truck (2 Ton)',
      price: '₹12/km',
      rating: 4.2,
      contact: '9876543222',
      specialFeatures: ['Local Knowledge', 'Flexible Timing', 'Budget Friendly'],
      available: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transportation Services</h2>
        <Button onClick={() => setShowModal('book-transport')} className="bg-orange-600 hover:bg-orange-700">
          <Truck className="w-4 h-4 mr-2" />
          Book Transport
        </Button>
      </div>

      {/* Transport Options */}
      <div className="grid gap-4">
        {transportOptions.map(option => (
          <Card key={option.id} className={`${!option.available ? 'opacity-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{option.provider}</h3>
                  <p className="text-gray-600">{option.vehicleType}</p>
                  
                  <div className="flex items-center gap-4 mt-2 mb-3">
                    <span className="font-semibold text-green-600">{option.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{option.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {option.specialFeatures.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <Badge variant={option.available ? 'default' : 'secondary'}>
                    {option.available ? 'Available' : 'Busy'}
                  </Badge>
                  {option.available && (
                    <>
                      <br />
                      <Button size="sm">Book Now</Button>
                      <br />
                      <a href={`tel:${option.contact}`} className="text-sm text-blue-600">
                        📞 {option.contact}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transport Marketplace */}
      <Card>
        <CardHeader>
          <CardTitle>Transport Marketplace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Cold Storage to Wholesale Market</h4>
                  <p className="text-gray-600">Available: Temperature controlled transport</p>
                  <p className="text-sm text-gray-500">Distance: 45 km • Duration: 2 hours</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹810 Total</p>
                  <Button size="sm" className="mt-2">Book Route</Button>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Farm to Processing Unit</h4>
                  <p className="text-gray-600">Available: Bulk capacity truck</p>
                  <p className="text-sm text-gray-500">Distance: 75 km • Duration: 3 hours</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹1,125 Total</p>
                  <Button size="sm" className="mt-2">Book Route</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Buyer Watchlist Component
function BuyerWatchlist({ setShowModal }: any) {
  const watchlistItems = [
    {
      id: 1,
      crop: 'Wheat',
      farmer: 'Rajesh Kumar',
      savedOn: '2024-01-20',
      freshness: 'Fresh (5 days)',
      price: '₹2,200/Quintal',
      status: 'Available',
      expiryAlert: false
    },
    {
      id: 2,
      crop: 'Tomatoes',
      farmer: 'Suresh Patel',
      savedOn: '2024-01-18',
      freshness: 'Aging (17 days)',
      price: '₹20/kg',
      status: 'Limited Stock',
      expiryAlert: true
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Watchlist</h2>

      <div className="space-y-4">
        {watchlistItems.map(item => (
          <Card key={item.id} className={item.expiryAlert ? 'border-red-200 bg-red-50' : ''}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{item.crop}</h3>
                  <p className="text-gray-600">by {item.farmer}</p>
                  <p className="text-sm text-gray-500">Saved on {item.savedOn}</p>
                  
                  {item.expiryAlert && (
                    <div className="mt-2 p-2 bg-red-100 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">
                        ⚠️ This item is aging - arrange pickup soon!
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold">{item.price}</p>
                  <Badge variant={item.expiryAlert ? 'destructive' : 'default'}>
                    {item.freshness}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">{item.status}</p>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                    <Button size="sm">
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Buyer Profile Component
function BuyerProfile({ formData }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact Person</Label>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <Label>Mobile Number</Label>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <Label>Company Name</Label>
              <p className="font-medium">{formData.company}</p>
            </div>
            <div>
              <Label>Business Type</Label>
              <p className="font-medium">{formData.businessType}</p>
            </div>
            <div>
              <Label>State</Label>
              <p className="font-medium">{formData.state}</p>
            </div>
            <div>
              <Label>District</Label>
              <p className="font-medium">{formData.district}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification & Payment Status</CardTitle>
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
              <span>UPI Payment Setup</span>
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Bank Account</span>
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold">₹2.4L</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.8⭐</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Buyer KisanBot Integration Component
function BuyerKisanBotIntegration({ userType, userLocation }: { userType: 'farmer' | 'buyer'; userLocation: string }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">KisanBot - Your Marketplace Assistant</h2>
        <p className="text-gray-600">Get instant help with finding fresh produce, market trends, and farmer connections</p>
      </div>

      {/* Key Features for Buyers */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Process Produce</h3>
            <p className="text-sm text-gray-700">Find the freshest crops near you with quality recommendations and farmer verification</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">👨‍🌾 Farmer Connections</h3>
            <p className="text-sm text-gray-700">Farmers → What can I do with my produce?
</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">📊 Market Intelligence</h3>
            <p className="text-sm text-gray-700">Real-time price trends, quality analysis, and best buying recommendations</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <Truck className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">🚚 Logistics Support</h3>
            <p className="text-sm text-gray-700">Transportation options, delivery tracking, and logistics optimization</p>
          </CardContent>
        </Card>
      </div>

      {/* Sample Conversations */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Questions You Can Ask</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Quality & Freshness</h4>
              <div className="space-y-2 text-sm">
                <p className="p-2 bg-blue-50 rounded">"Show me fresh vegetables harvested in last 3 days"</p>
                <p className="p-2 bg-blue-50 rounded">"How do I check tomato quality?"</p>
                <p className="p-2 bg-blue-50 rounded">"Which farmers have organic certification?"</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Market & Pricing</h4>
              <div className="space-y-2 text-sm">
                <p className="p-2 bg-green-50 rounded">"Current wheat prices in my area"</p>
                <p className="p-2 bg-green-50 rounded">"Price forecast for next month"</p>
                <p className="p-2 bg-green-50 rounded">"Best time to buy seasonal fruits"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Chat Button */}
      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
          <Bot className="w-5 h-5 mr-2" />
          Chat with KisanBot Now
        </Button>
        <p className="text-sm text-gray-600 mt-2">Get instant responses • Available in multiple languages</p>
      </div>
    </div>
  );
}

// Buyer Modals Component
function BuyerModals({ modal, onClose, formData }: any) {
  return (
    <Dialog open={!!modal} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {modal === 'product-details' && 'Product Details & Contact'}
            {modal === 'write-review' && 'Write Product Review'}
            {modal === 'track-order' && 'Live Order Tracking'}
            {modal === 'advanced-filters' && 'Advanced Search Filters'}
            {modal === 'post-enquiry' && 'Post Detailed Requirement'}
            {modal === 'book-transport' && 'Book Transportation'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {modal === 'product-details' && (
            <div className="space-y-6">
              {/* Product Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b"
                    alt="Wheat"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Premium Wheat</h3>
                  <p className="text-gray-600 mb-4">Available Quantity: 50 Quintal</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">📅 Freshness Information</h4>
                      <p><strong>Harvest Date:</strong> January 17, 2024</p>
                      <p><strong>Days Since Harvest:</strong> 3 days</p>
                      <p><strong>Best Before:</strong> March 17, 2024</p>
                      <p><strong>Storage Condition:</strong> Proper dry storage, covered</p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">💰 Price Analysis</h4>
                      <p><strong>Your Price:</strong> ₹2,200 per Quintal</p>
                      <p><strong>Market Rate:</strong> ₹2,400 per Quintal</p>
                      <p className="text-green-600 font-medium">🟢 Excellent Price (8% below market)</p>
                      <p><strong>Total Value:</strong> ₹1,10,000 (50 Quintal)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">Rajesh Kumar</h4>
                      <p className="text-gray-600">📍 Village Khargone, Khandwa, MP</p>
                      <p className="text-sm text-gray-500">Listed on January 20, 2024</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Seller
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>4.8 (23 reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Actions */}
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">📞 Direct Contact Options</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Phone className="w-4 h-4 mr-2" />
                      📞 Call Now
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600">
                      💬 WhatsApp
                    </Button>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h5 className="font-medium mb-2">💡 Contact Tips for Buyers:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Mention you found them on Sahaj marketplace</li>
                      <li>• Ask about pickup location and timing flexibility</li>
                      <li>• Confirm quality standards before traveling</li>
                      <li>• Negotiate pickup arrangements and transportation</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-2 bg-red-100 rounded border-l-4 border-red-500">
                    <p className="text-red-800 text-sm font-medium">
                      ⚠️ This crop is fresh but arrange pickup within 5 days for best quality!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {modal === 'write-review' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Rate Your Purchase</h3>
                <p className="text-gray-600">Rice from Priya Sharma</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Overall Rating</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className="w-8 h-8 text-yellow-500 fill-current cursor-pointer hover:scale-110"
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Quality Rating</Label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-current cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Delivery Rating</Label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-current cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Farmer Behavior</Label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-current cursor-pointer" />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Write Your Review</Label>
                  <Textarea 
                    placeholder="Share your experience about the product quality, delivery, and farmer interaction..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Upload Photos (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload photos of the received product</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Upload Photos
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Submit Review
                </Button>
              </div>
            </div>
          )}

          {modal === 'track-order' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Live Order Tracking</h3>
                <p className="text-gray-600">Order #ORD001 - Tracking Code: TRK001ABC</p>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Current Status</span>
                      <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Current Location</span>
                      <span className="font-medium">Dewas Highway, MP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Estimated Arrival</span>
                      <span className="font-medium">Tomorrow 2:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Delivery Progress</h4>
                  <div className="space-y-3">
                    {[
                      { step: 'Order Confirmed', completed: true, time: 'Jan 20, 10:00 AM' },
                      { step: 'Picked from Farm', completed: true, time: 'Jan 21, 8:00 AM' },
                      { step: 'Quality Check at Storage', completed: true, time: 'Jan 22, 2:00 PM' },
                      { step: 'Out for Delivery', completed: false, time: 'In Progress' },
                      { step: 'Delivered', completed: false, time: 'Pending' }
                    ].map((stage, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          stage.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'bg-white border-gray-300'
                        }`} />
                        <div className="ml-3 flex-1">
                          <p className={`font-medium ${
                            stage.completed ? 'text-green-800' : 'text-gray-500'
                          }`}>
                            {stage.step}
                          </p>
                          <p className="text-sm text-gray-400">{stage.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Delivery Verification</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    You will receive a unique delivery code when the order arrives. 
                    Share this code with the delivery partner to confirm receipt.
                  </p>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="font-semibold text-blue-800">Delivery Code: DLV-4589</p>
                    <p className="text-sm text-blue-600">Show this to delivery partner</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {modal === 'advanced-filters' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Crop Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grains">Grains & Cereals</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Specific Crop</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location Filter</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25km">Within 25 km</SelectItem>
                      <SelectItem value="50km">Within 50 km</SelectItem>
                      <SelectItem value="100km">Within 100 km</SelectItem>
                      <SelectItem value="state">Anywhere in state</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Freshness Filter</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select freshness" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresh">Fresh (0-7 days)</SelectItem>
                      <SelectItem value="moderate">Moderate (8-14 days)</SelectItem>
                      <SelectItem value="aging">Aging (15+ days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input placeholder="Min price" />
                  <Input placeholder="Max price" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Quantity</Label>
                  <Input placeholder="Min quantity needed" />
                </div>
                <div>
                  <Label>Sort By</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort results" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="freshness">Freshness</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </Button>
            </div>
          )}

          {modal === 'post-enquiry' && (
            <div className="space-y-4">
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
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Variety/Grade</Label>
                  <Input placeholder="Specify variety or grade" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Quantity Needed</Label>
                  <Input placeholder="Enter quantity" />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="quintal">Quintal</SelectItem>
                      <SelectItem value="ton">Ton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Price per Unit</Label>
                  <Input placeholder="₹ per unit" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Required By Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Urgency Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Quality Requirements</Label>
                <Textarea placeholder="Specify quality standards, certifications, grade requirements..." />
              </div>

              <div>
                <Label>Additional Requirements</Label>
                <Textarea placeholder="Packaging, transportation, payment terms, or other specific needs..." />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Post Detailed Requirement
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}