import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, Send, Mic, MicOff, Bot, User, Zap, MessageSquare, HelpCircle, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface KisanBotProps {
  onBack: () => void;
  userType: 'farmer' | 'buyer';
  userLocation?: string;
  language?: string;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function KisanBot({ onBack, userType, userLocation = 'Khandwa, MP', language = 'english' }: KisanBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showQuickHelp, setShowQuickHelp] = useState(false);
  // New state for process info
  const [processInfo, setProcessInfo] = useState<null | {
    steps: string[];
    fundingEstimate?: string;
    fundingSources?: string[];
    crop?: string;
    quantity?: string;
  }>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      suggestions: getQuickSuggestions()
    };
    setMessages([welcomeMessage]);
  }, [userType, language]);

  const getWelcomeMessage = () => {
    const messages = {
      english: {
        farmer: `🌾 Namaste! I'm KisanBot, your smart farming assistant. I'm here to help you with:\n\n• Crop management & best practices\n• Weather & climate guidance\n• Government schemes & subsidies\n• Market prices & selling tips\n• Emergency support\n\nHow can I assist you today?`,
        buyer: `🛍️ Welcome! I'm KisanBot, your agricultural marketplace assistant. I can help you with:\n\n• Finding fresh produce\n• Connecting with verified farmers\n• Price comparisons & market trends\n• Quality assessment tips\n• Transportation & logistics\n\nWhat would you like to know?`
      },
      hindi: {
        farmer: `🌾 नमस्ते! मैं किसानबॉट हूं, आपका स्मार्ट खेती सहायक। मैं आपकी मदद कर सकता हूं:\n\n• फसल प्रबंधन और बेहतरीन तरीके\n• मौसम और जलवायु मार्गदर्शन\n• सरकारी योजनाएं और सब्सिडी\n• बाजार की कीमतें और बिक्री के टिप्स\n• आपातकालीन सहायता\n\nआज मैं आपकी कैसे मदद कर सकता हूं?`,
        buyer: `🛍️ स्वागत है! मैं किसानबॉट हूं, आपका कृषि बाजार सहायक। मैं आपकी मदद कर सकता हूं:\n\n• ताजा उत्पाद खोजने में\n• सत्यापित किसानों से जुड़ने में\n• कीमत तुलना और बाजार के रुझान\n• गुणवत्ता आकलन के टिप्स\n• परिवहन और रसद\n\nआप क्या जानना चाहेंगे?`
      }
    };
    
    return messages[language as keyof typeof messages]?.[userType] || messages.english[userType];
  };

  const getQuickSuggestions = () => {
    const suggestions = {
      english: {
        farmer: [
          "What crops should I plant this season?",
          "How to protect crops from flood damage?",
          "Show me available government schemes",
          "Current market prices for wheat",
          "Best storage practices",
          "Selling raw",
          "Process my crop: What is my profit if I process my crop before selling? See market rate, required steps, transport, and funding options for processed goods.",
          "How do I get funding for my crop?"
        ],
        buyer: [
          "Find fresh vegetables near me",
          "How to check crop quality?",
          "Connect me with verified farmers",
          "Price trends for rice",
          "Transportation options",
          "Selling raw",
          "Process my crop: What is my profit if I process my crop before selling? See market rate, required steps, transport, and funding options for processed goods.",
          "How do I get funding for my crop?"
        ]
      },
      hindi: {
        farmer: [
          "इस सीजन में कौन सी फसल लगाऊं?",
          "बाढ़ से फसल को कैसे बचाएं?",
          "उपलब्ध सरकारी योजनाएं दिखाएं",
          "गेहूं के वर्तमान बाजार भाव",
          "भंडारण की बेहतरीन विधियां",
          "कच्चा बेचूं",
          "प्रोसेस करूं: प्रोसेस करके बेचने पर कितना मुनाफा होगा? प्रोसेसिंग के लिए बाजार भाव, ज़रूरी स्टेप्स, ट्रांसपोर्ट और फंडिंग विकल्प देखें।",
          "फसल के लिए फंडिंग कैसे प्राप्त करें?"
        ],
        buyer: [
          "मेरे पास ताजी सब्जियां खोजें",
          "फसल की गुणवत्ता कैसे जांचें?",
          "सत्यापित किसानों से जोड़ें",
          "चावल के भाव का रुझान",
          "परिवहन के विकल्प",
          "कच्चा बेचूं",
          "प्रोसेस करूं: प्रोसेस करके बेचने पर कितना मुनाफा होगा? प्रोसेसिंग के लिए बाजार भाव, ज़रूरी स्टेप्स, ट्रांसपोर्ट और फंडिंग विकल्प देखें।",
          "कच्चा बेचूं",
          "प्रोसेस करूं",
          "फसल के लिए फंडिंग कैसे प्राप्त करें?"
        ]
      }
    };
    
    return suggestions[language as keyof typeof suggestions]?.[userType] || suggestions.english[userType];
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Check for process-related queries
    const processKeywords = [
      'sell crop', 'selling process', 'how to sell', 'funding', 'loan', 'finance', 'किसान', 'बेचना', 'फसल', 'ऋण', 'फंड', 'process', 'quantity', 'steps'
    ];
    const lower = userMessage.toLowerCase();
    if (processKeywords.some(k => lower.includes(k))) {
      // Generic process logic for any crop and quantity, with raw and processed options if relevant
      let crop = '';
      let quantity = '';
      const cropMatch = lower.match(/(wheat|rice|cotton|soybean|mustard|gram|चावल|गेहूं|कपास|चना|सरसों|tomato|टमाटर|potato|आलू|onion|प्याज|sugarcane|गन्ना|maize|मक्का|chilli|मिर्च|mango|आम|apple|सेब|milk|दूध|corn|corn|banana|केला|groundnut|मूंगफली|peas|मटर|carrot|गाजर|cabbage|पत्ता गोभी|cauliflower|फूलगोभी)/);
      if (cropMatch) crop = cropMatch[0];
      const qtyMatch = lower.match(/\b(\d+)\s*(quintal|kg|ton|टन|क्विंटल|किलो)\b/);
      if (qtyMatch) quantity = qtyMatch[0];
      // Try to extract numeric value for calculations
      let qtyNum = 0;
      if (qtyMatch && qtyMatch[1]) qtyNum = parseInt(qtyMatch[1]);
      // Default prices and yields (can be improved with real data)
      const cropData: Record<string, { rawPrice: number; processedPrice?: number; processedYield?: number; processedLabel?: string; processSetup?: number; processFundingPerUnit?: number; } > = {
        tomato: { rawPrice: 1200, processedPrice: 30, processedYield: 0.85, processedLabel: 'ketchup/puree', processSetup: 200000, processFundingPerUnit: 1200 },
        potato: { rawPrice: 1000, processedPrice: 25, processedYield: 0.8, processedLabel: 'chips', processSetup: 150000, processFundingPerUnit: 1000 },
        milk: { rawPrice: 50, processedPrice: 80, processedYield: 0.95, processedLabel: 'paneer/cheese', processSetup: 100000, processFundingPerUnit: 40 },
        mango: { rawPrice: 2000, processedPrice: 60, processedYield: 0.7, processedLabel: 'juice/pulp', processSetup: 250000, processFundingPerUnit: 2000 },
        // Add more crops as needed
      };
      const cropKey = crop.toLowerCase();
      const cData = cropData[cropKey] || cropData[(cropKey === 'टमाटर') ? 'tomato' : (cropKey === 'आलू') ? 'potato' : (cropKey === 'दूध') ? 'milk' : (cropKey === 'आम') ? 'mango' : ''];
      if (cData && qtyNum > 0) {
        // Option 1: Sell as raw
        const rawIncome = qtyNum * cData.rawPrice;
        const rawFunding = qtyNum * 500;
        // Option 2: Processed (if data available)
        let processedIncome = 0;
        let processedYield = 0;
        let processedLabel = '';
        let processFunding = 0;
        let processSetup = 0;
        if (cData.processedPrice && cData.processedYield && cData.processedLabel) {
          processedYield = qtyNum * cData.processedYield;
          processedLabel = cData.processedLabel;
          processedIncome = processedYield * 100 * cData.processedPrice; // 1 quintal = 100kg
          processSetup = cData.processSetup || 0;
          processFunding = qtyNum * (cData.processFundingPerUnit || 1000) + processSetup;
        }
        const stepsRaw = [
          `1. Collect and clean ${qtyNum} ${qtyMatch ? qtyMatch[2] : ''} ${crop}.`,
          '2. Grade and pack as per mandi requirements.',
          '3. Transport to nearest mandi.',
          '4. Register sale at mandi counter.',
          '5. Get payment via bank or cash.'
        ];
        const stepsProcessed = processedLabel ? [
          `1. Collect and clean ${qtyNum} ${qtyMatch ? qtyMatch[2] : ''} ${crop}.`,
          '2. Set up/partner with food processing unit.',
          `3. Process ${crop} into ${processedLabel} (${Math.round(cData.processedYield! * 100)}% yield).`,
          '4. Pack in bottles/pouches.',
          '5. Sell to wholesalers/retailers/online.'
        ] : [];
        const steps = [
          `Option 1: Sell as raw ${crop}:`,
          ...stepsRaw,
          `→ Estimated Income: ₹${rawIncome.toLocaleString()}`,
          `→ Funding Needed: ₹${rawFunding.toLocaleString()}`
        ];
        let solution = '';
        if (processedLabel) {
          steps.push('', `Option 2: Process into ${processedLabel}:`, ...stepsProcessed,
            `→ Estimated Income: ₹${processedIncome.toLocaleString()} (from ${Math.round(processedYield * 100).toLocaleString()} kg ${processedLabel} at ₹${cData.processedPrice}/kg)`,
            `→ Funding Needed: ₹${processFunding.toLocaleString()} (processing + setup)`
          );
          // Only show solution if the query is about profit/process comparison
          const profitKeywords = [
            'maximize profit', 'sell raw or process', 'कच्चा बेचूं', 'प्रोसेस करूं', 'अधिक लाभ', 'profit', 'raw vs process', 'raw or process', 'raw vs. process', 'raw versus process'
          ];
          if (profitKeywords.some(k => lower.includes(k))) {
            const rawProfit = rawIncome - rawFunding;
            const processedProfit = processedIncome - processFunding;
            let suggestion = '';
            suggestion += `Selling Raw: Profit = ₹${rawProfit.toLocaleString()}\n`;
            suggestion += `Process My Crop: Profit = ₹${processedProfit.toLocaleString()}\n`;
            if (processedProfit > rawProfit) {
              suggestion += `\n✅ Suggestion: "Process my crop" is more profitable after costs.\n`;
              suggestion += `- Market Rate: The current market rate for ${processedLabel} is ₹${cData.processedPrice}/kg.\n`;
              suggestion += `- Processing Steps: 1) Set up or partner with a food processing unit. 2) Process ${crop} into ${processedLabel} (yield: ${Math.round(cData.processedYield! * 100)}%). 3) Pack in bottles/pouches. 4) Ensure quality and FSSAI compliance.\n`;
              suggestion += `- Transportation: Arrange cold storage/transport for processed goods to reach urban markets, supermarkets, or export hubs.\n`;
              suggestion += `- Funding: Estimated funding needed is ₹${processFunding.toLocaleString()} (includes setup and processing). Explore Food Processing Subsidy (MoFPI), Kisan Credit Card (KCC), NABARD food/agri loans, and local cooperative banks.\n`;
              suggestion += `- Market Insight: Value-added products like ${processedLabel} often fetch higher prices, especially if you target urban markets, supermarkets, or export.\n- Tip: Check current demand and price trends for ${processedLabel} in your region. Partnering with local food processors or investing in small-scale processing can increase your returns.\n- Example: Farmers who process tomatoes into ketchup/puree or mangoes into pulp/juice can earn 20-40% more profit compared to selling raw, depending on market rates and quality.\n`;
              suggestion += `\nProcess my crop: Consider processing your ${crop} into ${processedLabel} to tap into new markets and increase shelf life. Explore government schemes for food processing and connect with local processors for better rates.`;
            } else if (processedProfit < rawProfit) {
              suggestion += `\n✅ Suggestion: "Selling raw" is more profitable after costs. Selling your ${crop} as raw in the market is the better option in your case.\n`;
              suggestion += `\nSelling raw: You can quickly sell your ${crop} at the nearest mandi or market with minimal processing and lower investment. This is ideal if you need immediate cash flow or if market prices for processed goods are low.`;
            } else {
              suggestion += `\n✅ Suggestion: Both "selling raw" and "process my crop" provide similar profit after costs. Choose based on your resources, market access, and risk preference.`;
            }
            steps.push('', suggestion);
          }
        }
        setProcessInfo({
          steps,
          fundingEstimate: 'See above for each option.',
          fundingSources: [
            'Food Processing Subsidy (MoFPI)',
            'Kisan Credit Card (KCC)',
            'NABARD food/agri loans',
            'Local cooperative banks'
          ],
          crop: crop.charAt(0).toUpperCase() + crop.slice(1),
          quantity: qtyMatch ? qtyMatch[0] : ''
        });
        setIsTyping(false);
        return `Here is a detailed process and profit comparison for selling ${qtyNum} ${qtyMatch ? qtyMatch[2] : ''} ${crop} as raw or processed (${processedLabel || 'N/A'}). See the Process section below.`;
      }
      // Fallback: simple process
      const steps = [
        `1. Collect and clean your ${crop || 'crop'}${quantity ? ` (${quantity})` : ''}.`,
        '2. Grade and pack as per mandi requirements.',
        '3. Transport to nearest mandi or buyer.',
        '4. Register sale at mandi counter.',
        '5. Get payment via bank or cash.'
      ];
      const fundingEstimate = quantity ? `Estimated funding needed for ${quantity} of ${crop || 'crop'}: ₹${(parseInt(quantity) * 2000) || 20000}` : 'Funding estimate depends on crop and quantity.';
      const fundingSources = [
        'Kisan Credit Card (KCC) - Low interest loans',
        'NABARD - Agriculture finance',
        'Local cooperative banks',
        'PM Fasal Bima Yojana (insurance)'
      ];
      setProcessInfo({ steps, fundingEstimate, fundingSources, crop, quantity });
      setIsTyping(false);
      return `Here is a step-by-step process to sell your ${crop || 'crop'}${quantity ? ` (${quantity})` : ''} and get funding. See the Process section below.`;
    } else {
      setProcessInfo(null);
    }
    const response = await mockGeminiResponse(userMessage, userType, userLocation, language);
    setIsTyping(false);
    return response;
  };

  const mockGeminiResponse = async (query: string, userType: string, location: string, lang: string): Promise<string> => {
    const lowerQuery = query.toLowerCase();
    
    // Weather and Climate responses
    if (lowerQuery.includes('weather') || lowerQuery.includes('rain') || lowerQuery.includes('flood') || lowerQuery.includes('मौसम') || lowerQuery.includes('बारिश')) {
      return `🌧️ Based on current weather data for ${location}:\n\n• Heavy rainfall expected in next 24-48 hours\n• Flood risk: HIGH in low-lying areas\n• Immediate actions needed:\n  - Ensure proper drainage in fields\n  - Move harvested crops to safe storage\n  - Check crop insurance coverage\n\n📋 Government schemes available:\n• State Disaster Response Fund (SDRF)\n• Pradhan Mantri Fasal Bima Yojana\n\nWould you like help applying for flood relief schemes?`;
    }
    
    // Crop Management responses
    if (lowerQuery.includes('crop') || lowerQuery.includes('plant') || lowerQuery.includes('season') || lowerQuery.includes('फसल') || lowerQuery.includes('बोना')) {
      return `🌾 For ${location} in current season, I recommend:\n\n**Best Crops for This Season:**\n• Wheat: Sowing time until December\n• Mustard: Good market demand\n• Gram (Chana): Drought resistant\n\n**Important Tips:**\n• Use certified seeds from authorized dealers\n• Apply organic manure before sowing\n• Ensure proper spacing between rows\n\n**Government Support:**\n• Seed subsidy: 50% for certified seeds\n• Soil health card: Free testing available\n\nNeed specific advice for any crop?`;
    }
    
    // Government Schemes responses
    if (lowerQuery.includes('scheme') || lowerQuery.includes('subsidy') || lowerQuery.includes('government') || lowerQuery.includes('योजना') || lowerQuery.includes('सब्सिडी')) {
      return `📋 Available Government Schemes for farmers in ${location}:\n\n**Financial Support:**\n• PM-Kisan: ₹6,000/year direct benefit\n• KCC (Kisan Credit Card): Low interest loans\n\n**Crop Protection:**\n• Fasal Bima: Crop insurance scheme\n• Price Support: MSP guarantee for major crops\n\n**Input Subsidies:**\n• Fertilizer: 50% subsidy on DAP, Urea\n• Seeds: Certified seed subsidy\n\n**Emergency Relief:**\n• Flood damage compensation\n• Drought relief package\n\nWhich scheme would you like to apply for? I can guide you through the process.`;
    }
    
    // Market Prices responses
    if (lowerQuery.includes('price') || lowerQuery.includes('market') || lowerQuery.includes('sell') || lowerQuery.includes('भाव') || lowerQuery.includes('बाजार')) {
      return `📈 Current Market Prices in ${location}:\n\n**Today's Rates:**\n• Wheat: ₹2,200-2,400/Quintal (↗ +3%)\n• Rice: ₹2,800-3,000/Quintal (→ Stable)\n• Cotton: ₹5,500-5,800/Quintal (↘ -2%)\n• Soybean: ₹4,200-4,400/Quintal (↗ +5%)\n\n**Best Time to Sell:**\n• Morning hours (6-10 AM) for better rates\n• Avoid rainy days\n• Check multiple mandis\n\n**Selling Tips:**\n• Clean and grade your produce\n• Get moisture content tested\n• Negotiate based on quality\n\nNeed help connecting with buyers?`;
    }
    
    // Storage and Post-harvest responses
    if (lowerQuery.includes('storage') || lowerQuery.includes('store') || lowerQuery.includes('warehouse') || lowerQuery.includes('भंडारण')) {
      return `🏪 Storage Solutions near ${location}:\n\n**Available Options:**\n• Village Cold Storage: ₹5/bag/day\n• District Warehouse: ₹3/bag/day\n• FCI Godown: ₹2/bag/day (government)\n\n**Storage Best Practices:**\n• Moisture content below 14%\n• Use proper bags (jute/plastic)\n• Regular fumigation\n• Maintain temperature records\n\n**Benefits:**\n• Better prices in off-season\n• Reduced losses\n• Access to warehouse receipt loans\n\nShall I help you book storage space?`;
    }
    
    // Buyer-specific responses
    if (userType === 'buyer') {
      if (lowerQuery.includes('fresh') || lowerQuery.includes('quality') || lowerQuery.includes('ताजा') || lowerQuery.includes('गुणवत्ता')) {
        return `🥬 Finding Fresh Produce near ${location}:\n\n**Quality Checks:**\n• Look for harvest date (within 7 days)\n• Check color and texture\n• No pest damage or discoloration\n• Proper storage conditions\n\n**Available Fresh Produce:**\n• Tomatoes: 2-3 days old, Grade A\n• Onions: 5 days old, Good quality\n• Potatoes: 1 week old, Premium\n\n**Direct Farmer Contacts:**\n• Rajesh Kumar: Vegetables specialist\n• Priya Sharma: Organic produce\n• Suresh Patel: Bulk quantities\n\nWould you like me to connect you with any specific farmer?`;
      }
    }
    
    // Emergency and Support responses
    if (lowerQuery.includes('help') || lowerQuery.includes('emergency') || lowerQuery.includes('problem') || lowerQuery.includes('मदद') || lowerQuery.includes('समस्या')) {
      return `🆘 Emergency Support for ${location}:\n\n**Immediate Help:**\n• Disaster Helpline: 1077 (24/7)\n• District Magistrate: 07571-234567\n• Agriculture Officer: 07571-234789\n\n**Common Issues & Solutions:**\n• Crop disease: Contact nearest KVK\n• Market disputes: Approach APMC\n• Insurance claims: Call insurance company\n\n**Quick Actions:**\n• Document damage with photos\n• Keep all receipts and records\n• Contact local agriculture extension officer\n\nWhat specific help do you need right now?`;
    }
    
    // Default response
    return `I understand you're asking about "${query}". As your KisanBot assistant, I'm here to help with farming, market prices, government schemes, and agricultural guidance.\n\nCould you please be more specific? For example:\n• Ask about crop recommendations\n• Check current market prices\n• Learn about government schemes\n• Get weather and farming tips\n\nI'm designed to provide practical, actionable advice for farmers and buyers in ${location}.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate bot response
    const botResponse = await generateBotResponse(inputMessage);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      suggestions: getContextualSuggestions(inputMessage)
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const getContextualSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('weather') || lowerQuery.includes('rain')) {
      return ["Show flood relief schemes", "How to protect crops?", "Storage options available"];
    }
    if (lowerQuery.includes('price') || lowerQuery.includes('market')) {
      return ["Find buyers near me", "Best selling time", "Price trends this month"];
    }
    if (lowerQuery.includes('scheme')) {
      return ["How to apply online?", "Required documents", "Application status"];
    }
    
    return getQuickSuggestions();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Voice recognition would be implemented here
    setTimeout(() => {
      setIsListening(false);
      setInputMessage("What crops should I plant this season?");
    }, 2000);
  };

  const quickHelpOptions = [
    {
      icon: TrendingUp,
      title: "Market Prices",
      description: "Get real-time commodity prices and trends",
      action: () => handleSuggestionClick("Current market prices for major crops")
    },
    {
      icon: AlertTriangle,
      title: "Weather Alerts",
      description: "Weather warnings and crop protection tips",
      action: () => handleSuggestionClick("Weather forecast and farming advice")
    },
    {
      icon: HelpCircle,
      title: "Government Schemes",
      description: "Available subsidies and application process",
      action: () => handleSuggestionClick("Show me available government schemes")
    },
    {
      icon: Lightbulb,
      title: "Farming Tips",
      description: "Best practices and expert recommendations",
      action: () => handleSuggestionClick("Best farming practices for current season")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">KisanBot</h1>
                <p className="text-sm text-green-100">
                  {isTyping ? "Typing..." : "Online • AI-Powered Assistant"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white">
              📍 {userLocation}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setShowQuickHelp(true)}
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Quick Help
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-4 pb-24">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border shadow-sm'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Quick suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs h-8"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {/* Process Section */}
          {processInfo && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-4 shadow">
              <h2 className="text-lg font-bold text-green-800 mb-2">🛤️ Crop Selling & Funding Process</h2>
              {processInfo.crop && (
                <p className="mb-2 text-green-700 font-medium">Crop: {processInfo.crop}</p>
              )}
              {processInfo.quantity && (
                <p className="mb-2 text-green-700 font-medium">Quantity: {processInfo.quantity}</p>
              )}
              <ol className="list-decimal ml-6 text-green-900 mb-3">
                {processInfo.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              {processInfo.fundingEstimate && (
                <p className="mb-2 text-green-700 font-semibold">💰 {processInfo.fundingEstimate}</p>
              )}
              {processInfo.fundingSources && processInfo.fundingSources.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold text-green-800">Funding Sources:</p>
                  <ul className="list-disc ml-6 text-green-900">
                    {processInfo.fundingSources.map((src, idx) => (
                      <li key={idx}>{src}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-green-700 text-sm mt-2">For more details, ask about a specific step or funding source.</p>
            </div>
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about farming, markets, or schemes..."
                className="pr-12"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={startVoiceInput}
                disabled={isListening}
              >
                {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Help Modal */}
      <Dialog open={showQuickHelp} onOpenChange={setShowQuickHelp}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              KisanBot Quick Help
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {quickHelpOptions.map((option, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={option.action}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <option.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{option.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🤖 About KisanBot</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Powered by advanced AI for accurate farming advice</p>
                <p>• Real-time data integration for weather and market prices</p>
                <p>• Multi-language support (Hindi, English, and regional languages)</p>
                <p>• 24/7 availability for emergency agricultural support</p>
                <p>• Personalized recommendations based on your location</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}