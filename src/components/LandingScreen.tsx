import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Globe, HelpCircle, Smartphone, TrendingUp, Shield, Truck, Crop, TruckIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Footer from './Footer';
import farmImage from '../../images/farm.jpg';

interface EmergencyContact {
  disaster: string;
  dm: string;
  agri: string;
  police: string;
}

interface StateEmergencyNumbers {
  disaster: string;
  dm: string;
  agri: string;
  districts: {
    [key: string]: EmergencyContact;
  };
}

interface EmergencyNumbers {
  [state: string]: StateEmergencyNumbers;
}

interface LandingScreenProps {
  onNavigate: (view: 'farmer' | 'buyer' | 'admin') => void;
}

export default function LandingScreen({ onNavigate }: LandingScreenProps) {
  const [language, setLanguage] = useState('english');
  const [showHelp, setShowHelp] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [emergencyType, setEmergencyType] = useState<'view' | 'request'>('view');

  const languages = {
    english: {
      appName: "SAHAJ",
      tagline: "Smart Agriculture Marketplace & Support",
      subtitle: "Connect. Trade. Store. Get Help.",
      farmer: "I am a Farmer",
      buyer: "I am a Buyer", 
      admin: "Admin Access",
      help: "Emergency Help",
      farmerDesc: "Sell crops, access storage, get government help",
      buyerDesc: "Buy fresh produce, track orders, arrange transport",
      adminDesc: "Manage platform, verify users, monitor activity"
    },
    hindi: {
      appName: "सहज",
      tagline: "स्मार्ट कृषि बाजार और सहायता",
      subtitle: "जुड़ें। व्यापार करें। भंडारण करें। मदद पाएं।",
      farmer: "मैं किसान हूं",
      buyer: "मैं खरीदार हूं",
      admin: "प्रशासक पहुंच",
      help: "आपातकालीन सहायता",
      farmerDesc: "फसल बेचें, भंडारण तक पहुंच, सरकारी मदद पाएं",
      buyerDesc: "ताजा उत्पाद खरीदें, ऑर्डर ट्रैक करें, परिवहन व्यवस्था करें",
      adminDesc: "प्लेटफॉर्म प्रबंधन, उपयोगकर्ता सत्यापन, गतिविधि निगरानी"
    },
    punjabi: {
      appName: "ਸਹਿਜ",
      tagline: "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰ ਅਤੇ ਸਹਾਇਤਾ",
      subtitle: "ਜੁੜੋ। ਵਪਾਰ ਕਰੋ। ਸਟੋਰ ਕਰੋ। ਮਦਦ ਲਓ।",
      farmer: "ਮੈਂ ਕਿਸਾਨ ਹਾਂ",
      buyer: "ਮੈਂ ਖਰੀਦਦਾਰ ਹਾਂ",
      admin: "ਪ੍ਰਸ਼ਾਸਕ ਪਹੁੰਚ",
      help: "ਐਮਰਜੈਂਸੀ ਮਦਦ",
      farmerDesc: "ਫਸਲ ਵੇਚੋ, ਭੰਡਾਰਣ ਤੱਕ ਪਹੁੰਚ, ਸਰਕਾਰੀ ਮਦਦ ਲਓ",
      buyerDesc: "ਤਾਜ਼ਾ ਉਤਪਾਦ ਖਰੀਦੋ, ਆਰਡਰ ਟਰੈਕ ਕਰੋ, ਢੋਆ-ਢੁਆਈ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ",
      adminDesc: "ਪਲੇਟਫਾਰਮ ਪ੍ਰਬੰਧਨ, ਉਪਭੋਗਤਾ ਸਤਿਆਪਨ, ਗਤੀਵਿਧੀ ਨਿਗਰਾਨੀ"
    },
    kannada: {
      appName: "ಸಹಜ",
      tagline: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಬೆಂಬಲ",
      subtitle: "ಸಂಪರ್ಕಿಸು. ವ್ಯಾಪಾರ ಮಾಡು. ಸಂಗ್ರಹಿಸು. ಸಹಾಯ ಪಡೆಯಿರಿ.",
      farmer: "ನಾನು ರೈತ",
      buyer: "ನಾನು ಖರೀದಿದಾರ",
      admin: "ನಿರ್ವಾಹಕ ಪ್ರವೇಶ",
      help: "ತುರ್ತು ಸಹಾಯ",
      farmerDesc: "ಬೆಳೆಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ, ಸಂಗ್ರಹಣೆ ಪ್ರವೇಶ, ಸರ್ಕಾರಿ ಸಹಾಯ ಪಡೆಯಿರಿ",
      buyerDesc: "ತಾಜಾ ಉತ್ಪಾದನೆಗಳನ್ನು ಖರೀದಿಸಿ, ಆರ್ಡರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ ಮಾಡಿ",
      adminDesc: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ನಿರ್ವಹಣೆ, ಬಳಕೆದಾರರ ಪರಿಶೀಲನೆ, ಚಟುವಟಿಕೆ ಮೇಲ್ವಿಚಾರಣೆ"
    }
  };

  const currentLang = languages[language as keyof typeof languages];

  const states = [
    "Madhya Pradesh", "Punjab", "Karnataka", "Uttar Pradesh", "Maharashtra", 
    "West Bengal", "Gujarat", "Rajasthan", "Andhra Pradesh", "Tamil Nadu"
  ];

  const emergencyNumbers: EmergencyNumbers = {
    "Madhya Pradesh": { 
      disaster: "1077", 
      dm: "07571-234567", 
      agri: "07571-234789",
      districts: {
        "Khandwa": { disaster: "1077", dm: "07571-234567", agri: "07571-234789", police: "100" },
        "Indore": { disaster: "1077", dm: "0731-2234567", agri: "0731-2234789", police: "100" },
        "Bhopal": { disaster: "1077", dm: "0755-2234567", agri: "0755-2234789", police: "100" },
        "Dewas": { disaster: "1077", dm: "07272-234567", agri: "07272-234789", police: "100" }
      }
    },
    "Punjab": { 
      disaster: "1077", 
      dm: "0161-2234567", 
      agri: "0161-2234789",
      districts: {
        "Ludhiana": { disaster: "1077", dm: "0161-2234567", agri: "0161-2234789", police: "100" },
        "Amritsar": { disaster: "1077", dm: "0183-2234567", agri: "0183-2234789", police: "100" }
      }
    },
    "Karnataka": { 
      disaster: "1077", 
      dm: "080-22345678", 
      agri: "080-22345679",
      districts: {
        "Bangalore": { disaster: "1077", dm: "080-22345678", agri: "080-22345679", police: "100" },
        "Mysore": { disaster: "1077", dm: "0821-2345678", agri: "0821-2345679", police: "100" }
      }
    },
    "Uttar Pradesh": { 
      disaster: "1077", 
      dm: "0522-2234567", 
      agri: "0522-2234789",
      districts: {
        "Lucknow": { disaster: "1077", dm: "0522-2234567", agri: "0522-2234789", police: "100" },
        "Kanpur": { disaster: "1077", dm: "0512-2234567", agri: "0512-2234789", police: "100" }
      }
    },
    "Maharashtra": { 
      disaster: "1077", 
      dm: "022-22345678", 
      agri: "022-22345679",
      districts: {
        "Mumbai": { disaster: "1077", dm: "022-22345678", agri: "022-22345679", police: "100" },
        "Pune": { disaster: "1077", dm: "020-22345678", agri: "020-22345679", police: "100" }
      }
    }
  };

  return (
    <div className="min-h-screen bg-purple-100" style={{ fontFamily: '"Times New Roman MT", "Times New Roman", serif'}}>
      {/* Header */}
      <div className="bg-green-100 shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center bg-green-100">
          <div className="flex items-center gap-2 ">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <TruckIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">{currentLang.appName}</span>
          </div>

          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
                <SelectItem value="punjabi">ਪੰਜਾਬੀ</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setShowHelp(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              {currentLang.help}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 rounded-2xl shadow-sm">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-green-50 rounded-2xl p-6 shadow-sm">
            <div className="text-center md:text-left">
              <h1 className="text-3xl text-bold textblack mb-4 mh-6" style={{ fontFamily: '"Times New Roman MT", "Times New Roman", serif' }}>{currentLang.appName}</h1>
              <p className="text-xl text-green-600 mb-4" style={{ fontFamily: '"Times New Roman MT", "Times New Roman", serif' }}>{currentLang.tagline}</p>
              <p className="text-lg text-gray-600 mb-4" style={{ fontFamily: '"Times New Roman MT", "Times New Roman", serif' }}>{currentLang.subtitle}</p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src={farmImage}
                alt="Beautiful farm landscape" 
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-200  bg-green-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Marketplace</h3>
              <p className="text-sm text-gray-600">Direct farmer-buyer connection with fair pricing</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure Storage</h3>
              <p className="text-sm text-gray-600">Village-level warehouses and cold storage</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Truck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Complete Logistics</h3>
              <p className="text-sm text-gray-600">Storage, transport, and delivery solutions</p>
            </CardContent>
          </Card>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-green-300 hover:border-green-500 hover:shadow-xl transition-all cursor-pointer group bg-green-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-800">Farmer</h3>
              <p className="text-sm text-gray-600 mb-6">{currentLang.farmerDesc}</p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onNavigate('farmer')}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-300 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group bg-blue-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800"> Merchant </h3>
              <p className="text-sm text-gray-600 mb-6">{currentLang.buyerDesc}</p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onNavigate('buyer')}
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-300 hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer group bg-purple-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Admin</h3>
              <p className="text-sm text-gray-600 mb-6">{currentLang.adminDesc}</p>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => onNavigate('admin')}
              >
                Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Help Modal */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Emergency Assistance
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Emergency Type Selection */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={emergencyType === 'view' ? 'default' : 'outline'}
                onClick={() => setEmergencyType('view')}
                className="h-12"
              >
                🔍 Find Help Numbers
              </Button>
              <Button
                variant={emergencyType === 'request' ? 'default' : 'outline'}
                onClick={() => setEmergencyType('request')}
                className="h-12"
              >
                📞 Request Callback
              </Button>
            </div>

            {emergencyType === 'view' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Select Your State</label>
                  <Select value={selectedState} onValueChange={(value: string) => {
                    setSelectedState(value);
                    setSelectedDistrict('');
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedState && emergencyNumbers[selectedState as keyof typeof emergencyNumbers] && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Your District</label>
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts || {}).map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedState && selectedDistrict && (
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">🚨 Emergency Helplines - {selectedDistrict}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Disaster Management:</span>
                          <a href={`tel:${emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].disaster}`} 
                             className="text-red-600 font-medium">
                            {emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].disaster}
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span>District Magistrate:</span>
                          <a href={`tel:${emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].dm}`} 
                             className="text-red-600 font-medium">
                            {emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].dm}
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span>Agriculture Officer:</span>
                          <a href={`tel:${emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].agri}`} 
                             className="text-red-600 font-medium">
                            {emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].agri}
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span>Police Emergency:</span>
                          <a href={`tel:${emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].police}`} 
                             className="text-red-600 font-medium">
                            {emergencyNumbers[selectedState as keyof typeof emergencyNumbers].districts[selectedDistrict].police}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      📱 Click any number to call directly. Help is available 24/7.
                    </p>
                  </div>
                )}
              </>
            )}

            {emergencyType === 'request' && (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">📞 Request Emergency Callback</h4>
                  <p className="text-sm text-orange-700">
                    Fill in your details and our emergency team will call you back within 5 minutes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Your Name</Label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label>Mobile Number</Label>
                    <Input placeholder="10-digit mobile number" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>District</Label>
                    <Input placeholder="Your district" />
                  </div>
                </div>

                <div>
                  <Label>Emergency Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select emergency type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flood">Flood Damage</SelectItem>
                      <SelectItem value="crop">Crop Disease/Pest</SelectItem>
                      <SelectItem value="financial">Financial Emergency</SelectItem>
                      <SelectItem value="market">Market Access Issue</SelectItem>
                      <SelectItem value="other">Other Agricultural Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Brief Description</Label>
                  <Textarea placeholder="Briefly describe your emergency..." rows={3} />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  📞 Request Emergency Callback
                </Button>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ⏱️ <strong>Response Time:</strong> We guarantee a callback within 5 minutes during business hours (6 AM - 10 PM)
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Simple Footer */} 
      <div>
      <footer className="w-full bg-green-100 border-t border-green-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-green-700" />
            <span className="font-semibold text-lg text-green-900 tracking-wide">Sahaj </span>
          </div>
          <div className="text-sm text-green-800 flex flex-col md:flex-row gap-2 md:gap-6 text-center">
            
            <a href="#" className="hover:underline hover:text-green-900 transition">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-green-900 transition">Contact</a>

            <span>© 2025 Sahaj. All rights reserved.</span>
          </div>
        </div>
      </footer>
  </div>
    </div>
    );
}