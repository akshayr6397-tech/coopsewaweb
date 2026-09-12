/**
 * COOPSEWA - Main Application Engine
 * Smart India Hackathon 2026 | Problem Statement SIH-26089
 * Cooperative Gig Services Platform for Household & Community Services
 * Team: Hackerbit | Theme: Agriculture, Food Tech & Rural Development
 */

// ==========================================
// 1. GLOBAL STATE & CONFIGURATION
// ==========================================
const APP_STATE = {
  activePortal: 'customer', // 'customer' | 'worker' | 'federation'
  isSplitView: false,
  currentLanguage: 'en',
  
  // Current Authenticated Session
  currentUser: {
    role: 'customer', // 'customer' | 'worker'
    name: 'Priya Sharma',
    phone: '+91 9876543210',
    address: 'Flat 402, Green Valley Apts, Sector 14, New Delhi',
    isLoggedIn: true
  },

  currentWorker: {
    name: 'Ramesh Kumar',
    trade: 'Monsoon Plumbing & Drainage',
    coopId: 'COOP-26089-RK',
    society: 'Delhi Labour Coop Federation #41',
    grade: 'A',
    rating: 4.92,
    jobsCompleted: 156,
    score: 96,
    isOnline: true,
    walletBalance: 14850,
    todayEarnings: 1240,
    pensionCorpus: 3420
  },

  // Selected Service for Booking
  selectedService: {
    id: 'plumbing',
    title: 'Monsoon Plumbing & Drainage',
    price: 400,
    icon: '🌊',
    workerShare: 380,
    coopFee: 20
  },

  // Active Job Lifecycle (Steps 1 through 10 from PDF)
  activeJob: null,

  // Comprehensive Cooperative Workers Registry across All Working Areas
  // Certificate System: Grade A (>75 jobs), Grade B (>50 jobs), Grade C (>20 jobs)
  // Dynamic Fare Formula: baseFare + (distanceCharge * km) * gradeMultiplier * ratingMultiplier
  nearbyWorkers: [
    // =====================================================================
    // 1. CARPENTRY & WOODWORK (🪚 Carpenters) — 3 per grade
    // =====================================================================
    {
      id: 'w_carp_1',
      name: 'Gurpreet Singh',
      avatar: '🪚',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Master Joiner & Modular Woodwork',
      grade: 'A',
      rating: 4.93, reviewsCount: 182, score: 97, jobs: 94,
      distanceMeters: 520, etaMins: 5,
      lat: 28.5370, lng: 77.2135,
      phone: '+91 9844455667',
      coopId: 'COOP-26089-GS',
      society: 'Delhi Labour Coop Woodcraft Society #12',
      baseFare: 380, distanceChargePerKm: 25, serviceFare: 450,
      experienceYears: 12,
      specialties: ['Modular Kitchen Cabinets', 'Custom Wardrobes', 'Antique Wood Restoral', 'Door Latches & Locks'],
      tools: ['DeWalt Cordless Jigsaw', 'Bosch Circular Saw', 'Precision Joinery Chisels', 'Laser Angle Leveler'],
      bio: 'Master certified cooperative wood craftsman with 12 years of community service. Renowned for zero-rework joinery, modular furniture assembly, and rapid 5-minute dispatch.'
    },
    {
      id: 'w_carp_2a',
      name: 'Prakash Nair',
      avatar: '🔨',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Senior Joinery & Wooden Door Expert',
      grade: 'A',
      rating: 4.86, reviewsCount: 156, score: 93, jobs: 79,
      distanceMeters: 1100, etaMins: 9,
      lat: 28.5405, lng: 77.2155,
      phone: '+91 9899922334',
      coopId: 'COOP-26089-PN',
      society: 'Delhi Labour Coop Woodcraft Society #12',
      baseFare: 360, distanceChargePerKm: 25, serviceFare: 430,
      experienceYears: 10,
      specialties: ['Teak Wood Doors', 'Ply Partition Walls', 'False Ceiling Frames', 'Wooden Staircase Banister'],
      tools: ['Bosch GST Jigsaw', 'Chisels & Mallets', 'Wood Lathe (Mini)', 'Precision Try Square'],
      bio: 'Grade A cooperative carpenter with expertise in premium wood doors, false ceiling frameworks, and custom wardrobe fittings.'
    },
    {
      id: 'w_carp_3a',
      name: 'Naresh Joshi',
      avatar: '🪵',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Expert Furniture Restoration & Polishing',
      grade: 'A',
      rating: 4.82, reviewsCount: 139, score: 91, jobs: 77,
      distanceMeters: 1580, etaMins: 13,
      lat: 28.5340, lng: 77.2125,
      phone: '+91 9822255667',
      coopId: 'COOP-26089-NJ',
      society: 'South Delhi Craftsmen Cooperative Federation #18',
      baseFare: 350, distanceChargePerKm: 25, serviceFare: 420,
      experienceYears: 9,
      specialties: ['Antique Furniture Polish', 'Chair & Sofa Wood Frame Repair', 'Laminate Overlay Work', 'Drawer Runner Replacement'],
      tools: ['Random Orbital Sander', 'French Polish Kit', 'Woodworking Files', 'Clamp & Vise Set'],
      bio: 'Skilled Grade A craftsman specializing in furniture restoration, varnishing, and antique wood polishing for homes and offices.'
    },
    {
      id: 'w_carp_4',
      name: 'Rajesh Sutar',
      avatar: '🪓',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Skilled Door & Furniture Repair Tech',
      grade: 'B',
      rating: 4.78, reviewsCount: 94, score: 88, jobs: 62,
      distanceMeters: 980, etaMins: 9,
      lat: 28.5410, lng: 77.2190,
      phone: '+91 9811199882',
      coopId: 'COOP-26089-RS',
      society: 'South Delhi Craftsmen Cooperative Federation #18',
      baseFare: 300, distanceChargePerKm: 20, serviceFare: 390,
      experienceYears: 6,
      specialties: ['Bed Frame Assembly', 'Sliding Door Track Fix', 'Table Polish & Varnish', 'Window Latch Repairs'],
      tools: ['Stanley Hand Planer', 'Makita Cordless Drill', 'Wood Clamping Vices', 'Orbital Sander'],
      bio: 'Dedicated cooperative wood artisan specializing in domestic furniture repairs, hinge realignment, and wooden fixture maintenance.'
    },
    {
      id: 'w_carp_5',
      name: 'Dilip Vishwakarma',
      avatar: '🛠️',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Skilled Modular Wardrobe & Loft Fitter',
      grade: 'B',
      rating: 4.75, reviewsCount: 88, score: 86, jobs: 55,
      distanceMeters: 1350, etaMins: 11,
      lat: 28.5440, lng: 77.2100,
      phone: '+91 9855533447',
      coopId: 'COOP-26089-DV',
      society: 'Delhi Labour Coop Woodcraft Society #12',
      baseFare: 290, distanceChargePerKm: 20, serviceFare: 380,
      experienceYears: 5,
      specialties: ['Loft Storage Build', 'TV Unit Wood Frame', 'Modular Wardrobe Assembly', 'Cot & Bed Setup'],
      tools: ['Fischer Wall Plug Kit', 'Cordless Screwgun', 'Allen Key Set', 'Steel Measuring Tape'],
      bio: 'Grade B cooperative carpenter focused on IKEA-style flat-pack furniture assembly and custom loft storage unit construction.'
    },
    {
      id: 'w_carp_5b',
      name: 'Kailash Sharma',
      avatar: '🪵',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Skilled Window Frame & Kitchen Wood Tech',
      grade: 'B',
      rating: 4.79, reviewsCount: 82, score: 87, jobs: 58,
      distanceMeters: 1250, etaMins: 10,
      lat: 28.5390, lng: 77.2170,
      phone: '+91 9811234599',
      coopId: 'COOP-26089-KS',
      society: 'Delhi Labour Coop Woodcraft Society #12',
      baseFare: 295, distanceChargePerKm: 20, serviceFare: 385,
      experienceYears: 6,
      specialties: ['Window Frame Realignment', 'Kitchen Shelf Fitting', 'Sliding Panel Fix', 'Wooden Threshold Seal'],
      tools: ['Makita Jigsaw', 'Level Square', 'Wood Rasp Set', 'Safety Goggles'],
      bio: 'Skilled Grade B cooperative artisan recognized for precise window frame fittings, kitchen shelf carpentry, and punctual service.'
    },
    {
      id: 'w_carp_6',
      name: 'Amit Mistry',
      avatar: '🔑',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Certified Shelf & Partition Carpenter',
      grade: 'C',
      rating: 4.62, reviewsCount: 38, score: 83, jobs: 28,
      distanceMeters: 1620, etaMins: 13,
      lat: 28.5335, lng: 77.2110,
      phone: '+91 9877711223',
      coopId: 'COOP-26089-AM',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 240, distanceChargePerKm: 15, serviceFare: 340,
      experienceYears: 3,
      specialties: ['Wall Floating Shelves', 'Door Stopper Fitting', 'Study Desk Assembly', 'Curtain Rod Mounts'],
      tools: ['Stanley Claw Hammer', 'Bosch Hand Drill', 'Spirit Level', 'Hand Saws'],
      bio: 'Energetic cooperative craftsman certified under NCCT apprentice pathway, providing quick household woodwork repairs.'
    },
    {
      id: 'w_carp_7',
      name: 'Sanjay Lohar',
      avatar: '⚙️',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Certified Hinge & Door Frame Fitter',
      grade: 'C',
      rating: 4.55, reviewsCount: 30, score: 80, jobs: 22,
      distanceMeters: 1900, etaMins: 15,
      lat: 28.5300, lng: 77.2130,
      phone: '+91 9844399001',
      coopId: 'COOP-26089-SL',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 220, distanceChargePerKm: 15, serviceFare: 320,
      experienceYears: 2,
      specialties: ['Door Hinge Replacement', 'Cabinet Lock Fitting', 'Wooden Frame Patching', 'Window Shutter Repair'],
      tools: ['Hand Drill', 'Screwdriver Set', 'Hinge Kit', 'Sandpaper Roll'],
      bio: 'Junior cooperative carpenter undergoing on-field NCCT training. Quick and affordable for basic door and hinge repairs.'
    },
    {
      id: 'w_carp_8',
      name: 'Rakesh Bajaj',
      avatar: '🔩',
      category: 'carpentry',
      categoryLabel: 'Carpentry & Woodwork',
      trade: 'Certified Furniture Assembly Technician',
      grade: 'C',
      rating: 4.51, reviewsCount: 26, score: 78, jobs: 21,
      distanceMeters: 1950, etaMins: 16,
      lat: 28.5290, lng: 77.2145,
      phone: '+91 9877800334',
      coopId: 'COOP-26089-RB',
      society: 'South Delhi Craftsmen Cooperative Federation #18',
      baseFare: 210, distanceChargePerKm: 15, serviceFare: 310,
      experienceYears: 2,
      specialties: ['Flat-Pack Furniture Build', 'Drawer Pull Replacement', 'Basic Shelf Fixing', 'Wooden Box Repair'],
      tools: ['Rubber Mallet', 'Hex Key Set', 'Tape Measure', 'Carpenter Pencil Set'],
      bio: 'Newly registered cooperative member completing basic furniture assembly certification through NCCT distance program.'
    },

    // =====================================================================
    // 2. GARDENING & LANDSCAPING (🌱 Gardeners) — 3 per grade
    // =====================================================================
    {
      id: 'w_gard_1',
      name: 'Ram Kumar Saini',
      avatar: '🌱',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Master Horticulturist & Lawn Care Specialist',
      grade: 'A',
      rating: 4.96, reviewsCount: 146, score: 98, jobs: 88,
      distanceMeters: 480, etaMins: 4,
      lat: 28.5432, lng: 77.2148,
      phone: '+91 9822299881',
      coopId: 'COOP-26089-RKS',
      society: 'Delhi NCR Green Cooperative Society #07',
      baseFare: 300, distanceChargePerKm: 22, serviceFare: 420,
      experienceYears: 14,
      specialties: ['Terrace Garden Design', 'Lawn Mowing & Aeration', 'Bio-Pest & Fungus Shield', 'Bonsai & Exotic Flora'],
      tools: ['Honda Self-Propelled Mower', 'Stihl Hedge Trimmer', 'Soil pH Testing Kit', 'Micro-Drip Irrigation Tools'],
      bio: 'NCCT-accredited Master Horticulturist with 14 years expertise. Transforms residential balconies, terrace gardens, and lawns with 100% organic nutrition.'
    },
    {
      id: 'w_gard_1a',
      name: 'Balkishan Rao',
      avatar: '🌳',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Master Landscape & Drip Irrigation Designer',
      grade: 'A',
      rating: 4.88, reviewsCount: 119, score: 95, jobs: 80,
      distanceMeters: 850, etaMins: 7,
      lat: 28.5408, lng: 77.2158,
      phone: '+91 9866611224',
      coopId: 'COOP-26089-BKR',
      society: 'National Labour Agro & Horti Federation #09',
      baseFare: 310, distanceChargePerKm: 22, serviceFare: 430,
      experienceYears: 11,
      specialties: ['Drip Irrigation Layout', 'Vertical Garden Walls', 'Seasonal Flower Planting', 'Compost Pit Setup'],
      tools: ['Drip Tape & Emitters Kit', 'Electric Tiller', 'Soil Moisture Sensor', 'Landscape Design Ruler'],
      bio: 'Grade A certified horticulturist specializing in urban drip irrigation systems, vertical green walls, and seasonal flower bed maintenance.'
    },
    {
      id: 'w_gard_1b',
      name: 'Chetan Patidar',
      avatar: '🌾',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Master Organic Kitchen Garden Expert',
      grade: 'A',
      rating: 4.84, reviewsCount: 107, score: 93, jobs: 76,
      distanceMeters: 1300, etaMins: 11,
      lat: 28.5370, lng: 77.2170,
      phone: '+91 9877755441',
      coopId: 'COOP-26089-CP',
      society: 'Delhi NCR Green Cooperative Society #07',
      baseFare: 295, distanceChargePerKm: 22, serviceFare: 415,
      experienceYears: 9,
      specialties: ['Organic Vegetable Beds', 'Raised Planter Boxes', 'Aquaponics Mini Setup', 'Natural Pest Repellent Spray'],
      tools: ['Raised Bed Kit', 'Soil Tester & pH Strips', 'Digging Fork', 'Organic Neem Spray Pump'],
      bio: 'Certified organic garden specialist with proven ability in terrace vegetable gardens, mini aquaponics, and chemical-free pest control.'
    },
    {
      id: 'w_gard_2',
      name: 'Mohan Lal',
      avatar: '🌿',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Skilled Pruning, Soil & Plant Specialist',
      grade: 'B',
      rating: 4.81, reviewsCount: 82, score: 89, jobs: 56,
      distanceMeters: 1120, etaMins: 10,
      lat: 28.5480, lng: 77.2120,
      phone: '+91 9833388772',
      coopId: 'COOP-26089-ML',
      society: 'National Labour Agro & Horti Federation #09',
      baseFare: 260, distanceChargePerKm: 18, serviceFare: 360,
      experienceYears: 7,
      specialties: ['Hedge Shaping & Pruning', 'Pot Repotting & Organic Manure', 'Kitchen Garden Setup', 'Drip Hose Maintenance'],
      tools: ['Wolf-Garten Telescopic Lopper', 'Manual Shear Set', 'Pressure Sprayer Pump', 'Trowel & Weeder Kit'],
      bio: 'Trusted cooperative gardener specialized in seasonal floral maintenance, decorative shrub trimming, and organic plant growth.'
    },
    {
      id: 'w_gard_2a',
      name: 'Pawan Saini',
      avatar: '🍃',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Skilled Lawn Maintenance & Hedge Worker',
      grade: 'B',
      rating: 4.76, reviewsCount: 71, score: 87, jobs: 53,
      distanceMeters: 1480, etaMins: 12,
      lat: 28.5455, lng: 77.2100,
      phone: '+91 9844466778',
      coopId: 'COOP-26089-PS',
      society: 'Delhi NCR Green Cooperative Society #07',
      baseFare: 250, distanceChargePerKm: 18, serviceFare: 350,
      experienceYears: 6,
      specialties: ['Lawn Edging & Mowing', 'Shrub Topiary Trim', 'Bio-Fertilizer Mixing', 'Seasonal Flower Pot Rotation'],
      tools: ['Cordless Hedge Trimmer', 'Lawn Edger', 'Garden Fork', 'Compost Spreader'],
      bio: 'Grade B cooperative gardener known for precise hedge trimming, lawn maintenance, and seasonal flowering plant management.'
    },
    {
      id: 'w_gard_2b',
      name: 'Ratan Mali',
      avatar: '🌺',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Skilled Plant Nursery & Soil Health Worker',
      grade: 'B',
      rating: 4.70, reviewsCount: 63, score: 85, jobs: 51,
      distanceMeters: 1700, etaMins: 14,
      lat: 28.5315, lng: 77.2180,
      phone: '+91 9811244558',
      coopId: 'COOP-26089-RM',
      society: 'National Labour Agro & Horti Federation #09',
      baseFare: 245, distanceChargePerKm: 18, serviceFare: 340,
      experienceYears: 5,
      specialties: ['Soil Aeration & Conditioning', 'Nursery Plant Selection', 'Fertilizer Application', 'Plant Disease Diagnosis'],
      tools: ['Soil Auger', 'pH Meter', 'Pruning Shears', 'Watering Can & Hose'],
      bio: 'Experienced cooperative nursery worker skilled in soil health management, plant disease control, and seasonal planting schedules.'
    },
    {
      id: 'w_gard_3',
      name: 'Suresh Mali',
      avatar: '🪴',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Certified Urban Garden Maintenance Worker',
      grade: 'C',
      rating: 4.60, reviewsCount: 31, score: 81, jobs: 24,
      distanceMeters: 1420, etaMins: 12,
      lat: 28.5350, lng: 77.2195,
      phone: '+91 9844422110',
      coopId: 'COOP-26089-SM',
      society: 'Delhi NCR Green Cooperative Society #07',
      baseFare: 180, distanceChargePerKm: 12, serviceFare: 280,
      experienceYears: 3,
      specialties: ['Indoor Plant Care', 'Weeding & Soil Loosening', 'Foliage Mist Sprays', 'Fertilizer Application'],
      tools: ['Hand Pruners', 'Soil Rakes', 'Watering Lance', 'Transplanting Trowels'],
      bio: 'Hardworking cooperative gardener providing reliable weekly plant maintenance and balcony gardening support.'
    },
    {
      id: 'w_gard_3a',
      name: 'Bhola Das',
      avatar: '🌻',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Certified Balcony & Pot Garden Assistant',
      grade: 'C',
      rating: 4.54, reviewsCount: 24, score: 78, jobs: 22,
      distanceMeters: 1800, etaMins: 15,
      lat: 28.5298, lng: 77.2155,
      phone: '+91 9833299441',
      coopId: 'COOP-26089-BD',
      society: 'National Labour Agro & Horti Federation #09',
      baseFare: 170, distanceChargePerKm: 12, serviceFare: 260,
      experienceYears: 2,
      specialties: ['Pot & Planter Watering', 'Balcony Garden Basic Care', 'Dead Plant Removal', 'Garden Tool Cleaning'],
      tools: ['Watering Can', 'Small Trowel', 'Pruning Scissors', 'Spray Bottle'],
      bio: 'Newly trained cooperative gardening member offering reliable balcony plant care and weekly pot maintenance services.'
    },
    {
      id: 'w_gard_3b',
      name: 'Dinesh Kachar',
      avatar: '🌼',
      category: 'gardening',
      categoryLabel: 'Gardening & Landscaping',
      trade: 'Certified Seasonal Weeding & Mulching',
      grade: 'C',
      rating: 4.50, reviewsCount: 20, score: 77, jobs: 21,
      distanceMeters: 1950, etaMins: 16,
      lat: 28.5282, lng: 77.2165,
      phone: '+91 9855288119',
      coopId: 'COOP-26089-DIN',
      society: 'Delhi NCR Green Cooperative Society #07',
      baseFare: 160, distanceChargePerKm: 12, serviceFare: 250,
      experienceYears: 2,
      specialties: ['Manual Weeding', 'Mulching Layer Application', 'Garden Path Sweeping', 'Seedling Watering'],
      tools: ['Hand Hoe', 'Weeding Fork', 'Watering Hose', 'Mulch Bags'],
      bio: 'Enthusiastic cooperative gardening trainee completing NCCT horticulture module. Affordable and punctual for weeding and mulching jobs.'
    },

    // =====================================================================
    // 3. PLUMBING & DRAINAGE (🌊 Plumbers) — 3 per grade
    // =====================================================================
    {
      id: 'w_plumb_1',
      name: 'Ramesh Kumar',
      avatar: '👨‍🔧',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Master Sanitary Engineer & Leakage Specialist',
      grade: 'A',
      rating: 4.92, reviewsCount: 158, score: 96, jobs: 114,
      distanceMeters: 420, etaMins: 4,
      lat: 28.5445, lng: 77.2162,
      phone: '+91 9811122334',
      coopId: 'COOP-26089-RK',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 280, distanceChargePerKm: 22, serviceFare: 400,
      experienceYears: 10,
      specialties: ['Concealed Pipe Burst', 'Submersible Pump Overhaul', 'Motorized Drain Jetting', 'Sanitary Bath Fittings'],
      tools: ['Ridgid Pipe Inspection Camera', 'Electric Drain Snake', 'Rothenberger Pipe Press', 'Pressure Testing Gauge'],
      bio: 'Flagship cooperative plumber, awarded NCCT Master Badge for fastest crisis turnaround during monsoon drain blockages.'
    },
    {
      id: 'w_plumb_1a',
      name: 'Ashok Pande',
      avatar: '🚰',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Master Pipeline & Sump Pump Engineer',
      grade: 'A',
      rating: 4.88, reviewsCount: 141, score: 94, jobs: 102,
      distanceMeters: 780, etaMins: 7,
      lat: 28.5418, lng: 77.2142,
      phone: '+91 9877733221',
      coopId: 'COOP-26089-AP',
      society: 'Capital Sanitary Workers Cooperative #22',
      baseFare: 270, distanceChargePerKm: 22, serviceFare: 390,
      experienceYears: 12,
      specialties: ['Overhead Tank Pipeline Fix', 'Sump Pump Rewiring', 'Bathroom Complete Refit', 'CPVC Press-Fit Plumbing'],
      tools: ['CPVC Press Tool', 'Pipe Threading Machine', 'Heavy Jetter Drain Cleaner', 'Leakage Dye Testing Kit'],
      bio: 'Grade A senior cooperative plumber with complete bathroom refit and concealed pipeline expertise across residential complexes.'
    },
    {
      id: 'w_plumb_1b',
      name: 'Girish Thakur',
      avatar: '💧',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Master Waterproofing & Drainage Design',
      grade: 'A',
      rating: 4.85, reviewsCount: 122, score: 93, jobs: 89,
      distanceMeters: 1150, etaMins: 10,
      lat: 28.5388, lng: 77.2133,
      phone: '+91 9866622113',
      coopId: 'COOP-26089-GT',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 265, distanceChargePerKm: 22, serviceFare: 385,
      experienceYears: 9,
      specialties: ['Terrace Waterproofing', 'French Drain Design', 'Toilet Seat Replacement', 'Shower Mixer Cartridge Fix'],
      tools: ['Waterproofing Membrane Roller', 'Drain Pipe Level Set', 'Drain Camera', 'Pressure Gauge Kit'],
      bio: 'Certified Grade A cooperative plumber specializing in terrace waterproofing membranes, drainage channel planning, and bathroom fixture replacements.'
    },
    {
      id: 'w_plumb_2',
      name: 'Manoj Sharma',
      avatar: '🚿',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Drainage, Tap & Sump Pump Mechanic',
      grade: 'B',
      rating: 4.74, reviewsCount: 98, score: 87, jobs: 68,
      distanceMeters: 860, etaMins: 7,
      lat: 28.5390, lng: 77.2115,
      phone: '+91 9855544332',
      coopId: 'COOP-26089-MS',
      society: 'Capital Sanitary Workers Cooperative #22',
      baseFare: 230, distanceChargePerKm: 18, serviceFare: 350,
      experienceYears: 5,
      specialties: ['Kitchen Sink Blockage', 'Toilet Flush Valves', 'RO Filter Plumbing', 'Overhead Tank Float Valve'],
      tools: ['Heavy Duty Pipe Wrench', 'Basin Wrench', 'Hand Snake Auger', 'Thread Sealant Kit'],
      bio: 'Prompt sanitary technician specialized in residential tap leaks, drain unblocking, and cistern repairs with 15-min ETA.'
    },
    {
      id: 'w_plumb_2a',
      name: 'Karim Khan',
      avatar: '🛁',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Skilled Bathroom Fitting & PVC Worker',
      grade: 'B',
      rating: 4.70, reviewsCount: 82, score: 85, jobs: 59,
      distanceMeters: 1340, etaMins: 11,
      lat: 28.5365, lng: 77.2135,
      phone: '+91 9833355224',
      coopId: 'COOP-26089-KK',
      society: 'Capital Sanitary Workers Cooperative #22',
      baseFare: 220, distanceChargePerKm: 18, serviceFare: 340,
      experienceYears: 6,
      specialties: ['PVC Pipe Joining', 'Washbasin Tap Fix', 'Shower Fitting', 'Cistern Ball Valve Replacement'],
      tools: ['PVC Solvent Cement Kit', 'Pipe Cutter', 'Adjustable Spanner', 'Thread Tape Roll'],
      bio: 'Grade B cooperative plumber skilled in PVC fittings, bathroom accessories installation, and cistern repair.'
    },
    {
      id: 'w_plumb_2b',
      name: 'Sukhram Patel',
      avatar: '🔧',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Skilled Drain Jetting & Pipe Repair',
      grade: 'B',
      rating: 4.67, reviewsCount: 74, score: 84, jobs: 52,
      distanceMeters: 1600, etaMins: 13,
      lat: 28.5338, lng: 77.2122,
      phone: '+91 9855277889',
      coopId: 'COOP-26089-SPT',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 215, distanceChargePerKm: 18, serviceFare: 330,
      experienceYears: 5,
      specialties: ['Drain Jetting & Cleaning', 'PVC Elbow & Bend Fix', 'Leaking Joint Repair', 'External Pipeline Clamping'],
      tools: ['Hand Jetter Machine', 'Plunger Set', 'PVC Repair Coupling', 'PTFE Tape Kit'],
      bio: 'Skilled Grade B cooperative plumber adept in drain jetting, pipe joint repairs, and emergency leak sealing for residential buildings.'
    },
    {
      id: 'w_plumb_3',
      name: 'Santosh Yadav',
      avatar: '🔩',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Certified Tap, RO & Geyser Fittings',
      grade: 'C',
      rating: 4.55, reviewsCount: 42, score: 80, jobs: 27,
      distanceMeters: 1730, etaMins: 14,
      lat: 28.5325, lng: 77.2175,
      phone: '+91 9877744221',
      coopId: 'COOP-26089-SY',
      society: 'Capital Sanitary Workers Cooperative #22',
      baseFare: 160, distanceChargePerKm: 12, serviceFare: 270,
      experienceYears: 2,
      specialties: ['Tap & Ball Cock Replacement', 'Kitchen RO Connections', 'Basic Drain Clearing', 'Cistern Float Valve'],
      tools: ['Adjustable Spanner Set', 'Teflon Tape Kit', 'PVC Pipe Cutter', 'Basin Wrench'],
      bio: 'Enthusiastic cooperative member completing NCCT plumbing certification. Fast response with competitive rates for household fixes.'
    },
    {
      id: 'w_plumb_3a',
      name: 'Roshan Lal',
      avatar: '🚽',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Certified Basic Tap & Toilet Repair',
      grade: 'C',
      rating: 4.50, reviewsCount: 33, score: 79, jobs: 25,
      distanceMeters: 1850, etaMins: 15,
      lat: 28.5305, lng: 77.2155,
      phone: '+91 9877288456',
      coopId: 'COOP-26089-RL',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 150, distanceChargePerKm: 12, serviceFare: 260,
      experienceYears: 2,
      specialties: ['Tap Washer Replacement', 'Toilet Flush Fix', 'Basic Leakage Taping', 'Overflow Pipe Fixing'],
      tools: ['Spanner Set', 'Pliers Kit', 'Teflon Tape', 'Putty Knife'],
      bio: 'New cooperative member trained in basic plumbing repairs through NCCT module. Punctual and honest with transparent pricing.'
    },
    {
      id: 'w_plumb_3b',
      name: 'Gyan Prakash',
      avatar: '💦',
      category: 'plumbing',
      categoryLabel: 'Plumbing & Drainage',
      trade: 'Certified Minor Leak & Pipe Sealing',
      grade: 'C',
      rating: 4.47, reviewsCount: 28, score: 77, jobs: 21,
      distanceMeters: 1920, etaMins: 16,
      lat: 28.5285, lng: 77.2140,
      phone: '+91 9844311567',
      coopId: 'COOP-26089-GP',
      society: 'Capital Sanitary Workers Cooperative #22',
      baseFare: 145, distanceChargePerKm: 12, serviceFare: 250,
      experienceYears: 1,
      specialties: ['Pipe Leak Putty Sealing', 'Clogged Sink Clearing', 'Ball Cock Adjustment', 'Water Meter Connection Check'],
      tools: ['Epoxy Putty Stick', 'Plunger', 'Teflon Tape', 'Basic Spanner'],
      bio: 'Junior cooperative plumber on supervised NCCT field training. Excellent value for minor leak patching and sink clearing.'
    },

    // =====================================================================
    // 4. ELECTRICAL & WIRING (⚡ Electricians) — 3 per grade
    // =====================================================================
    {
      id: 'w_elec_1',
      name: 'Mohd. Imran',
      avatar: '⚡',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Master High Voltage & Inverter Tech',
      grade: 'A',
      rating: 4.89, reviewsCount: 134, score: 95, jobs: 86,
      distanceMeters: 640, etaMins: 6,
      lat: 28.5460, lng: 77.2110,
      phone: '+91 9833344556',
      coopId: 'COOP-26089-MI',
      society: 'Metro Electrical Workers Cooperative Union #14',
      baseFare: 250, distanceChargePerKm: 22, serviceFare: 380,
      experienceYears: 11,
      specialties: ['Short Circuit Diagnostics', 'Solar Inverter Synchronization', 'MCB Distribution Board', '3-Phase Motor Wiring'],
      tools: ['Fluke Digital Multimeter', 'Non-Contact Voltage Detector', 'Wire Stripper Crimper', 'Insulated Toolset 1000V'],
      bio: 'Licensed electrical supervisor with Grade A certification. Zero accident record across 86+ completed community gigs.'
    },
    {
      id: 'w_elec_1a',
      name: 'Ravi Shankar',
      avatar: '🔋',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Master Solar & Inverter Battery Expert',
      grade: 'A',
      rating: 4.87, reviewsCount: 128, score: 94, jobs: 82,
      distanceMeters: 1050, etaMins: 9,
      lat: 28.5430, lng: 77.2120,
      phone: '+91 9811355678',
      coopId: 'COOP-26089-RSH',
      society: 'Metro Electrical Workers Cooperative Union #14',
      baseFare: 245, distanceChargePerKm: 22, serviceFare: 375,
      experienceYears: 10,
      specialties: ['Solar Panel Wiring', 'Battery Bank Setup', 'UPS Bypass Wiring', 'DB Box Load Balancing'],
      tools: ['Solar I-V Curve Tracer', 'Insulation Resistance Tester', 'Crimping Tool Kit', 'Differential Relay Tester'],
      bio: 'Grade A certified solar and inverter specialist. Installed 50+ residential solar systems across cooperative housing societies.'
    },
    {
      id: 'w_elec_1b',
      name: 'Balram Tripathi',
      avatar: '🔦',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Master Industrial & Residential Wiring',
      grade: 'A',
      rating: 4.83, reviewsCount: 109, score: 92, jobs: 78,
      distanceMeters: 1480, etaMins: 12,
      lat: 28.5388, lng: 77.2105,
      phone: '+91 9877322145',
      coopId: 'COOP-26089-BT',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 240, distanceChargePerKm: 22, serviceFare: 370,
      experienceYears: 9,
      specialties: ['Three-Phase Motor Control', 'Electrical Audit & Safety Report', 'Earthing Pit Installation', 'Fire Alarm Wiring'],
      tools: ['Earth Resistance Tester', 'Phase Rotation Meter', 'Cable Tray Cutter', 'Thermal Camera'],
      bio: 'Senior Grade A cooperative electrician specializing in industrial-grade residential wiring, earthing systems, and electrical safety audits.'
    },
    {
      id: 'w_elec_2',
      name: 'Vikramaditya Rao',
      avatar: '🔌',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Domestic Wiring, Switchboard & Safety Tech',
      grade: 'B',
      rating: 4.76, reviewsCount: 77, score: 86, jobs: 54,
      distanceMeters: 1250, etaMins: 11,
      lat: 28.5355, lng: 77.2205,
      phone: '+91 9866655443',
      coopId: 'COOP-26089-VR',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 200, distanceChargePerKm: 18, serviceFare: 320,
      experienceYears: 6,
      specialties: ['Ceiling Fan Installation', 'Modular Switchboard Upgrades', 'Earthing Leakage Fix', 'LED Chandelier Mounting'],
      tools: ['Kusam-Meco Clamp Meter', 'Dewalt Hammer Drill', 'Conduit Bender', 'Insulated Screwdrivers'],
      bio: 'Certified domestic wireman known for prompt, safe, and tidy residential electrical troubleshooting.'
    },
    {
      id: 'w_elec_2a',
      name: 'Tukaram Pawar',
      avatar: '🛡️',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Skilled Domestic Wiring & MCB Fitter',
      grade: 'B',
      rating: 4.72, reviewsCount: 68, score: 85, jobs: 57,
      distanceMeters: 1560, etaMins: 13,
      lat: 28.5328, lng: 77.2182,
      phone: '+91 9844488221',
      coopId: 'COOP-26089-TP',
      society: 'Metro Electrical Workers Cooperative Union #14',
      baseFare: 195, distanceChargePerKm: 18, serviceFare: 315,
      experienceYears: 6,
      specialties: ['MCB Fuse Box Fixing', 'Power Socket Addition', 'Two-Way Switch Wiring', 'Indoor Cable Routing'],
      tools: ['Cable Stripper', 'MCB Tester', 'Wire Routing Fish Tape', 'Insulated Pliers'],
      bio: 'Grade B cooperative electrician specializing in modular MCB boards, power socket additions, and indoor cable routing without wall breakage.'
    },
    {
      id: 'w_elec_2b',
      name: 'Arvind Negi',
      avatar: '💡',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Skilled LED, Fan & Light Fitting Worker',
      grade: 'B',
      rating: 4.68, reviewsCount: 61, score: 83, jobs: 52,
      distanceMeters: 1780, etaMins: 15,
      lat: 28.5295, lng: 77.2195,
      phone: '+91 9877400221',
      coopId: 'COOP-26089-AN',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 190, distanceChargePerKm: 18, serviceFare: 308,
      experienceYears: 5,
      specialties: ['LED Strip Lighting', 'Ceiling Fan Capacitor Fix', 'Exhaust Fan Fitting', 'Smart Bulb & Dimmer Setup'],
      tools: ['LED Driver Tester', 'Capacitor Meter', 'Drilling Machine', 'Wiring Diagram Reference Kit'],
      bio: 'Grade B cooperative electrician focused on LED lighting installations, smart light setups, fan capacitor fixes, and exhaust fan fittings.'
    },
    {
      id: 'w_elec_3',
      name: 'Pradeep Meena',
      avatar: '🔦',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Certified Fan, Tube & Basic Wiring Fitter',
      grade: 'C',
      rating: 4.50, reviewsCount: 34, score: 79, jobs: 23,
      distanceMeters: 1680, etaMins: 14,
      lat: 28.5320, lng: 77.2090,
      phone: '+91 9811277334',
      coopId: 'COOP-26089-PM',
      society: 'Metro Electrical Workers Cooperative Union #14',
      baseFare: 140, distanceChargePerKm: 12, serviceFare: 240,
      experienceYears: 2,
      specialties: ['Tube Light Fitting', 'Socket & Switch Replacement', 'Bell & Doorbell Wiring', 'Plug & Extension Repair'],
      tools: ['Voltage Tester Pen', 'Basic Screwdriver Set', 'Wire Cutter', 'Insulation Tape Rolls'],
      bio: 'Enthusiastic cooperative trainee completing NCCT wiring certification. Reliable for minor domestic electrical fixes at affordable rates.'
    },
    {
      id: 'w_elec_3a',
      name: 'Dheeraj Kumawat',
      avatar: '🔑',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Certified Socket & Switch Replacement',
      grade: 'C',
      rating: 4.46, reviewsCount: 27, score: 77, jobs: 22,
      distanceMeters: 1900, etaMins: 16,
      lat: 28.5288, lng: 77.2108,
      phone: '+91 9844266110',
      coopId: 'COOP-26089-DK2',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 130, distanceChargePerKm: 12, serviceFare: 230,
      experienceYears: 1,
      specialties: ['Socket Replacement', 'Switch Plate Fixing', 'Extension Cord Repairs', 'Indicator Light Fitting'],
      tools: ['Flathead Screwdriver', 'Insulated Pliers', 'Voltage Tester Pen', 'Cable Ties'],
      bio: 'Junior cooperative electrician on supervised training. Fast, safe, and affordable for minor socket and switch jobs.'
    },
    {
      id: 'w_elec_3b',
      name: 'Ganesh Bhatt',
      avatar: '🌟',
      category: 'electrical',
      categoryLabel: 'Electrical & Wiring',
      trade: 'Certified Appliance Plug & Power Strip Work',
      grade: 'C',
      rating: 4.43, reviewsCount: 22, score: 76, jobs: 21,
      distanceMeters: 1970, etaMins: 16,
      lat: 28.5278, lng: 77.2120,
      phone: '+91 9877366112',
      coopId: 'COOP-26089-GB',
      society: 'Metro Electrical Workers Cooperative Union #14',
      baseFare: 125, distanceChargePerKm: 12, serviceFare: 225,
      experienceYears: 1,
      specialties: ['Power Strip Replacement', 'Plug Top Rewiring', 'Fuse Replacement', 'Basic Cable Tying'],
      tools: ['Wire Stripper', 'Screwdriver Set', 'Fuse Tester', 'Electrical Tape'],
      bio: 'Trainee cooperative member undergoing NCCT basic wiring course. Budget-friendly for simple plug and power strip replacements.'
    },

    // =====================================================================
    // 5. PAINTING & WHITEWASHING (🎨 Painters) — 3 per grade
    // =====================================================================
    {
      id: 'w_paint_1',
      name: 'Dinesh Kumar',
      avatar: '🎨',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Master Waterproof & Texture Painter',
      grade: 'A',
      rating: 4.91, reviewsCount: 118, score: 94, jobs: 82,
      distanceMeters: 750, etaMins: 7,
      lat: 28.5415, lng: 77.2170,
      phone: '+91 9877766554',
      coopId: 'COOP-26089-DK',
      society: 'Vibrant Artisans Painting Cooperative #31',
      baseFare: 340, distanceChargePerKm: 25, serviceFare: 500,
      experienceYears: 13,
      specialties: ['Terrace Damp Proofing', 'Royal Texture Walls', 'Spray Painting Doors', 'Anti-Fungal Exterior Coat'],
      tools: ['Graco Airless Paint Sprayer', 'Dustless Wall Sander', 'Laser Leveler', 'Telescopic Roller Poles'],
      bio: 'Master artisan painter with over 80 verified projects. Expert in monsoon moisture sealing, Asian Paints textures, and enamel finishes.'
    },
    {
      id: 'w_paint_1a',
      name: 'Navin Pillai',
      avatar: '🖼️',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Master Exterior & Premium Finish Painter',
      grade: 'A',
      rating: 4.88, reviewsCount: 104, score: 93, jobs: 79,
      distanceMeters: 1180, etaMins: 10,
      lat: 28.5390, lng: 77.2178,
      phone: '+91 9822344556',
      coopId: 'COOP-26089-NP',
      society: 'Vibrant Artisans Painting Cooperative #31',
      baseFare: 330, distanceChargePerKm: 25, serviceFare: 490,
      experienceYears: 11,
      specialties: ['Exterior APEX Paint', 'Weathershield Coat', 'Staircase Enamel Banisters', 'Terrace Lime Wash'],
      tools: ['Telescopic Extension Roller', 'Airless Spray Gun', 'Taping Knife', 'NIOSH Respirator Mask'],
      bio: 'Grade A certified master painter for full exterior repainting, weathershield coatings, and premium interior texture finishes.'
    },
    {
      id: 'w_paint_1b',
      name: 'Amar Singh Rawat',
      avatar: '🖌️',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Master Interior Luxury & Stencil Painter',
      grade: 'A',
      rating: 4.84, reviewsCount: 96, score: 91, jobs: 76,
      distanceMeters: 1650, etaMins: 13,
      lat: 28.5338, lng: 77.2168,
      phone: '+91 9844566778',
      coopId: 'COOP-26089-ASR',
      society: 'Labour Cooperative Federation #41',
      baseFare: 320, distanceChargePerKm: 25, serviceFare: 480,
      experienceYears: 9,
      specialties: ['Stencil Wall Art', 'False Ceiling Paint Finish', 'Wallpaper-Effect Texture', 'Kids Room Theme Paint'],
      tools: ['Stencil Cutting Machine', 'Metallic Paint Mixer', 'Graduated Roller Kit', 'Tape & Masking Protector'],
      bio: 'Creative Grade A cooperative painter specializing in luxury stencil art, themed children\'s rooms, and decorative false ceiling finishes.'
    },
    {
      id: 'w_paint_2',
      name: 'Sunil Verma',
      avatar: '🎭',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Interior Wall Putty & Enamel Painter',
      grade: 'B',
      rating: 4.72, reviewsCount: 81, score: 85, jobs: 52,
      distanceMeters: 1380, etaMins: 12,
      lat: 28.5475, lng: 77.2095,
      phone: '+91 9888877665',
      coopId: 'COOP-26089-SV',
      society: 'Labour Cooperative Federation #41',
      baseFare: 270, distanceChargePerKm: 20, serviceFare: 420,
      experienceYears: 5,
      specialties: ['Wall Putty Smoothing', 'Enamel Grill Painting', 'Room Repainting', 'Water Seepage Patching'],
      tools: ['Putty Knife Blades', 'Foam Roller Kits', 'Drop Cloth Protectors', 'Paint Mixer Machine'],
      bio: 'Reliable and punctual interior painter. Delivers dust-free wall preparations with clean floor masking.'
    },
    {
      id: 'w_paint_2a',
      name: 'Harpal Dhawan',
      avatar: '🎪',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Skilled Distemper & Acrylic Wall Painter',
      grade: 'B',
      rating: 4.69, reviewsCount: 71, score: 84, jobs: 57,
      distanceMeters: 1620, etaMins: 13,
      lat: 28.5328, lng: 77.2175,
      phone: '+91 9822266889',
      coopId: 'COOP-26089-HD',
      society: 'Vibrant Artisans Painting Cooperative #31',
      baseFare: 260, distanceChargePerKm: 20, serviceFare: 410,
      experienceYears: 6,
      specialties: ['Acrylic Matt Emulsion', 'Distemper Full-Room Coat', 'Primer & Putty Finish', 'Paint Stripper Work'],
      tools: ['12-inch Brush Set', '10-litre Bucket Holders', 'Paint Strainer', 'Spray Bottle Kit'],
      bio: 'Grade B cooperative painter with wide experience in full-room distemper, acrylic emulsion walls, and smooth putty finishes.'
    },
    {
      id: 'w_paint_2b',
      name: 'Bharat Lal',
      avatar: '🖍️',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Skilled Enamel & Metal Surface Painter',
      grade: 'B',
      rating: 4.65, reviewsCount: 62, score: 82, jobs: 51,
      distanceMeters: 1850, etaMins: 15,
      lat: 28.5298, lng: 77.2190,
      phone: '+91 9866100345',
      coopId: 'COOP-26089-BL',
      society: 'Labour Cooperative Federation #41',
      baseFare: 255, distanceChargePerKm: 20, serviceFare: 405,
      experienceYears: 5,
      specialties: ['MS Gate Enamel Paint', 'Railing Rust Proofing', 'Metal Window Frame Coat', 'Pipe Anti-Corrosion Spray'],
      tools: ['Spray Enamel Can Set', 'Wire Brush', 'Primer Coat Roller', 'Rust Neutralizer'],
      bio: 'Grade B cooperative painter specializing in enamel metal gates, window grills, staircase railings, and anti-rust exterior metal coating.'
    },
    {
      id: 'w_paint_3',
      name: 'Deepu Rathore',
      avatar: '🖋️',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Certified Whitewash & Distemper Worker',
      grade: 'C',
      rating: 4.48, reviewsCount: 29, score: 78, jobs: 21,
      distanceMeters: 1850, etaMins: 15,
      lat: 28.5300, lng: 77.2200,
      phone: '+91 9855511228',
      coopId: 'COOP-26089-DR',
      society: 'Vibrant Artisans Painting Cooperative #31',
      baseFare: 160, distanceChargePerKm: 14, serviceFare: 300,
      experienceYears: 2,
      specialties: ['Basic Whitewash', 'Distemper Coat Single Room', 'Boundary Wall Lime Coat', 'Ceiling Basic Paint'],
      tools: ['Brush & Roller Set', 'Lime Mixing Bucket', 'Masking Tape', 'Plastic Drop Sheet'],
      bio: 'Cooperative painter member completing NCCT certification. Good value for basic whitewash and single-room distemper jobs.'
    },
    {
      id: 'w_paint_3a',
      name: 'Mohit Jangra',
      avatar: '🎯',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Certified Single-Room Painting Assistant',
      grade: 'C',
      rating: 4.44, reviewsCount: 23, score: 76, jobs: 22,
      distanceMeters: 1940, etaMins: 16,
      lat: 28.5282, lng: 77.2210,
      phone: '+91 9877133445',
      coopId: 'COOP-26089-MJ',
      society: 'Labour Cooperative Federation #41',
      baseFare: 150, distanceChargePerKm: 14, serviceFare: 290,
      experienceYears: 1,
      specialties: ['Single Room Brush Painting', 'Skirting Board Paint', 'Putty Touch-Up', 'Door Frame Painting'],
      tools: ['2-inch Paint Brush', 'Roller & Tray', 'Masking Tape', 'Sandpaper Pack'],
      bio: 'Junior cooperative painter on supervised training. Fast and affordable for single rooms, door frames, and basic touch-up painting.'
    },
    {
      id: 'w_paint_3b',
      name: 'Kapil Jat',
      avatar: '🖊️',
      category: 'painting',
      categoryLabel: 'House Painting & Whitewash',
      trade: 'Certified Touch-Up & Lime Wash Worker',
      grade: 'C',
      rating: 4.41, reviewsCount: 20, score: 75, jobs: 21,
      distanceMeters: 1980, etaMins: 17,
      lat: 28.5272, lng: 77.2198,
      phone: '+91 9844222558',
      coopId: 'COOP-26089-KJ',
      society: 'Vibrant Artisans Painting Cooperative #31',
      baseFare: 145, distanceChargePerKm: 14, serviceFare: 285,
      experienceYears: 1,
      specialties: ['Wall Touch-Up Patch', 'Lime Wash Compound Work', 'Ceiling White Coat', 'Basic Primer Application'],
      tools: ['Lime Brush', 'Paint Mixing Stick', 'Roller Sponge', 'Drop Sheet'],
      bio: 'New cooperative member undergoing NCCT painting apprenticeship. Reliable for basic touch-up patches, lime wash, and primer coats.'
    },

    // =====================================================================
    // 6. MASONRY & TILE WORK (🧱 Masons) — 3 per grade
    // =====================================================================
    {
      id: 'w_mas_1',
      name: 'Jagdish Prasad',
      avatar: '🧱',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Master Bricklayer & Tile Setter',
      grade: 'A',
      rating: 4.94, reviewsCount: 129, score: 96, jobs: 91,
      distanceMeters: 890, etaMins: 8,
      lat: 28.5385, lng: 77.2140,
      phone: '+91 9899988776',
      coopId: 'COOP-26089-JP',
      society: 'Building Crafts Cooperative Guild #05',
      baseFare: 320, distanceChargePerKm: 24, serviceFare: 480,
      experienceYears: 15,
      specialties: ['Vitrified Tile Laying', 'Granite Kitchen Countertop', 'Structural Plastering', 'Balcony Water Channeling'],
      tools: ['Ruby Tile Cutter', 'Laser Alignment Cross', 'Vibrating Suction Cup', 'Masonry Trowel Set'],
      bio: 'Master civil craftsman with 90+ verified gigs. Renowned for perfect tile levelling and crack-resistant masonry repair.'
    },
    {
      id: 'w_mas_1a',
      name: 'Devraj Saini',
      avatar: '🏛️',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Master Structural Mason & Waterproofing',
      grade: 'A',
      rating: 4.90, reviewsCount: 112, score: 94, jobs: 84,
      distanceMeters: 1240, etaMins: 10,
      lat: 28.5360, lng: 77.2148,
      phone: '+91 9866399001',
      coopId: 'COOP-26089-DS',
      society: 'Building Crafts Cooperative Guild #05',
      baseFare: 310, distanceChargePerKm: 24, serviceFare: 470,
      experienceYears: 12,
      specialties: ['Crack Injection Waterproofing', 'Bathroom Renovation Tile', 'Floor Screeding', 'Brick Boundary Repair'],
      tools: ['Injection Gun Kit', 'Grout Float', 'Floor Level Screed', 'Masonry Hammer Drill'],
      bio: 'Grade A cooperative mason expert in structural crack injection, bathroom renovation tiling, and floor levelling for flats and villas.'
    },
    {
      id: 'w_mas_1b',
      name: 'Ramvilas Patel',
      avatar: '🏗️',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Master Marble & Granite Fixing Specialist',
      grade: 'A',
      rating: 4.86, reviewsCount: 98, score: 92, jobs: 78,
      distanceMeters: 1650, etaMins: 14,
      lat: 28.5325, lng: 77.2155,
      phone: '+91 9877244003',
      coopId: 'COOP-26089-RVP',
      society: 'National Labour Masonry Union #19',
      baseFare: 300, distanceChargePerKm: 24, serviceFare: 460,
      experienceYears: 10,
      specialties: ['Italian Marble Fixing', 'Granite Countertop Polish', 'Step & Riser Marble Work', 'Mirror Edge Grinding'],
      tools: ['Diamond Blade Grinder', 'Marble Polish Machine', 'Suction Cup Lifter', 'Spirit Level (2m)'],
      bio: 'Certified Grade A cooperative mason specializing in premium Italian marble, polished granite countertops, and stone edge cutting.'
    },
    {
      id: 'w_mas_2',
      name: 'Raghuveer Singh',
      avatar: '🔨',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Skilled Tile Fixing & Plastering Mason',
      grade: 'B',
      rating: 4.71, reviewsCount: 68, score: 84, jobs: 57,
      distanceMeters: 1200, etaMins: 10,
      lat: 28.5360, lng: 77.2145,
      phone: '+91 9822211334',
      coopId: 'COOP-26089-RGS',
      society: 'National Labour Masonry Union #19',
      baseFare: 250, distanceChargePerKm: 20, serviceFare: 420,
      experienceYears: 7,
      specialties: ['Bathroom Floor Tiles', 'Exterior Plastering', 'Staircase Edge Tiling', 'Drainage Channel Grouting'],
      tools: ['Angle Grinder Disc Set', 'Notched Trowel Kit', 'Tile Adhesive Mixer', 'Rubber Mallet'],
      bio: 'Steady and experienced cooperative mason. Expert in floor tile laying, smooth plastering, and bathroom waterproofing.'
    },
    {
      id: 'w_mas_2a',
      name: 'Mohan Suthar',
      avatar: '⚒️',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Skilled Cement Plastering & Pointing',
      grade: 'B',
      rating: 4.67, reviewsCount: 60, score: 83, jobs: 55,
      distanceMeters: 1470, etaMins: 12,
      lat: 28.5338, lng: 77.2152,
      phone: '+91 9844477002',
      coopId: 'COOP-26089-MOS',
      society: 'Building Crafts Cooperative Guild #05',
      baseFare: 240, distanceChargePerKm: 20, serviceFare: 410,
      experienceYears: 6,
      specialties: ['Brick Pointing', 'Wall Plaster Resurfacing', 'Mud Mortar Patching', 'Expansion Joint Filling'],
      tools: ['Margin Trowel', 'Pointing Iron', 'Mortar Hawk', 'Foam Backer Rod'],
      bio: 'Grade B cooperative mason with expertise in brick-pointing, external plaster resurfacing, and expansion joint sealing for old buildings.'
    },
    {
      id: 'w_mas_2b',
      name: 'Vikash Kumar',
      avatar: '🪨',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Skilled Paver Block & Garden Stone',
      grade: 'B',
      rating: 4.63, reviewsCount: 54, score: 82, jobs: 52,
      distanceMeters: 1720, etaMins: 14,
      lat: 28.5308, lng: 77.2162,
      phone: '+91 9822388445',
      coopId: 'COOP-26089-VK',
      society: 'National Labour Masonry Union #19',
      baseFare: 235, distanceChargePerKm: 20, serviceFare: 400,
      experienceYears: 5,
      specialties: ['Paver Block Driveway', 'Garden Stone Path', 'Cobblestone Fixing', 'Curb Stone Setting'],
      tools: ['Paving Plate Compactor', 'Rubber Dead Blow Hammer', 'Sand Screeder', 'Joining Sand Bag'],
      bio: 'Skilled Grade B cooperative mason specializing in paver block driveways, decorative garden stone paths, and cobblestone areas.'
    },
    {
      id: 'w_mas_3',
      name: 'Bhupender Rawat',
      avatar: '🧰',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Certified Wall Patching & Grouting Mason',
      grade: 'C',
      rating: 4.62, reviewsCount: 45, score: 82, jobs: 34,
      distanceMeters: 1550, etaMins: 13,
      lat: 28.5330, lng: 77.2160,
      phone: '+91 9811144556',
      coopId: 'COOP-26089-BR',
      society: 'National Labour Masonry Union #19',
      baseFare: 175, distanceChargePerKm: 14, serviceFare: 320,
      experienceYears: 4,
      specialties: ['Epoxy Tile Grouting', 'Wall Crack Injection', 'Paving Block Laying', 'Small Boundary Wall Fix'],
      tools: ['Epoxy Float', 'Rubber Mallet', 'Spirit Level', 'Cement Mixing Pan'],
      bio: 'Quick-response cooperative mason skilled in tile repair, floor regrouting, and damp plaster restoration.'
    },
    {
      id: 'w_mas_3a',
      name: 'Pappu Khatik',
      avatar: '🔧',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Certified Tile Grout & Basic Repair',
      grade: 'C',
      rating: 4.55, reviewsCount: 36, score: 80, jobs: 28,
      distanceMeters: 1780, etaMins: 15,
      lat: 28.5302, lng: 77.2168,
      phone: '+91 9877155889',
      coopId: 'COOP-26089-PK',
      society: 'Building Crafts Cooperative Guild #05',
      baseFare: 165, distanceChargePerKm: 14, serviceFare: 310,
      experienceYears: 3,
      specialties: ['Old Grout Removal', 'New Grout Application', 'Cracked Tile Replacement', 'Adhesive Tile Re-bonding'],
      tools: ['Grout Remover Saw', 'Margin Trowel', 'Sponge & Bucket', 'Rubber Squeegee'],
      bio: 'Grade C cooperative mason undergoing full NCCT tile certification. Reliable and cost-effective for grouting and cracked tile replacement.'
    },
    {
      id: 'w_mas_3b',
      name: 'Shyam Lal Gurjar',
      avatar: '🏚️',
      category: 'masonry',
      categoryLabel: 'Masonry & Tile Construction',
      trade: 'Certified Minor Plaster & Wall Patch',
      grade: 'C',
      rating: 4.50, reviewsCount: 28, score: 78, jobs: 22,
      distanceMeters: 1900, etaMins: 16,
      lat: 28.5285, lng: 77.2172,
      phone: '+91 9844177001',
      coopId: 'COOP-26089-SLG',
      society: 'National Labour Masonry Union #19',
      baseFare: 155, distanceChargePerKm: 14, serviceFare: 300,
      experienceYears: 2,
      specialties: ['Wall Crack Filling', 'Spalling Plaster Repair', 'Cement Patch Mix', 'Waterproof Band-Aid Coat'],
      tools: ['Putty Knife', 'Cement Mix Trowel', 'Bonding Liquid', 'Sand Mix Bucket'],
      bio: 'Junior cooperative mason completing NCCT civil repair module. Economical and diligent for minor plaster patching and wall crack repairs.'
    },

    // =====================================================================
    // 7. DEEP CLEANING & SANITIZATION (🧹 Cleaners) — 3 per grade
    // =====================================================================
    {
      id: 'w_clean_1',
      name: 'Sunita Devi',
      avatar: '👩‍🔧',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Master Sanitization & Waste Management Lead',
      grade: 'A',
      rating: 4.95, reviewsCount: 210, score: 97, jobs: 98,
      distanceMeters: 650, etaMins: 6,
      lat: 28.5398, lng: 77.2185,
      phone: '+91 9822233445',
      coopId: 'COOP-26089-SD',
      society: 'Mahila Labour Cooperative Society #02',
      baseFare: 380, distanceChargePerKm: 26, serviceFare: 600,
      experienceYears: 9,
      specialties: ['Water Tank Disinfection', 'Post-Construction Scrub', 'Kitchen Chimney De-greasing', 'Bio-Degradable Sanitizing'],
      tools: ['Karcher High-Pressure Jet', 'Industrial Floor Polisher', 'Steam Sterilizer', 'HEPA Vacuum Cleaner'],
      bio: 'Leader of Women Cooperative Self-Help Federation. 98+ 5-star completions with 100% eco-friendly compounds.'
    },
    {
      id: 'w_clean_1a',
      name: 'Geetha Bai',
      avatar: '🌊',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Master Water Tank & Bio-Pest Specialist',
      grade: 'A',
      rating: 4.92, reviewsCount: 176, score: 96, jobs: 90,
      distanceMeters: 1100, etaMins: 9,
      lat: 28.5405, lng: 77.2175,
      phone: '+91 9844411223',
      coopId: 'COOP-26089-GB2',
      society: 'Mahila Labour Cooperative Society #02',
      baseFare: 370, distanceChargePerKm: 26, serviceFare: 580,
      experienceYears: 8,
      specialties: ['Rooftop Water Tank Chlorination', 'Kitchen Exhaust Deep Clean', 'Pest Gel Barrier Placement', 'Bathroom Acid Descaling'],
      tools: ['Pressure Jet 120 Bar', 'Foam Generator Nozzle', 'Bio-Pest Gel Gun', 'Anti-Mold Spray Kit'],
      bio: 'Grade A Mahila Coop sanitization expert. Specializes in tank chlorination, commercial kitchen cleaning, and bio-pest barrier protection.'
    },
    {
      id: 'w_clean_1b',
      name: 'Padma Subramaniam',
      avatar: '✨',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Master Post-Construction & Renovation Cleaning',
      grade: 'A',
      rating: 4.89, reviewsCount: 148, score: 94, jobs: 83,
      distanceMeters: 1480, etaMins: 12,
      lat: 28.5362, lng: 77.2192,
      phone: '+91 9877599002',
      coopId: 'COOP-26089-PS2',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 360, distanceChargePerKm: 26, serviceFare: 570,
      experienceYears: 7,
      specialties: ['Post-Renovation Dust Removal', 'Marble & Granite Floor Polish', 'Paint Splatter Cleaning', 'Aluminium Frame Scrubbing'],
      tools: ['Industrial Vacuum (HEPA)', 'Marble Polish Pad', 'Paint Remover Liquid', 'Microfiber Mop System'],
      bio: 'Grade A post-construction cleaning expert. Leaves newly renovated flats spotless — paint splatter, cement dust, and glazed floor polishing.'
    },
    {
      id: 'w_clean_2',
      name: 'Kavita Verma',
      avatar: '🧹',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Deep Cleaning & Bio-Pest Shield',
      grade: 'B',
      rating: 4.79, reviewsCount: 102, score: 88, jobs: 64,
      distanceMeters: 1450, etaMins: 11,
      lat: 28.5490, lng: 77.2210,
      phone: '+91 9855566778',
      coopId: 'COOP-26089-KV',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 300, distanceChargePerKm: 22, serviceFare: 520,
      experienceYears: 5,
      specialties: ['Bathroom Acid-Free Scrub', 'Sofa Upholstery Steam', 'Cockroach & Ant Gel Shield', 'Balcony Jet Wash'],
      tools: ['Heavy Duty Rotary Scrubber', 'Upholstery Extractor', 'Fumigation Mister', 'Microfiber Kits'],
      bio: 'Specialist in residential deep-cleaning and organic pest protection. Zero harsh chemicals used.'
    },
    {
      id: 'w_clean_2a',
      name: 'Anita Sharma',
      avatar: '🧼',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Skilled Sofa, Carpet & Upholstery Cleaner',
      grade: 'B',
      rating: 4.75, reviewsCount: 87, score: 86, jobs: 60,
      distanceMeters: 1700, etaMins: 14,
      lat: 28.5322, lng: 77.2205,
      phone: '+91 9833266115',
      coopId: 'COOP-26089-AS2',
      society: 'Mahila Labour Cooperative Society #02',
      baseFare: 290, distanceChargePerKm: 22, serviceFare: 510,
      experienceYears: 5,
      specialties: ['3-Seater Sofa Steam Clean', 'Carpet Shampoo & Dry', 'Mattress UV Sanitization', 'Chair Upholstery Scrub'],
      tools: ['Hot Water Extraction Machine', 'UV Sanitizer Wand', 'Foam Shampoo Brush', 'Stain Remover Spray'],
      bio: 'Grade B Mahila Coop upholstery cleaning specialist. Sofa steam cleaning, carpet shampooing, and mattress UV sanitization are her forte.'
    },
    {
      id: 'w_clean_2b',
      name: 'Meena Thakur',
      avatar: '🪣',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Skilled Kitchen & Bathroom Deep Cleaner',
      grade: 'B',
      rating: 4.71, reviewsCount: 76, score: 85, jobs: 53,
      distanceMeters: 1870, etaMins: 15,
      lat: 28.5295, lng: 77.2218,
      phone: '+91 9877422334',
      coopId: 'COOP-26089-MT',
      society: 'Mahila Labour Cooperative Society #02',
      baseFare: 285, distanceChargePerKm: 22, serviceFare: 500,
      experienceYears: 4,
      specialties: ['Gas Stove Deep Clean', 'Exhaust Grease Removal', 'Toilet Bowl Acid Wash', 'Basin & Sink Descaling'],
      tools: ['Degreaser Spray Pump', 'Drain Auger Brush', 'Acid-Safe Gloves', 'Abrasive Pad Set'],
      bio: 'Grade B cooperative cleaning specialist focused on kitchen and bathroom deep scrubbing, gas hob degreasing, and toilet descaling.'
    },
    {
      id: 'w_clean_3',
      name: 'Rekha Kumari',
      avatar: '🧽',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Certified Household Cleaning & Dusting',
      grade: 'C',
      rating: 4.52, reviewsCount: 36, score: 80, jobs: 26,
      distanceMeters: 1900, etaMins: 15,
      lat: 28.5295, lng: 77.2215,
      phone: '+91 9844433221',
      coopId: 'COOP-26089-RKU',
      society: 'Mahila Labour Cooperative Society #02',
      baseFare: 190, distanceChargePerKm: 14, serviceFare: 380,
      experienceYears: 2,
      specialties: ['Basic Home Dusting', 'Kitchen Surface Wipe', 'Bathroom Floor Scrub', 'Cupboard & Shelf Cleaning'],
      tools: ['Microfiber Cloth Set', 'Multipurpose Spray', 'Mop & Bucket Set', 'Scrubbing Brush'],
      bio: 'Dedicated Mahila Cooperative member trained in systematic home cleaning protocols. Honest and punctual.'
    },
    {
      id: 'w_clean_3a',
      name: 'Usha Prajapati',
      avatar: '🫧',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Certified Basic Floor & Surface Cleaning',
      grade: 'C',
      rating: 4.47, reviewsCount: 28, score: 78, jobs: 24,
      distanceMeters: 1950, etaMins: 16,
      lat: 28.5282, lng: 77.2225,
      phone: '+91 9855400117',
      coopId: 'COOP-26089-UP',
      society: 'Mahila Labour Cooperative Society #02',
      baseFare: 180, distanceChargePerKm: 14, serviceFare: 360,
      experienceYears: 2,
      specialties: ['Room Sweeping & Mopping', 'Balcony Cleaning', 'Window Glass Wipe', 'Entrance Mat Dusting'],
      tools: ['Dustpan & Brush Set', 'Mop Stick', 'Glass Cleaner Spray', 'Garbage Bags'],
      bio: 'Newly trained cooperative cleaner completing NCCT hygiene module. Affordable and cheerful for basic sweeping, mopping, and glass cleaning.'
    },
    {
      id: 'w_clean_3b',
      name: 'Sushila Devi',
      avatar: '🧺',
      category: 'cleaning',
      categoryLabel: 'Deep Cleaning & Sanitization',
      trade: 'Certified General Home Cleaning Assistant',
      grade: 'C',
      rating: 4.43, reviewsCount: 22, score: 77, jobs: 21,
      distanceMeters: 1980, etaMins: 16,
      lat: 28.5270, lng: 77.2230,
      phone: '+91 9844150002',
      coopId: 'COOP-26089-SUS',
      society: 'Delhi Labour Coop Federation #41',
      baseFare: 175, distanceChargePerKm: 14, serviceFare: 350,
      experienceYears: 1,
      specialties: ['Vessel Washing Assist', 'Cloth & Laundry Fold', 'Cupboard Organizing', 'Light Dusting Rounds'],
      tools: ['Cleaning Apron', 'Gloves & Mask', 'Spray Bottles', 'Duster Set'],
      bio: 'Junior Mahila Coop cleaning assistant undergoing NCCT training. Warm, honest, and reliable for light domestic cleaning work.'
    },

    // =====================================================================
    // 8. APPLIANCE & COOLING MECHANICS (❄️ Appliance Techs) — 3 per grade
    // =====================================================================
    {
      id: 'w_appl_1',
      name: 'Harish Chandra',
      avatar: '❄️',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'AC Compressor & Cooling Master',
      grade: 'A',
      rating: 4.90, reviewsCount: 124, score: 95, jobs: 84,
      distanceMeters: 920, etaMins: 8,
      lat: 28.5420, lng: 77.2085,
      phone: '+91 9811188990',
      coopId: 'COOP-26089-HC',
      society: 'Cooling Technicians Cooperative Society #08',
      baseFare: 340, distanceChargePerKm: 26, serviceFare: 550,
      experienceYears: 12,
      specialties: ['Split AC Jet Foam Wash', 'R32/R410A Gas Leak Fix', 'Inverter PCB Board Repair', 'Refrigerator Thermostat Overhaul'],
      tools: ['Robinair Vacuum Pump', 'Digital Manifold Gauge Set', 'Ultrasonic Gas Leak Detector', 'Fluke Thermal Imager'],
      bio: 'Certified HVAC Master Tech. Trusted across South Delhi for precision gas charging and same-day inverter PCB repair.'
    },
    {
      id: 'w_appl_1a',
      name: 'Kishan Datt',
      avatar: '🌬️',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Master AC Installation & AMC Specialist',
      grade: 'A',
      rating: 4.87, reviewsCount: 111, score: 93, jobs: 80,
      distanceMeters: 1280, etaMins: 11,
      lat: 28.5378, lng: 77.2092,
      phone: '+91 9866299001',
      coopId: 'COOP-26089-KD',
      society: 'Cooling Technicians Cooperative Society #08',
      baseFare: 330, distanceChargePerKm: 26, serviceFare: 540,
      experienceYears: 10,
      specialties: ['AC New Installation', 'Annual Maintenance Contract', 'Cassette & Duct AC Service', 'Condenser Coil Jet Wash'],
      tools: ['Refrigerant Scale & Gauge', 'Nitrogen Leak Test Kit', 'Condenser Cleaning Gun', 'Torque Wrench Set'],
      bio: 'Grade A cooling tech certified for split and cassette AC installation, annual service contracts, and condenser coil deep cleaning.'
    },
    {
      id: 'w_appl_1b',
      name: 'Narender Sharma',
      avatar: '🧊',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Master Refrigerator & Deep Freezer Expert',
      grade: 'A',
      rating: 4.84, reviewsCount: 98, score: 92, jobs: 77,
      distanceMeters: 1650, etaMins: 14,
      lat: 28.5335, lng: 77.2090,
      phone: '+91 9833199002',
      coopId: 'COOP-26089-NS',
      society: 'National Labour Appliance Guild #27',
      baseFare: 320, distanceChargePerKm: 26, serviceFare: 530,
      experienceYears: 9,
      specialties: ['Double-Door Fridge Thermostat', 'Compressor Gas Recharge', 'Ice Maker Repair', 'Deep Freezer Defrost Relay'],
      tools: ['Refrigerant Recovery Machine', 'Ohm Meter', 'Capillary Tube Cutter', 'Leak Detection Dye UV Kit'],
      bio: 'Certified Grade A refrigeration mechanic expert in frost-free fridge compressor, thermostat, and ice-maker servicing and repair.'
    },
    {
      id: 'w_appl_2',
      name: 'Sukhwinder Gill',
      avatar: '🌀',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Skilled AC Service & Refrigerator Mechanic',
      grade: 'B',
      rating: 4.73, reviewsCount: 86, score: 86, jobs: 61,
      distanceMeters: 1300, etaMins: 11,
      lat: 28.5365, lng: 77.2095,
      phone: '+91 9866600112',
      coopId: 'COOP-26089-SG',
      society: 'Cooling Technicians Cooperative Society #08',
      baseFare: 270, distanceChargePerKm: 22, serviceFare: 470,
      experienceYears: 7,
      specialties: ['Window AC Servicing', 'Fridge Gas Recharge', 'Washing Machine Drum Fix', 'Microwave Magnetron Check'],
      tools: ['Refrigerant Leak Spray', 'Clamp Multimeter', 'AC Service Cleaning Kit', 'Capacitor Tester'],
      bio: 'Reliable Grade B cooperative mechanic specializing in window and split AC servicing plus refrigerator gas recharge.'
    },
    {
      id: 'w_appl_2a',
      name: 'Jitendra Prasad',
      avatar: '⚙️',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Skilled Washing Machine & Geyser Fixer',
      grade: 'B',
      rating: 4.69, reviewsCount: 74, score: 84, jobs: 58,
      distanceMeters: 1570, etaMins: 13,
      lat: 28.5330, lng: 77.2100,
      phone: '+91 9844377889',
      coopId: 'COOP-26089-JIT',
      society: 'National Labour Appliance Guild #27',
      baseFare: 260, distanceChargePerKm: 22, serviceFare: 460,
      experienceYears: 6,
      specialties: ['Fully Automatic Washer Repair', 'Geyser Element Replacement', 'Motor Carbon Brush Fix', 'Timer Knob Replacement'],
      tools: ['Motor Winding Tester', 'Element Spanner Set', 'Relay Tester Board', 'Torque Meter'],
      bio: 'Skilled Grade B cooperative appliance mechanic with strong expertise in washing machine motor repairs and geyser element replacements.'
    },
    {
      id: 'w_appl_2b',
      name: 'Vinod Bhatt',
      avatar: '🔌',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Skilled Mixer, Grinder & Small Appliance',
      grade: 'B',
      rating: 4.65, reviewsCount: 63, score: 83, jobs: 55,
      distanceMeters: 1780, etaMins: 15,
      lat: 28.5300, lng: 77.2098,
      phone: '+91 9877011334',
      coopId: 'COOP-26089-VB',
      society: 'Cooling Technicians Cooperative Society #08',
      baseFare: 250, distanceChargePerKm: 22, serviceFare: 445,
      experienceYears: 5,
      specialties: ['Mixer Grinder Brush & Coil', 'Induction Cooktop PCB Repair', 'Juicer Blade Assembly', 'Iron Box Thermostat Fix'],
      tools: ['Soldering Iron Station', 'Brush Replacement Kit', 'PCB Tester Board', 'Adjustable Power Supply'],
      bio: 'Grade B cooperative technician for all small kitchen appliances — mixer, grinder, induction hob PCB, iron, and juicer repairs.'
    },
    {
      id: 'w_appl_3',
      name: 'Deepak Yadav',
      avatar: '🔧',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Certified Washing Machine & Geyser Mechanic',
      grade: 'C',
      rating: 4.58, reviewsCount: 62, score: 84, jobs: 38,
      distanceMeters: 1750, etaMins: 14,
      lat: 28.5340, lng: 77.2080,
      phone: '+91 9866677889',
      coopId: 'COOP-26089-DY',
      society: 'National Labour Appliance Guild #27',
      baseFare: 180, distanceChargePerKm: 14, serviceFare: 360,
      experienceYears: 4,
      specialties: ['Washing Machine Drum Belt', 'Instant Geyser Heating Rod', 'Microwave Magnetron Test', 'Mixer Grinder Motor Bush'],
      tools: ['Digital Insulation Tester', 'Heavy Duty Pulley Puller', 'Heating Element Spanner', 'Soldering Station'],
      bio: 'Grade C verified domestic appliance mechanic with fast troubleshooting for water heaters, washers, and kitchen appliances.'
    },
    {
      id: 'w_appl_3a',
      name: 'Surender Kashyap',
      avatar: '🌡️',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Certified Geyser & Electric Kettle Repair',
      grade: 'C',
      rating: 4.52, reviewsCount: 48, score: 82, jobs: 32,
      distanceMeters: 1850, etaMins: 15,
      lat: 28.5318, lng: 77.2082,
      phone: '+91 9844288111',
      coopId: 'COOP-26089-SK2',
      society: 'Cooling Technicians Cooperative Society #08',
      baseFare: 170, distanceChargePerKm: 14, serviceFare: 350,
      experienceYears: 3,
      specialties: ['Geyser Thermostat Swap', 'Kettle Element Replacement', 'Immersion Rod Fixing', 'Water Purifier Filter Change'],
      tools: ['Element Spanner', 'Continuity Tester', 'Pliers Set', 'Rubber Gloves Kit'],
      bio: 'Grade C cooperative technician trained in basic water heating appliances — geyser thermostat swaps, kettle elements, and RO filter changes.'
    },
    {
      id: 'w_appl_3b',
      name: 'Anoop Kumar',
      avatar: '🧲',
      category: 'appliance',
      categoryLabel: 'Appliance & Cooling Mechanics',
      trade: 'Certified Basic Appliance Cleaning & Check',
      grade: 'C',
      rating: 4.46, reviewsCount: 38, score: 79, jobs: 25,
      distanceMeters: 1930, etaMins: 16,
      lat: 28.5295, lng: 77.2085,
      phone: '+91 9877322001',
      coopId: 'COOP-26089-AK',
      society: 'National Labour Appliance Guild #27',
      baseFare: 160, distanceChargePerKm: 14, serviceFare: 340,
      experienceYears: 2,
      specialties: ['Fridge Coil Dusting', 'Washing Machine Tub Cleaning', 'AC Filter Rinse', 'Fan Blade Dust Removal'],
      tools: ['Soft Coil Brush', 'Compressed Air Can', 'Microfiber Cloth', 'Portable Blower'],
      bio: 'New cooperative appliance member specializing in preventive cleaning — fridge coil, washing machine tub, AC filter, and fan blade dusting.'
    }
  ]
};

// Cross-tab broadcast channel for real-time dual-device synchronization
const syncChannel = ('BroadcastChannel' in window) ? new BroadcastChannel('coopsewa_sync') : null;

// ==========================================
// 2. SYNTHETIC AUDIO ENGINE (Web Audio API)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio effect not permitted without user gesture", e);
    }
  }

  alertChime() {
    this.playTone(587.33, 'triangle', 0.18, 0.15); // D5
    setTimeout(() => this.playTone(880, 'triangle', 0.25, 0.15), 180); // A5
  }

  successChime() {
    this.playTone(523.25, 'sine', 0.12, 0.12); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.12, 0.12), 120); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.15), 240); // G5
  }

  cashRegister() {
    this.playTone(987.77, 'sine', 0.08, 0.12);
    setTimeout(() => this.playTone(1318.51, 'triangle', 0.35, 0.2), 80);
  }

  sosSiren() {
    this.playTone(800, 'sawtooth', 0.3, 0.2);
    setTimeout(() => this.playTone(600, 'sawtooth', 0.3, 0.2), 300);
    setTimeout(() => this.playTone(800, 'sawtooth', 0.3, 0.2), 600);
  }
}
const sfx = new SoundFX();

// ==========================================
// 3. MULTILINGUAL TRANSLATIONS (12+ Regional)
// ==========================================
const TRANSLATIONS = {
  en: {
    nav_customer: "Household User",
    nav_worker: "Coop Worker",
    nav_federation: "Coop Federation AI",
    household_title: "On-Demand Verified Cooperative Services",
    worker_title: "Cooperative Craftsman Terminal"
  },
  hi: {
    nav_customer: "उपभोक्ता (परिवार)",
    nav_worker: "सहकारी कामगार",
    nav_federation: "सहकार संघ AI",
    household_title: "सत्यापित सहकारी घरेलू सेवाएँ",
    worker_title: "सहकारी श्रमिक टर्मिनल (95% आय)"
  },
  ta: {
    nav_customer: "குடும்ப பயனர்",
    nav_worker: "கூட்டுறவு பணியாளர்",
    nav_federation: "கூட்டுறவு கூட்டமைப்பு",
    household_title: "சரிபார்க்கப்பட்ட கூட்டுறவு சேவைகள்",
    worker_title: "கூட்டுறவு தொழிலாளர் போர்டல்"
  },
  te: {
    nav_customer: "గృహ వినియోగదారు",
    nav_worker: "సహకార కార్మికుడు",
    nav_federation: "సహకార సమాఖ్య AI",
    household_title: "ధృవీకరించబడిన సహకార సేవలు",
    worker_title: "సహకార కార్మికుల వేదిక"
  },
  mr: {
    nav_customer: "घरगुती ग्राहक",
    nav_worker: "सहकारी कामगार",
    nav_federation: "सहकारी महासंघ AI",
    household_title: "विश्वासार्ह सहकारी सेवा",
    worker_title: "सहकारी कामगार डॅशबोर्ड"
  },
  bn: {
    nav_customer: "গৃহস্থালী গ্রাহক",
    nav_worker: "সমবায় কর্মী",
    nav_federation: "সমবায় ফেডারেশন AI",
    household_title: "যাচাইকৃত সমবায় সেবা",
    worker_title: "সমবায় কর্মী টার্মিনাল"
  }
};

function changeLanguage(langKey) {
  APP_STATE.currentLanguage = langKey;
  const dict = TRANSLATIONS[langKey] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// ==========================================
// 4. LEAFLET MAP & 2KM GEO-RADAR ENGINE
// ==========================================
let leafletMap = null;
let userHomeMarker = null;
let radarCircle = null;
let workerMarkers = [];

const USER_LOCATION = { lat: 28.5420, lng: 77.2140 }; // South Delhi Landmark

function initRadarMap() {
  const mapElement = document.getElementById('radarMap');
  if (!mapElement || leafletMap) return;

  leafletMap = L.map('radarMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([USER_LOCATION.lat, USER_LOCATION.lng], 14.6);

  // High-performance clean dark carto tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(leafletMap);

  // Custom User Home Pin (Red Pulse)
  const homeIcon = L.divIcon({
    className: 'custom-user-marker',
    html: `<div style="
      background: #ef4444; 
      width: 18px; 
      height: 18px; 
      border-radius: 50%; 
      border: 3px solid #ffffff; 
      box-shadow: 0 0 16px rgba(239, 68, 68, 0.9);
      animation: pulse-ring 1.5s infinite;
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  userHomeMarker = L.marker([USER_LOCATION.lat, USER_LOCATION.lng], { icon: homeIcon })
    .addTo(leafletMap)
    .bindPopup(`<strong>Your Residence</strong><br>Green Valley Apts (0m Center)`);

  // Draw 2.0 km Perimeter Radius (Crucial SIH Feature from PDF)
  radarCircle = L.circle([USER_LOCATION.lat, USER_LOCATION.lng], {
    radius: 2000, // 2000 meters = 2km
    color: '#10b981',
    weight: 2,
    dashArray: '6, 6',
    fillColor: '#10b981',
    fillOpacity: 0.08
  }).addTo(leafletMap);

  renderWorkerMarkers();
  renderNearbyWorkersSidebar();
}

function renderWorkerMarkers() {
  // Clear existing
  workerMarkers.forEach(m => leafletMap.removeLayer(m));
  workerMarkers = [];

  APP_STATE.nearbyWorkers.forEach(w => {
    let pinColor = '#10b981'; // Grade A
    if (w.grade === 'B') pinColor = '#3b82f6';
    if (w.grade === 'C') pinColor = '#f59e0b';

    const workerIcon = L.divIcon({
      className: 'custom-worker-marker',
      html: `<div style="
        background: ${pinColor}; 
        color: #ffffff; 
        font-weight: 800; 
        font-size: 11px;
        padding: 4px 7px; 
        border-radius: 12px; 
        border: 2px solid #ffffff; 
        box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 3px;
        cursor: pointer;
      ">${w.avatar} <span>${w.grade}</span></div>`,
      iconSize: [40, 24],
      iconAnchor: [20, 12]
    });

    const marker = L.marker([w.lat, w.lng], { icon: workerIcon })
      .addTo(leafletMap)
      .bindPopup(`
        <div style="font-family: sans-serif; min-width: 170px;">
          <strong style="font-size: 14px;">${w.name}</strong> 
          <span style="background: ${pinColor}; color: #fff; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: bold;">GRADE ${w.grade}</span>
          <p style="margin: 4px 0 2px; color: #475569; font-size: 12px;">${w.trade}</p>
          <p style="margin: 0; color: #10b981; font-weight: bold; font-size: 12px;">📍 ${w.distanceMeters}m away • ~${w.etaMins} mins ETA</p>
          <p style="margin: 2px 0 0; color: #64748b; font-size: 11px;">Coop ID: ${w.coopId}</p>
        </div>
      `);

    workerMarkers.push(marker);
  });
}

function renderNearbyWorkersSidebar() {
  const container = document.getElementById('nearbyWorkersList');
  if (!container) return;

  container.innerHTML = APP_STATE.nearbyWorkers.map(w => `
    <div class="worker-item-card" onclick="focusWorkerOnMap(${w.lat}, ${w.lng})">
      <div style="display: flex; align-items: center;">
        <span class="w-avatar">${w.avatar}</span>
        <div class="w-info">
          <h5>${w.name} <span class="grade-tag grade-${w.grade.toLowerCase()}">Grade ${w.grade}</span></h5>
          <p>${w.trade}</p>
        </div>
      </div>
      <div class="w-dist-eta">
        <strong>${w.distanceMeters}m</strong>
        <span>~${w.etaMins}m ETA</span>
      </div>
    </div>
  `).join('');

  document.getElementById('workersCount').textContent = APP_STATE.nearbyWorkers.length;
}

function focusWorkerOnMap(lat, lng) {
  if (leafletMap) {
    leafletMap.flyTo([lat, lng], 15.5, { duration: 0.8 });
  }
}

function refreshNearbyWorkers() {
  // Simulate live worker movements within the 2km circle
  APP_STATE.nearbyWorkers.forEach(w => {
    const deltaLat = (Math.random() - 0.5) * 0.002;
    const deltaLng = (Math.random() - 0.5) * 0.002;
    w.lat += deltaLat;
    w.lng += deltaLng;
    w.distanceMeters = Math.max(250, Math.min(1950, Math.round(w.distanceMeters + (Math.random() - 0.5) * 60)));
    w.etaMins = Math.max(2, Math.round(w.distanceMeters / 120));
  });
  renderWorkerMarkers();
  renderNearbyWorkersSidebar();
  sfx.playTone(440, 'sine', 0.08);
}

// ==========================================
// 5. SERVICE SELECTION & 1-TAP DISPATCH
// ==========================================
function selectService(id, title, price, icon) {
  APP_STATE.selectedService = {
    id,
    title,
    price,
    icon,
    workerShare: Math.round(price * 0.95),
    coopFee: Math.round(price * 0.05)
  };

  // Update UI Card styles
  document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active-card'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active-card');
  }

  // Update Dock
  document.getElementById('dockSrvIcon').textContent = icon;
  document.getElementById('dockSrvTitle').textContent = title;
  document.getElementById('dockBasePrice').textContent = `₹${price}`;
  document.querySelector('.coop-fee-note').textContent = 
    `(Cooperative 5% Fee: ₹${APP_STATE.selectedService.coopFee} • Worker Share 95%: ₹${APP_STATE.selectedService.workerShare})`;

  sfx.playTone(520, 'sine', 0.06);
}

// Step 1 -> 2 -> 3: Customer Initiates Request
function initiateJobRequest() {
  sfx.init();
  const address = document.getElementById('customerAddressInput').value || 'Flat 402, Green Valley Apts';
  const notes = document.getElementById('customerNotesInput').value || 'Service request';
  
  const jobId = 'COOP-' + Math.floor(1000 + Math.random() * 9000);
  const otp = '5824'; // Deterministic 4-digit security code for demo

  const assigned = APP_STATE.selectedService.preAssignedWorker || APP_STATE.nearbyWorkers[0];
  const dynamicFare = APP_STATE.selectedService.fareDetails || calculateWorkerDynamicFare(assigned);

  APP_STATE.activeJob = {
    id: jobId,
    step: 3, // Step 3: AI Matching Engine
    service: {
      ...APP_STATE.selectedService,
      price: dynamicFare.totalFare,
      workerShare: dynamicFare.workerShare,
      coopFee: dynamicFare.coopFee
    },
    address,
    notes,
    otp,
    customerName: APP_STATE.currentUser.name,
    assignedWorker: assigned,
    fareDetails: dynamicFare,
    timerSeconds: 30,
    timerInterval: null
  };

  // Reveal customer lifecycle card
  const lifecycleCard = document.getElementById('customerLifecycleCard');
  lifecycleCard.classList.remove('hidden');
  document.getElementById('activeJobIdBadge').textContent = `Job #${jobId}`;

  updateCustomerLifecycleUI();
  broadcastSync('JOB_CREATED', APP_STATE.activeJob);

  // AI Matching Engine simulation (takes 1.5 seconds to rank workers)
  setTimeout(() => {
    sfx.alertChime();
    APP_STATE.activeJob.step = 4; // Step 4: Worker Notification
    updateCustomerLifecycleUI();
    triggerWorkerDispatchAlert();
    broadcastSync('JOB_MATCHED', APP_STATE.activeJob);
  }, 1400);
}

// ==========================================
// 6. 10-STEP LIFECYCLE MANAGEMENT (From PDF)
// ==========================================
function updateStepNodes(currentStep) {
  for (let i = 1; i <= 10; i++) {
    const el = document.getElementById(`st${i}`);
    if (!el) continue;
    el.classList.remove('active', 'current');
    if (i < currentStep) {
      el.classList.add('active');
    } else if (i === currentStep) {
      el.classList.add('current');
    }
  }
}

function updateCustomerLifecycleUI() {
  if (!APP_STATE.activeJob) return;
  const job = APP_STATE.activeJob;
  const fare = job.fareDetails || calculateWorkerDynamicFare(job.assignedWorker);
  const content = document.getElementById('customerLifecycleContent');
  updateStepNodes(job.step);

  if (job.step === 3) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 3 / 10 • AI MATCHING & FARE OPTIMIZATION';
    document.getElementById('lifecycleTitle').textContent = 'Ranking Verified Cooperative Workers within 2km...';
    content.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div class="pulse-orange" style="width: 18px; height: 18px;"></div>
        <div>
          <strong>AI Algorithmic Fair-Fare Matching in Progress:</strong>
          <p style="color: var(--text-muted); font-size: 0.85rem;">
            Evaluating worker distance (&lt;2km), Certificate Grade (${job.assignedWorker.grade}), rating (${job.assignedWorker.rating}★), and calculating transparent tariff (₹${fare.totalFare}).
          </p>
        </div>
      </div>
    `;
  } else if (job.step === 4) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 4 / 10 • WORKER DISPATCH NOTIFICATION';
    document.getElementById('lifecycleTitle').textContent = `Dispatched to ${job.assignedWorker.name} (Grade ${job.assignedWorker.grade} ${job.assignedWorker.trade})`;
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4>Awaiting Worker Acceptance (30-second window)...</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">
            Assigned member: <strong>${job.assignedWorker.name}</strong> • ${fare.distanceKm}km away • ${job.assignedWorker.rating} ★ (${job.assignedWorker.reviewsCount} reviews) • Dynamic Fare: <strong>₹${fare.totalFare}</strong>
          </p>
        </div>
        <div style="background: rgba(249, 115, 22, 0.15); border: 1px solid var(--border-focus); padding: 0.5rem 1rem; border-radius: 8px;">
          <span style="color: var(--primary-saffron-light); font-weight: bold;">Notification Pushed to Worker App 🔔</span>
        </div>
      </div>
    `;
  } else if (job.step === 5 || job.step === 6) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 6 / 10 • LIVE GPS NAVIGATION & ETA';
    document.getElementById('lifecycleTitle').textContent = `Worker En Route • Arrival in ~${job.assignedWorker.etaMins || 4} Minutes`;
    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 1rem; align-items: center;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <span style="font-size: 2rem;">${job.assignedWorker.avatar || '👨‍🔧'}</span>
            <div>
              <h4 style="margin: 0;">${job.assignedWorker.name} <span class="grade-tag grade-${job.assignedWorker.grade.toLowerCase()}">GRADE ${job.assignedWorker.grade}</span></h4>
              <p style="margin: 0; font-size: 0.8rem; color: var(--coop-green-light);">Verified Member ID: ${job.assignedWorker.coopId} • ${job.assignedWorker.society}</p>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Moving towards: ${job.address}</p>
          <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--accent-cyan);">
            Dynamic Fare: ₹${fare.totalFare} (Base ₹${fare.baseFare} + Cert +${fare.certPercent}% + Rating +${fare.ratingPercent}% + Dist ₹${fare.distanceCharge})
          </div>
          <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
            <button class="btn-text-action" style="border: 1px solid var(--border-subtle); padding: 0.3rem 0.6rem; border-radius: 4px;" onclick="simulateWorkerCall()">📞 Call Worker</button>
            <button class="btn-text-action" style="border: 1px solid var(--border-subtle); padding: 0.3rem 0.6rem; border-radius: 4px;" onclick="simulateShareLocation()">📍 Share Live Landmark</button>
          </div>
        </div>

        <!-- Secure OTP Display for Customer (PDF Page 3 Step 7) -->
        <div style="background: #090d16; border: 2px dashed var(--border-green); padding: 1rem; border-radius: 12px; text-align: center;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Job Security OTP</span>
          <div style="font-size: 2rem; font-weight: 900; letter-spacing: 6px; color: var(--coop-green-light); font-family: var(--font-mono); margin: 0.25rem 0;">
            ${job.otp}
          </div>
          <span style="font-size: 0.72rem; color: #94a3b8;">Share this 4-digit OTP when worker arrives at doorstep</span>
        </div>
      </div>
    `;
  } else if (job.step === 7) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 7 / 10 • WORK IN PROGRESS & PROOF';
    document.getElementById('lifecycleTitle').textContent = `Service Being Executed by ${job.assignedWorker.name}`;
    content.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4>OTP Verified • ${job.assignedWorker.name} is performing the requested task</h4>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Completion photo proof will be verified before final payment release.</p>
        </div>
        <span class="live-status-chip"><span class="pulse-green"></span> In Progress</span>
      </div>
    `;
  } else if (job.step === 8) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 8 / 10 • DIGITAL PAYMENT & GST INVOICE';
    document.getElementById('lifecycleTitle').textContent = `Work Completed • Settle Transparent Dynamic Fare of ₹${fare.totalFare}`;
    content.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4>Photo Proof Verified by Cooperative System ✅</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">
              Algorithmic Breakdown: Base ₹${fare.baseFare} + Cert Grade ${fare.certGrade} (+₹${fare.certBonusAmount}) + Rating ${fare.rating}★ (+₹${fare.ratingBonusAmount}) + Transit ${fare.distanceKm}km (+₹${fare.distanceCharge})
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn-dispatch" style="padding: 0.65rem 1.25rem;" onclick="processPayment()">
              💳 Pay ₹${fare.totalFare} via Razorpay / UPI
            </button>
          </div>
        </div>
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px dashed var(--border-subtle); border-radius: 8px; padding: 0.55rem 0.85rem; font-size: 0.78rem; display: flex; justify-content: space-between;">
          <span style="color: var(--coop-green-light);">👷 Worker Direct Share (95%): <strong>₹${fare.workerShare}</strong></span>
          <span style="color: var(--accent-cyan);">🏛️ Federation Welfare Contribution (5%): <strong>₹${fare.coopFee}</strong></span>
        </div>
      </div>
    `;
  } else if (job.step === 9) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 9 / 10 • RATING & FEEDBACK';
    document.getElementById('lifecycleTitle').textContent = 'Payment Completed! Rate Ramesh Kumar';
    content.innerHTML = `
      <div style="text-align: center; padding: 0.5rem 0;">
        <h4 style="margin-bottom: 0.4rem;">How was the cooperative service provided?</h4>
        <div style="font-size: 2rem; color: #fbbf24; cursor: pointer; margin-bottom: 0.75rem;" id="ratingStarsGroup">
          <span onclick="submitRating(1)">★</span>
          <span onclick="submitRating(2)">★</span>
          <span onclick="submitRating(3)">★</span>
          <span onclick="submitRating(4)">★</span>
          <span onclick="submitRating(5)">★</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Click 5 stars to record praise and update worker dynamic certification.</p>
        <button class="btn-text-action" style="margin-top: 0.5rem; text-decoration: underline;" onclick="openInvoiceModal()">📄 View / Print GST Tax Invoice</button>
      </div>
    `;
  } else if (job.step === 10) {
    document.getElementById('lifecycleStageTag').textContent = 'STEP 10 / 10 • CERTIFICATION UPDATED';
    document.getElementById('lifecycleTitle').textContent = 'Job Completed Successfully! 🎉';
    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4>Thank you for supporting Labour Cooperatives!</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Ramesh Kumar's score increased to <strong>97/100 (Grade A maintained)</strong>.</p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-primary" style="padding: 0.5rem 1rem;" onclick="openInvoiceModal()">📄 View GST Invoice</button>
          <button class="btn-dispatch" style="padding: 0.5rem 1rem;" onclick="resetJobCycle()">Book Another Service</button>
        </div>
      </div>
    `;
  }
}

// ==========================================
// 7. WORKER PORTAL DISPATCH ALERT & WORKFLOW
// ==========================================
function triggerWorkerDispatchAlert() {
  const alertBox = document.getElementById('workerDispatchAlert');
  const notifDot = document.getElementById('workerNotificationDot');
  if (!alertBox) return;

  // Show notification dot on nav tab
  if (notifDot) notifDot.classList.remove('hidden');

  document.getElementById('alertJobTitle').textContent = APP_STATE.activeJob.service.title;
  document.getElementById('alertJobAddress').textContent = APP_STATE.activeJob.address;
  document.getElementById('alertJobEarnings').textContent = `₹${APP_STATE.activeJob.service.workerShare}.00`;

  alertBox.classList.remove('hidden');

  // 30-Second Countdown (from PDF Page 3 & 4)
  let seconds = 30;
  document.getElementById('alertSecondsLeft').textContent = seconds;

  if (APP_STATE.activeJob.timerInterval) {
    clearInterval(APP_STATE.activeJob.timerInterval);
  }

  APP_STATE.activeJob.timerInterval = setInterval(() => {
    seconds--;
    const el = document.getElementById('alertSecondsLeft');
    if (el) el.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(APP_STATE.activeJob.timerInterval);
      declineDispatchedJob();
    }
  }, 1000);
}

function acceptDispatchedJob() {
  if (!APP_STATE.activeJob) return;
  sfx.successChime();
  if (APP_STATE.activeJob.timerInterval) {
    clearInterval(APP_STATE.activeJob.timerInterval);
  }

  // Hide alert
  document.getElementById('workerDispatchAlert').classList.add('hidden');
  document.getElementById('workerNotificationDot').classList.add('hidden');

  // Show Active Job Card in Worker Portal
  const activeCard = document.getElementById('workerActiveJobCard');
  activeCard.classList.remove('hidden');
  document.getElementById('wCustomerName').textContent = APP_STATE.activeJob.customerName;

  APP_STATE.activeJob.step = 6; // Step 6: Navigation & ETA
  updateCustomerLifecycleUI();
  broadcastSync('JOB_ACCEPTED', APP_STATE.activeJob);
}

function declineDispatchedJob() {
  if (!APP_STATE.activeJob) return;
  if (APP_STATE.activeJob.timerInterval) {
    clearInterval(APP_STATE.activeJob.timerInterval);
  }
  document.getElementById('workerDispatchAlert').classList.add('hidden');
  document.getElementById('workerNotificationDot').classList.add('hidden');

  // Next worker assigned
  APP_STATE.activeJob.assignedWorker = APP_STATE.nearbyWorkers[1]; // Sunita Devi
  updateCustomerLifecycleUI();
  broadcastSync('JOB_REASSIGNED', APP_STATE.activeJob);
}

function workerArrivedAtLocation() {
  sfx.playTone(660, 'sine', 0.15);
  document.getElementById('wsNavBox').classList.add('hidden');
  document.getElementById('wsOtpBox').classList.remove('hidden');
  document.getElementById('workerJobStatusText').textContent = 'Arrived at Customer Doorstep • Awaiting OTP';
  document.getElementById('demoOtpHint').textContent = APP_STATE.activeJob.otp;

  APP_STATE.activeJob.step = 7; // Step 7: OTP verification & work
  updateCustomerLifecycleUI();
  broadcastSync('WORKER_ARRIVED', APP_STATE.activeJob);
}

function verifyJobOTP() {
  const entered = document.getElementById('workerOtpInput').value.trim();
  if (entered === APP_STATE.activeJob.otp || entered === '5824' || entered.length === 4) {
    sfx.successChime();
    document.getElementById('wsOtpBox').classList.add('hidden');
    document.getElementById('wsCompleteBox').classList.remove('hidden');
    document.getElementById('workerJobStatusText').textContent = 'OTP Verified ✅ Work in Progress';
    broadcastSync('OTP_VERIFIED', APP_STATE.activeJob);
  } else {
    alert("Invalid OTP. Please ask the customer for the 4-digit code shown on their screen.");
  }
}

function workerCompletesService() {
  sfx.successChime();
  document.getElementById('wsCompleteBox').classList.add('hidden');
  document.getElementById('workerJobStatusText').textContent = 'Service Complete! Awaiting Payment';

  APP_STATE.activeJob.step = 8; // Step 8: Payment
  updateCustomerLifecycleUI();
  broadcastSync('SERVICE_COMPLETED', APP_STATE.activeJob);
}

// Step 8: Digital Payment via UPI / Razorpay Simulation
function processPayment() {
  sfx.cashRegister();

  // Worker live wallet receives fair wage (95%)
  const earned = APP_STATE.activeJob.service.workerShare;
  APP_STATE.currentWorker.walletBalance += earned;
  APP_STATE.currentWorker.todayEarnings += earned;
  
  // Pension corpus micro-credit (5% of earnings)
  const pensionAdd = Math.round(earned * 0.05);
  APP_STATE.currentWorker.pensionCorpus += pensionAdd;

  // Update Worker Wallet UI
  document.getElementById('workerWalletBalance').textContent = APP_STATE.currentWorker.walletBalance.toLocaleString('en-IN');
  document.getElementById('workerTodayEarn').textContent = `₹${APP_STATE.currentWorker.todayEarnings}`;
  document.getElementById('pensionCorpus').textContent = `₹${APP_STATE.currentWorker.pensionCorpus}`;

  // Proceed to Step 9 (Rating)
  APP_STATE.activeJob.step = 9;
  updateCustomerLifecycleUI();
  broadcastSync('PAYMENT_PROCESSED', APP_STATE.activeJob);

  // Automatically show the GST Invoice Modal
  setTimeout(() => {
    openInvoiceModal();
  }, 400);
}

// ==========================================
// DYNAMIC CERTIFICATION ENGINE (>75 Grade A, >50 Grade B, >20 Grade C)
// ==========================================
function getWorkerGradeTier(jobs) {
  if (jobs > 75) {
    return { 
      grade: 'A', 
      title: 'Grade A • Master Craftsman', 
      threshold: '> 75 Verified Gigs',
      badgeClass: 'grade-a',
      multiplier: '+20% Wage Multiplier',
      color: '#b45309'
    };
  }
  if (jobs > 50) {
    return { 
      grade: 'B', 
      title: 'Grade B • Skilled Craftsman', 
      threshold: '> 50 Verified Gigs',
      badgeClass: 'grade-b',
      multiplier: '+10% Wage Multiplier',
      color: '#1d4ed8'
    };
  }
  if (jobs > 20) {
    return { 
      grade: 'C', 
      title: 'Grade C • Certified Craftsman', 
      threshold: '> 20 Verified Gigs',
      badgeClass: 'grade-c',
      multiplier: 'Standard Tariff',
      color: '#d97706'
    };
  }
  return { 
    grade: 'Trainee', 
    title: 'Apprentice / Trainee Member', 
    threshold: '<= 20 Gigs (In Progress)',
    badgeClass: 'grade-trainee',
    multiplier: 'Probationary Tariff',
    color: '#64748b'
  };
}

function updateWorkerCertificationUI() {
  const worker = APP_STATE.currentWorker;
  const jobs = worker.jobsCompleted;
  const tierInfo = getWorkerGradeTier(jobs);
  worker.grade = tierInfo.grade;

  // Update hero profile badges
  const badgeEl = document.getElementById('workerGradeBadge');
  if (badgeEl) {
    badgeEl.textContent = tierInfo.grade === 'Trainee' ? 'PROBATION' : `GRADE ${tierInfo.grade}`;
    badgeEl.className = `grade-pill-floating grade-${tierInfo.grade.toLowerCase()}`;
  }

  const jobsCountEl = document.getElementById('workerJobsCount');
  if (jobsCountEl) jobsCountEl.textContent = jobs;

  const jobsSubEl = document.getElementById('workerJobsSub');
  if (jobsSubEl) jobsSubEl.textContent = `Tier: ${tierInfo.title} (${tierInfo.threshold})`;

  // Update Milestone Cards
  const mC = document.getElementById('milestoneC');
  const mB = document.getElementById('milestoneB');
  const mA = document.getElementById('milestoneA');
  const statC = document.getElementById('statusC');
  const statB = document.getElementById('statusB');
  const statA = document.getElementById('statusA');

  if (mC && mB && mA) {
    // Reset classes
    [mC, mB, mA].forEach(el => el.classList.remove('active-tier', 'locked'));

    // Grade C (> 20 jobs)
    if (jobs > 20) {
      statC.textContent = 'UNLOCKED ✅';
      statC.className = 'ms-status';
    } else {
      mC.classList.add('locked');
      statC.textContent = `IN PROGRESS (${jobs}/21)`;
      statC.className = 'ms-status locked-status';
    }

    // Grade B (> 50 jobs)
    if (jobs > 50) {
      statB.textContent = 'UNLOCKED ✅';
      statB.className = 'ms-status';
    } else if (jobs > 20) {
      mB.classList.add('active-tier');
      statB.textContent = `NEXT TARGET (${jobs}/51)`;
      statB.className = 'ms-status';
    } else {
      mB.classList.add('locked');
      statB.textContent = 'LOCKED (>50 Jobs)';
      statB.className = 'ms-status locked-status';
    }

    // Grade A (> 75 jobs)
    if (jobs > 75) {
      mA.classList.add('active-tier');
      statA.textContent = 'UNLOCKED 🏆';
      statA.className = 'ms-status';
    } else if (jobs > 50) {
      mA.classList.add('active-tier');
      statA.textContent = `NEXT TARGET (${jobs}/76)`;
      statA.className = 'ms-status';
    } else {
      mA.classList.add('locked');
      statA.textContent = 'LOCKED (>75 Jobs)';
      statA.className = 'ms-status locked-status';
    }
  }

  // Progress Bar calculation based on new user spec: >20 (C), >50 (B), >75 (A)
  let progressPct = 0;
  let nextTierNote = '';
  if (jobs <= 20) {
    progressPct = (jobs / 20) * 33.3;
    nextTierNote = `${21 - jobs} more completed gigs to unlock Grade C Certificate (>20 Gigs)`;
  } else if (jobs <= 50) {
    progressPct = 33.3 + ((jobs - 20) / 30) * 33.3;
    nextTierNote = `${51 - jobs} more completed gigs to unlock Grade B Certificate (>50 Gigs)`;
  } else if (jobs <= 75) {
    progressPct = 66.6 + ((jobs - 50) / 25) * 33.4;
    nextTierNote = `${76 - jobs} more completed gigs to unlock Grade A Master Certificate (>75 Gigs)`;
  } else {
    progressPct = 100;
    nextTierNote = 'Highest Cooperative Master Level Achieved 🌟 (>75 Verified Gigs Active)';
  }

  const barFill = document.getElementById('certProgressBarFill');
  if (barFill) barFill.style.width = `${Math.min(100, Math.round(progressPct))}%`;

  const tierLabelEl = document.getElementById('certTierLabel');
  if (tierLabelEl) tierLabelEl.innerHTML = `<strong>Current Tier:</strong> ${tierInfo.title} (<strong>${jobs} Verified Jobs</strong>)`;

  const nextTierEl = document.getElementById('certNextTierNote');
  if (nextTierEl) nextTierEl.textContent = nextTierNote;
}

// Quick Simulator for SIH Judges to test new threshold transitions (>75, >50, >20)
function simulateWorkerTier(jobs) {
  sfx.playTone(620, 'sine', 0.1);
  APP_STATE.currentWorker.jobsCompleted = jobs;
  updateWorkerCertificationUI();
  
  const tier = getWorkerGradeTier(jobs);
  alert(`⚡ CERTIFICATION THRESHOLD SIMULATED:\n\nRamesh Kumar's profile set to ${jobs} verified jobs.\nActive Status: ${tier.title} (Criterion: ${tier.threshold}).\n\nRule: >20 Gigs = Grade C | >50 Gigs = Grade B | >75 Gigs = Grade A!`);
}

// Step 9 & 10: Dynamic Rating & A/B/C Grade Update (PDF Feature)
function submitRating(stars = 5) {
  sfx.successChime();
  const oldTier = getWorkerGradeTier(APP_STATE.currentWorker.jobsCompleted);

  // Increment completed jobs
  APP_STATE.currentWorker.jobsCompleted += 1;
  APP_STATE.currentWorker.score = Math.min(100, APP_STATE.currentWorker.score + 1);

  const newTier = getWorkerGradeTier(APP_STATE.currentWorker.jobsCompleted);
  updateWorkerCertificationUI();

  // Check if milestone crossed
  if (oldTier.grade !== newTier.grade) {
    setTimeout(() => {
      sfx.playTone(880, 'triangle', 0.3, 0.2);
      alert(`🎉 COOPERATIVE CERTIFICATION PROMOTION UNLOCKED!\n\nRamesh Kumar has crossed ${APP_STATE.currentWorker.jobsCompleted} completed jobs!\n\nAwarded: ${newTier.title}\nNew benefits and wage multipliers are now active in the cooperative ledger.`);
      openCertificateModal();
    }, 400);
  }

  APP_STATE.activeJob.step = 10;
  updateCustomerLifecycleUI();
  broadcastSync('RATING_SUBMITTED', APP_STATE.activeJob);
}

// Open / Close Official Cooperative Certificate Modal (Supports any worker!)
function openCertificateModal(targetWorkerParam) {
  let worker = APP_STATE.currentWorker;

  if (typeof targetWorkerParam === 'string') {
    const found = APP_STATE.nearbyWorkers.find(w => w.id === targetWorkerParam);
    if (found) worker = found;
  } else if (targetWorkerParam && typeof targetWorkerParam === 'object') {
    worker = targetWorkerParam;
  }

  const jobs = worker.jobs || worker.jobsCompleted || 0;
  const rating = worker.rating || 4.9;
  const tier = getWorkerGradeTier(jobs);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  document.getElementById('certMemberName').textContent = worker.name;
  document.getElementById('certMemberId').textContent = worker.coopId;
  document.getElementById('certMemberSociety').textContent = worker.society || 'Delhi Labour Coop Federation #41';
  document.getElementById('certTradeName').textContent = worker.trade;
  document.getElementById('certIssueDate').textContent = dateStr;
  document.getElementById('certHashId').textContent = `SHA256-${worker.coopId}-${jobs}-2026`;

  const badgeEl = document.getElementById('certTierBadge');
  const criteriaEl = document.getElementById('certTierCriteria');
  const privList = document.getElementById('certPrivilegesList');

  if (tier.grade === 'A') {
    badgeEl.textContent = 'GRADE A • MASTER CRAFTSMAN';
    badgeEl.style.color = '#b45309';
    criteriaEl.innerHTML = `Verified Threshold: <strong>More than 75 Completed Verified Gigs (> 75 Gigs)</strong> (${jobs} Completed) • Rating: <strong>${rating} ★</strong>`;
    privList.innerHTML = `
      <li>✅ Authorized for Hyperlocal 2km Emergency Surge Premium Rates (+20%)</li>
      <li>✅ Pradhan Mantri Suraksha Bima Yojana (PMSBY) ₹2 Lakh Automated Coverage</li>
      <li>✅ 0% Interest Tool & Equipment Micro-Credit Facility via Cooperative Bank</li>
      <li>✅ Designated Cooperative Mentor & Master Field Trainer</li>
    `;
  } else if (tier.grade === 'B') {
    badgeEl.textContent = 'GRADE B • SKILLED CRAFTSMAN';
    badgeEl.style.color = '#1d4ed8';
    criteriaEl.innerHTML = `Verified Threshold: <strong>More than 50 Completed Verified Gigs (> 50 Gigs)</strong> (${jobs} Completed) • Rating: <strong>${rating} ★</strong>`;
    privList.innerHTML = `
      <li>✅ Authorized for +10% Standard Cooperative Wage Multiplier</li>
      <li>✅ Priority Dispatch Listing on 2km Hyperlocal Geo-Radar</li>
      <li>✅ Automated PMSBY & Ayushman Bharat Social Security Deductions</li>
      <li>✅ Eligible for Cooperative Skill Upgrade Vouchers</li>
    `;
  } else if (tier.grade === 'C') {
    badgeEl.textContent = 'GRADE C • BASIC CRAFTSMAN';
    badgeEl.style.color = '#d97706';
    criteriaEl.innerHTML = `Verified Threshold: <strong>More than 20 Completed Verified Gigs (> 20 Gigs)</strong> (${jobs} Completed) • Rating: <strong>${rating} ★</strong>`;
    privList.innerHTML = `
      <li>✅ Standard Hyperlocal Cooperative Tariff Authorization</li>
      <li>✅ Automated Worker Welfare & NPS Lite Pension Savings</li>
      <li>✅ On-Demand 2km Geolocation Matchmaking</li>
      <li>✅ On Track for Grade B Skilled Elevation (Threshold: > 50 Gigs)</li>
    `;
  } else {
    badgeEl.textContent = 'APPRENTICE / TRAINEE CRAFTSMAN';
    badgeEl.style.color = '#64748b';
    criteriaEl.innerHTML = `Verified Threshold: <strong>Apprentice Level (${jobs} of 21 Completed Gigs to Grade C)</strong>`;
    privList.innerHTML = `
      <li>⏳ Supervised Field Work with Senior Cooperative Mentors</li>
      <li>✅ Enrolled in NCCT District Skill Induction Camps</li>
      <li>✅ Basic Accident Coverage & Cooperative ID Issued</li>
      <li>⏳ Complete more than 20 gigs to unlock official Grade C Certification</li>
    `;
  }

  document.getElementById('certificateModal').classList.remove('hidden');
}

function closeCertificateModal() {
  document.getElementById('certificateModal').classList.add('hidden');
}

function resetJobCycle() {
  APP_STATE.activeJob = null;
  document.getElementById('customerLifecycleCard').classList.add('hidden');
  document.getElementById('workerActiveJobCard').classList.add('hidden');
  document.getElementById('workerDispatchAlert').classList.add('hidden');
  document.getElementById('wsNavBox').classList.remove('hidden');
  document.getElementById('wsOtpBox').classList.add('hidden');
  document.getElementById('wsCompleteBox').classList.add('hidden');
  document.getElementById('workerJobStatusText').textContent = 'Online & Ready';
  broadcastSync('RESET', null);
}

// ==========================================
// 8. AUTO GST INVOICE GENERATOR (PDF Page 2 & 3)
// ==========================================
function openInvoiceModal() {
  const invNumber = 'INV-2026-' + Math.floor(10000 + Math.random() * 90000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const total = APP_STATE.activeJob ? APP_STATE.activeJob.service.price : 400;
  const taxable = (total / 1.18).toFixed(2);
  const totalGst = (total - taxable).toFixed(2);
  const halfGst = (totalGst / 2).toFixed(2);
  const workerRetain = (total * 0.95).toFixed(2);

  document.getElementById('invNumber').textContent = invNumber;
  document.getElementById('invDate').textContent = dateStr;
  document.getElementById('invCustName').textContent = APP_STATE.currentUser.name;
  document.getElementById('invCustAddr').textContent = APP_STATE.currentUser.address;
  document.getElementById('invItemTitle').textContent = APP_STATE.activeJob ? APP_STATE.activeJob.service.title : 'Emergency Pipe Leak & Valve Repair';

  document.getElementById('invBaseRate').textContent = `₹${taxable}`;
  document.getElementById('invCgst').textContent = `₹${halfGst}`;
  document.getElementById('invSgst').textContent = `₹${halfGst}`;
  document.getElementById('invTotalAmt').textContent = `₹${total}.00`;

  document.getElementById('invTaxable').textContent = `₹${taxable}`;
  document.getElementById('invTotalGst').textContent = `₹${totalGst}`;
  document.getElementById('invGrandTotal').textContent = `₹${total}.00`;
  document.getElementById('invWorkerRetain').textContent = `₹${workerRetain}`;

  document.getElementById('invoiceModal').classList.remove('hidden');
}

function closeInvoiceModal() {
  document.getElementById('invoiceModal').classList.add('hidden');
}

// ==========================================
// 9. DUAL AUTHENTICATION MODAL (Household & Worker)
// ==========================================
let currentAuthRole = 'customer';
let currentAuthSubtab = 'login';

function openAuthModal() {
  document.getElementById('authModal').classList.remove('hidden');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.add('hidden');
}

function switchAuthTab(role) {
  currentAuthRole = role;
  document.getElementById('tabCustomerAuth').classList.toggle('active', role === 'customer');
  document.getElementById('tabWorkerAuth').classList.toggle('active', role === 'worker');

  document.getElementById('authFieldsCustomer').classList.toggle('hidden', role !== 'customer');
  document.getElementById('authFieldsWorker').classList.toggle('hidden', role !== 'worker');

  document.getElementById('authModalTitle').textContent = 
    role === 'customer' ? 'Sign In to Household Account' : 'Sign In as Cooperative Worker';
}

function setAuthMode(mode) {
  currentAuthSubtab = mode;
  document.getElementById('subtabLogin').className = mode === 'login' ? 'active-subtab' : 'inactive-subtab';
  document.getElementById('subtabRegister').className = mode === 'register' ? 'active-subtab' : 'inactive-subtab';

  document.getElementById('custRegisterFields').classList.toggle('hidden', mode !== 'register');
  document.getElementById('workerRegisterFields').classList.toggle('hidden', mode !== 'register');

  document.getElementById('btnSubmitAuth').textContent = 
    mode === 'login' ? 'Send OTP & Login' : 'Complete Cooperative Registration & Send OTP';
}

function submitAuthForm() {
  sfx.init();
  const otpSection = document.getElementById('authOtpSection');

  if (otpSection.classList.contains('hidden')) {
    // Show OTP prompt
    otpSection.classList.remove('hidden');
    document.getElementById('btnSubmitAuth').textContent = 'Verify OTP & Confirm';
    sfx.playTone(550, 'sine', 0.1);
  } else {
    // OTP verified
    sfx.successChime();
    otpSection.classList.add('hidden');
    closeAuthModal();

    if (currentAuthRole === 'customer') {
      const name = document.getElementById('custNameInput').value || 'Priya Sharma';
      APP_STATE.currentUser.name = name;
      document.getElementById('navUserName').textContent = name;
      switchPortal('customer');
      alert(`Welcome to CoopSewa, ${name}! You are logged in as a Household User.`);
    } else {
      const name = document.getElementById('workerNameInput').value || 'Ramesh Kumar';
      APP_STATE.currentWorker.name = name;
      document.getElementById('navUserName').textContent = name;
      document.getElementById('workerNameHeader').textContent = name;
      switchPortal('worker');
      alert(`Welcome, ${name}! You are connected to the Cooperative Craftsman Terminal.`);
    }
  }
}

function quickFillDemo() {
  if (currentAuthRole === 'customer') {
    document.getElementById('custMobileInput').value = '9876543210';
    document.getElementById('custNameInput').value = 'Priya Sharma';
  } else {
    document.getElementById('workerMobileInput').value = '9811122334';
    document.getElementById('workerCoopIdInput').value = 'COOP-DL-2026-8942';
    document.getElementById('workerNameInput').value = 'Ramesh Kumar';
  }
  submitAuthForm();
}

// ==========================================
// 10. PORTAL & SPLIT-VIEW SWITCHER
// ==========================================
function switchPortal(portalName) {
  APP_STATE.activePortal = portalName;
  APP_STATE.isSplitView = false;

  const workspace = document.getElementById('appWorkspace');
  workspace.classList.remove('split-mode');
  document.getElementById('btnToggleSplit').classList.remove('active');

  // Navigation button states
  document.getElementById('btnRoleCustomer').classList.toggle('active', portalName === 'customer');
  document.getElementById('btnRoleWorker').classList.toggle('active', portalName === 'worker');
  document.getElementById('btnRoleFederation').classList.toggle('active', portalName === 'federation');

  // Pane displays
  document.getElementById('customerPortal').classList.toggle('hidden', portalName !== 'customer');
  document.getElementById('workerPortal').classList.toggle('hidden', portalName !== 'worker');
  document.getElementById('federationPortal').classList.toggle('hidden', portalName !== 'federation');

  if (portalName === 'customer') {
    setTimeout(initRadarMap, 50);
  }
  sfx.playTone(480, 'sine', 0.05);
}

function toggleSplitView() {
  APP_STATE.isSplitView = !APP_STATE.isSplitView;
  const workspace = document.getElementById('appWorkspace');
  const splitBtn = document.getElementById('btnToggleSplit');

  if (APP_STATE.isSplitView) {
    workspace.classList.add('split-mode');
    splitBtn.classList.add('active');

    // Make both Customer & Worker visible for jury demo
    document.getElementById('customerPortal').classList.remove('hidden');
    document.getElementById('workerPortal').classList.remove('hidden');
    document.getElementById('federationPortal').classList.add('hidden');
    
    document.getElementById('btnRoleCustomer').classList.add('active');
    document.getElementById('btnRoleWorker').classList.add('active');
    document.getElementById('btnRoleFederation').classList.remove('active');

    setTimeout(initRadarMap, 50);
  } else {
    switchPortal('customer');
  }
  sfx.playTone(600, 'sine', 0.08);
}

function toggleWorkerDuty(isOnline) {
  APP_STATE.currentWorker.isOnline = isOnline;
  const dutyText = document.getElementById('dutyText');
  if (isOnline) {
    dutyText.textContent = 'ONLINE (Ready for 2km Dispatch)';
    dutyText.style.color = 'var(--coop-green-light)';
  } else {
    dutyText.textContent = 'OFFLINE (Resting)';
    dutyText.style.color = 'var(--text-dim)';
  }
  sfx.playTone(isOnline ? 520 : 320, 'sine', 0.08);
}

function withdrawFunds() {
  sfx.cashRegister();
  alert(`Instant payout of ₹${APP_STATE.currentWorker.walletBalance.toLocaleString('en-IN')} initiated to Ramesh Kumar's linked UPI (ramesh.kumar@upi). Bank Reference: COOP-TXN-8942.`);
}

function triggerEmergencySOS() {
  sfx.sosSiren();
  alert("🚨 EMERGENCY SOS BROADCASTED!\n\nAlert dispatched to:\n1. National Labour Cooperative Crisis Dispatch (Desk #4)\n2. Local Police Control Room (Dial 112)\n3. Coordinates Broadcasted: 28.5420°N, 77.2140°E (Sector 14). Help en route.");
}

function simulateWorkerCall() {
  alert("📞 Calling Ramesh Kumar (+91 9811122334) via encrypted in-app voice gateway (Zero phone number leakage).");
}

function simulateShareLocation() {
  alert("📍 Live high-precision GPS coordinate shared with worker.");
}

// ==========================================
// 11. CROSS-TAB EVENT SYNCHRONIZATION
// ==========================================
function broadcastSync(type, data) {
  if (syncChannel) {
    syncChannel.postMessage({ type, data });
  }
}

if (syncChannel) {
  syncChannel.onmessage = (event) => {
    const { type, data } = event.data;
    if (type === 'JOB_CREATED' || type === 'JOB_MATCHED') {
      APP_STATE.activeJob = data;
      triggerWorkerDispatchAlert();
      updateCustomerLifecycleUI();
    } else if (type === 'JOB_ACCEPTED') {
      APP_STATE.activeJob = data;
      document.getElementById('workerDispatchAlert').classList.add('hidden');
      document.getElementById('workerActiveJobCard').classList.remove('hidden');
      updateCustomerLifecycleUI();
    } else if (type === 'WORKER_ARRIVED') {
      APP_STATE.activeJob = data;
      updateCustomerLifecycleUI();
    } else if (type === 'SERVICE_COMPLETED' || type === 'PAYMENT_PROCESSED' || type === 'RATING_SUBMITTED') {
      APP_STATE.activeJob = data;
      updateCustomerLifecycleUI();
    } else if (type === 'RESET') {
      resetJobCycle();
    }
  };
}

// ==========================================
// 12. ROLE SELECTION GATEWAY (ADMIN / USER / WORKER)
// ==========================================
function initRoleGateway() {
  const savedRole = sessionStorage.getItem('coopsewa_selected_role');
  const hash = window.location.hash.replace('#', '').toLowerCase();

  if (hash === 'admin' || hash === 'federation') {
    selectInitialRole('federation');
  } else if (hash === 'worker') {
    selectInitialRole('worker');
  } else if (hash === 'customer' || hash === 'user') {
    selectInitialRole('customer');
  } else if (savedRole && ['customer', 'worker', 'federation'].includes(savedRole)) {
    switchPortal(savedRole);
    closeRoleGateway();
  } else {
    // Show role selection on first visit
    openRoleGateway();
  }
}

function openRoleGateway() {
  const modal = document.getElementById('roleGatewayModal');
  if (modal) {
    modal.classList.remove('hidden');
    sfx.playTone(520, 'sine', 0.1);
  }
}

function closeRoleGateway() {
  const modal = document.getElementById('roleGatewayModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function selectInitialRole(role) {
  sessionStorage.setItem('coopsewa_selected_role', role);
  switchPortal(role);
  closeRoleGateway();
  sfx.successChime();

  // Update nav role indicator tag
  const roleBadge = document.getElementById('currentRoleBadge');
  if (roleBadge) {
    if (role === 'federation') {
      roleBadge.textContent = 'PORTAL: ADMIN / FEDERATION';
      roleBadge.className = 'active-role-pill admin-pill';
    } else if (role === 'worker') {
      roleBadge.textContent = 'PORTAL: COOP WORKER';
      roleBadge.className = 'active-role-pill worker-pill';
    } else {
      roleBadge.textContent = 'PORTAL: HOUSEHOLD USER';
      roleBadge.className = 'active-role-pill user-pill';
    }
  }
}

// ==========================================
// 13. COMPREHENSIVE WORKER DIRECTORY & PROFILES
// ==========================================
let currentDirectoryCategory = 'all';
let currentDirectoryGrade = 'all';
let currentDirectorySearch = '';

function renderWorkerDirectory() {
  const grid = document.getElementById('workersDirectoryGrid');
  if (!grid) return;

  const filtered = APP_STATE.nearbyWorkers.filter(w => {
    const matchCategory = currentDirectoryCategory === 'all' || w.category === currentDirectoryCategory;
    const matchGrade = currentDirectoryGrade === 'all' || w.grade === currentDirectoryGrade;
    const q = currentDirectorySearch.toLowerCase().trim();
    const matchQuery = !q || 
      w.name.toLowerCase().includes(q) || 
      w.trade.toLowerCase().includes(q) || 
      w.coopId.toLowerCase().includes(q) ||
      (w.specialties && w.specialties.some(s => s.toLowerCase().includes(q))) ||
      w.categoryLabel.toLowerCase().includes(q) ||
      w.society.toLowerCase().includes(q);
    return matchCategory && matchGrade && matchQuery;
  });

  const countBadge = document.getElementById('directoryCountBadge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Verified Workers`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-workers-found">
        <span class="no-icon">🔍</span>
        <h4>No Cooperative Workers Match Your Filter</h4>
        <p>Try resetting filters or expanding search across other working areas.</p>
        <button class="btn-text-action" onclick="resetDirectoryFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(w => {
    const tier = getWorkerGradeTier(w.jobs);
    const fare = calculateWorkerDynamicFare(w);

    return `
      <div class="worker-card-premium" id="wcard-${w.id}">
        <div class="worker-card-head">
          <div class="avatar-with-grade">
            <span class="w-card-avatar">${w.avatar}</span>
            <span class="grade-chip grade-${w.grade.toLowerCase()}">Grade ${w.grade}</span>
          </div>
          <div class="w-headline">
            <div class="w-name-row">
              <h4>${w.name}</h4>
              <span class="verified-tick" title="Verified NCCT & Police Cleared">✅</span>
            </div>
            <span class="w-trade-label">${w.trade}</span>
            <span class="w-society-tag">🏛️ ${w.society}</span>
          </div>
        </div>

        <div class="worker-card-metrics">
          <div class="wc-metric">
            <span class="lbl">Gigs Done</span>
            <strong class="val highlight">${w.jobs}</strong>
            <small class="tier-hint">${tier.threshold}</small>
          </div>
          <div class="wc-metric">
            <span class="lbl">Rating</span>
            <strong class="val">★ ${w.rating}</strong>
            <small>(${w.reviewsCount} reviews)</small>
          </div>
          <div class="wc-metric">
            <span class="lbl">Distance</span>
            <strong class="val">${w.distanceMeters}m</strong>
            <small>~${w.etaMins}m ETA</small>
          </div>
          <div class="wc-metric fare-highlight-metric">
            <span class="lbl">Dynamic Fair-Fare</span>
            <strong class="val price-green">₹${fare.totalFare}</strong>
            <small class="green">95% (₹${fare.workerShare}) to worker</small>
          </div>
        </div>

        <!-- Dynamic Algorithmic Fare Factor Chips -->
        <div class="worker-fare-breakdown-tags">
          <span class="fare-tag cert-tag" title="Certificate Tier Multiplier: ${fare.certMultiplier}x">
            🏆 Grade ${fare.certGrade} (+${fare.certPercent}%)
          </span>
          <span class="fare-tag rating-tag" title="Rating & Review Factor: ${fare.ratingFactor}x">
            ★ ${w.rating} (+${fare.ratingPercent}%)
          </span>
          <span class="fare-tag dist-tag" title="Distance Transit Allowance: ${fare.distanceKm}km @ ₹${fare.perKmRate}/km">
            📍 ${fare.distanceKm}km (+₹${fare.distanceCharge})
          </span>
        </div>

        <div class="worker-skills-tags">
          ${w.specialties ? w.specialties.slice(0, 3).map(s => `<span class="skill-pill">${s}</span>`).join('') : ''}
        </div>

        <div class="worker-card-actions">
          <button class="btn-fare-math" onclick="openFareBreakdownModal('${w.id}')" title="Inspect algorithmic fare breakdown">
            <span>📊 Fare Math</span>
          </button>
          <button class="btn-view-profile" onclick="openWorkerProfile('${w.id}')">
            <span>🎓 Profile & Cert</span>
          </button>
          <button class="btn-card-dispatch" onclick="bookWorkerDirectly('${w.id}')">
            <span>⚡ Book Now</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterWorkersByCategory(category) {
  currentDirectoryCategory = category;
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderWorkerDirectory();
  sfx.playTone(480, 'sine', 0.05);
}

function filterWorkersByGrade(grade) {
  currentDirectoryGrade = grade;
  document.querySelectorAll('.grade-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.grade === grade);
  });
  renderWorkerDirectory();
  sfx.playTone(520, 'sine', 0.05);
}

function handleWorkerSearch(val) {
  currentDirectorySearch = val;
  renderWorkerDirectory();
}

function resetDirectoryFilters() {
  currentDirectoryCategory = 'all';
  currentDirectoryGrade = 'all';
  currentDirectorySearch = '';

  const searchInput = document.getElementById('searchWorkerInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });
  document.querySelectorAll('.grade-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.grade === 'all');
  });

  renderWorkerDirectory();
  sfx.playTone(400, 'sine', 0.08);
}

// =====================================================================
// DYNAMIC COOPERATIVE FAIR-FARE CALCULATION ENGINE
// Parameters:
// 1. Worker Certificate Grade: Grade A (>75 jobs): 1.25x, Grade B (>50 jobs): 1.10x, Grade C (>20 jobs): 1.00x
// 2. Worker Reviews & Ratings: Star rating factor (up to +12%) + review volume trust factor (up to +4%)
// 3. Distance Traveled: Distance in km * per-km transit fee (min ₹20)
// Transparent split: 95% Worker Direct Share, 5% Cooperative Federation Welfare
// =====================================================================
function calculateWorkerDynamicFare(worker, customDistanceKm = null) {
  if (!worker) return null;

  const baseFare = Number(worker.baseFare || 250);

  // 1. Certificate Tier Multiplier
  let certMultiplier = 1.00;
  let certLabel = 'Grade C (Certified Craftsman)';
  if (worker.jobs > 75 || worker.grade === 'A') {
    certMultiplier = 1.25;
    certLabel = 'Grade A (Master Craftsman, >75 Gigs)';
  } else if (worker.jobs > 50 || worker.grade === 'B') {
    certMultiplier = 1.10;
    certLabel = 'Grade B (Skilled Craftsman, >50 Gigs)';
  } else {
    certMultiplier = 1.00;
    certLabel = 'Grade C (Certified Craftsman, >20 Gigs)';
  }

  // 2. Reviews & Rating Quality Factor
  const rating = Number(worker.rating || 4.5);
  const reviewsCount = Number(worker.reviewsCount || 20);
  const ratingBonusRatio = Math.max(0, (rating - 4.2) / 0.8) * 0.12; // 0% to 12%
  const reviewBonusRatio = Math.min(0.04, reviewsCount / 2000); // 0% to 4%
  const ratingFactor = 1 + ratingBonusRatio + reviewBonusRatio;
  const ratingPercent = Math.round((ratingFactor - 1) * 100);

  // 3. Distance Traveled & Transit Charge
  let distanceKm = customDistanceKm !== null ? Number(customDistanceKm) : (worker.distanceMeters ? worker.distanceMeters / 1000 : 1.2);
  if (distanceKm < 0.1) distanceKm = 0.1;
  const perKmRate = Number(worker.distanceChargePerKm || 20);
  const distanceCharge = Math.max(20, Math.round(distanceKm * perKmRate));

  // Calculations
  const certifiedBase = Math.round(baseFare * certMultiplier);
  const certBonusAmount = certifiedBase - baseFare;
  const skillWithRating = Math.round(certifiedBase * ratingFactor);
  const ratingBonusAmount = skillWithRating - certifiedBase;
  
  const totalFare = skillWithRating + distanceCharge;
  const workerShare = Math.round(totalFare * 0.95);
  const coopFee = totalFare - workerShare;

  return {
    totalFare,
    baseFare,
    certGrade: worker.grade,
    certLabel,
    certMultiplier,
    certBonusAmount,
    certPercent: Math.round((certMultiplier - 1) * 100),
    rating,
    reviewsCount,
    ratingFactor: Number(ratingFactor.toFixed(3)),
    ratingPercent,
    ratingBonusAmount,
    distanceKm: Number(distanceKm.toFixed(2)),
    distanceMeters: Math.round(distanceKm * 1000),
    perKmRate,
    distanceCharge,
    workerShare,
    coopFee
  };
}

// =====================================================================
// INTERACTIVE DYNAMIC FARE ESTIMATOR CONTROLS
// =====================================================================
let estimatorGrade = 'A';

const TRADE_ESTIMATES = {
  carpentry: { name: 'Carpentry & Woodwork', base: 280, perKm: 25 },
  gardening: { name: 'Gardening & Landscaping', base: 260, perKm: 22 },
  plumbing: { name: 'Plumbing & Drainage', base: 270, perKm: 25 },
  electrical: { name: 'Electrical & Wiring', base: 260, perKm: 22 },
  painting: { name: 'Painting & Whitewashing', base: 240, perKm: 20 },
  masonry: { name: 'Masonry & Civil Tile', base: 250, perKm: 22 },
  cleaning: { name: 'Sanitization & Deep Cleaning', base: 200, perKm: 18 },
  appliance: { name: 'Appliance Mechanics', base: 300, perKm: 25 }
};

function setEstimatorGrade(grade) {
  estimatorGrade = grade;
  document.querySelectorAll('#feTierButtons .fe-tier-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.grade === grade);
  });
  updateDynamicFareEstimator();
  sfx.playTone(520, 'sine', 0.04);
}

function updateDynamicFareEstimator() {
  const tradeSelect = document.getElementById('feTradeSelect');
  const distInput = document.getElementById('feDistanceInput');
  const ratingInput = document.getElementById('feRatingInput');
  if (!tradeSelect || !distInput || !ratingInput) return;

  const tradeKey = tradeSelect.value;
  const trade = TRADE_ESTIMATES[tradeKey] || TRADE_ESTIMATES.carpentry;
  const distanceKm = parseFloat(distInput.value) || 1.5;
  const rating = parseFloat(ratingInput.value) || 4.90;

  // Update slider header labels
  const distValEl = document.getElementById('feDistanceVal');
  const etaValEl = document.getElementById('feEtaVal');
  const ratingValEl = document.getElementById('feRatingVal');
  const reviewsValEl = document.getElementById('feReviewsVal');

  if (distValEl) distValEl.textContent = `${distanceKm.toFixed(1)} km`;
  if (etaValEl) {
    const etaMins = Math.max(3, Math.round(distanceKm * 7));
    etaValEl.textContent = `~${etaMins} mins ETA`;
  }
  if (ratingValEl) ratingValEl.textContent = `${rating.toFixed(2)} ★`;
  if (reviewsValEl) {
    const revEstimate = Math.round(rating >= 4.8 ? 120 + (rating - 4.8) * 400 : 30 + (rating - 4.2) * 120);
    reviewsValEl.textContent = `${revEstimate}+ Reviews`;
  }

  // Certificate multiplier
  let certMultiplier = 1.00;
  let certMultText = '1.00x';
  if (estimatorGrade === 'A') {
    certMultiplier = 1.25;
    certMultText = '1.25x';
  } else if (estimatorGrade === 'B') {
    certMultiplier = 1.10;
    certMultText = '1.10x';
  }

  // Rating factor
  const ratingRatio = Math.max(0, (rating - 4.2) / 0.8) * 0.12;
  const revBonus = 0.02; // baseline trust bonus
  const ratingFactor = 1 + ratingRatio + revBonus;

  // Dist charge
  const distanceCharge = Math.max(20, Math.round(distanceKm * trade.perKm));

  // Itemized Math
  const baseFare = trade.base;
  const certifiedBase = Math.round(baseFare * certMultiplier);
  const certBonus = certifiedBase - baseFare;
  const skillWithRating = Math.round(certifiedBase * ratingFactor);
  const ratingBonus = skillWithRating - certifiedBase;

  const totalFare = skillWithRating + distanceCharge;
  const workerShare = Math.round(totalFare * 0.95);
  const coopShare = totalFare - workerShare;

  // Populate Bill Receipt
  const billBase = document.getElementById('feBillBase');
  const billGradeBadge = document.getElementById('feBillGradeBadge');
  const billGradeMult = document.getElementById('feBillGradeMult');
  const billGradeBonus = document.getElementById('feBillGradeBonus');
  const billRatingScore = document.getElementById('feBillRatingScore');
  const billRatingBonus = document.getElementById('feBillRatingBonus');
  const billDistKm = document.getElementById('feBillDistKm');
  const billRateKm = document.getElementById('feBillRateKm');
  const billDistCharge = document.getElementById('feBillDistCharge');
  const billTotal = document.getElementById('feBillTotal');
  const billWorkerShare = document.getElementById('feBillWorkerShare');
  const billCoopShare = document.getElementById('feBillCoopShare');

  if (billBase) billBase.textContent = `₹${baseFare}`;
  if (billGradeBadge) billGradeBadge.textContent = estimatorGrade;
  if (billGradeMult) billGradeMult.textContent = certMultText;
  if (billGradeBonus) billGradeBonus.textContent = `+₹${certBonus}`;
  if (billRatingScore) billRatingScore.textContent = `${rating.toFixed(2)}★`;
  if (billRatingBonus) billRatingBonus.textContent = `+₹${ratingBonus}`;
  if (billDistKm) billDistKm.textContent = `${distanceKm.toFixed(1)} km`;
  if (billRateKm) billRateKm.textContent = trade.perKm;
  if (billDistCharge) billDistCharge.textContent = `+₹${distanceCharge}`;
  if (billTotal) billTotal.textContent = `₹${totalFare}`;
  if (billWorkerShare) billWorkerShare.textContent = `₹${workerShare}`;
  if (billCoopShare) billCoopShare.textContent = `₹${coopShare}`;
}

function applyEstimatorFilterToDirectory() {
  const tradeSelect = document.getElementById('feTradeSelect');
  if (!tradeSelect) return;
  const tradeKey = tradeSelect.value;
  filterWorkersByCategory(tradeKey);
  filterWorkersByGrade(estimatorGrade);

  const dirSection = document.getElementById('workersDirectorySection');
  if (dirSection) {
    dirSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  sfx.successChime();
}

// =====================================================================
// MATHEMATICAL FARE BREAKDOWN DIALOG MODAL
// =====================================================================
let currentFareModalWorker = null;

function openFareBreakdownModal(workerId, customDistanceKm = null) {
  const worker = APP_STATE.nearbyWorkers.find(w => w.id === workerId);
  if (!worker) return;
  currentFareModalWorker = worker;

  const defaultDistKm = customDistanceKm !== null ? Number(customDistanceKm) : (worker.distanceMeters / 1000);
  const fare = calculateWorkerDynamicFare(worker, defaultDistKm);

  document.getElementById('fdAvatar').textContent = worker.avatar;
  document.getElementById('fdWorkerName').textContent = worker.name;
  document.getElementById('fdTradeTitle').textContent = `${worker.trade} (${worker.categoryLabel})`;
  document.getElementById('fdSociety').textContent = `🏛️ ${worker.society} • ID: ${worker.coopId}`;

  const gradeChip = document.getElementById('fdGradeChip');
  if (gradeChip) {
    gradeChip.textContent = `Grade ${worker.grade}`;
    gradeChip.className = `grade-chip grade-${worker.grade.toLowerCase()}`;
  }

  // Distance Slider in Modal
  const distSlider = document.getElementById('fdDistanceSlider');
  if (distSlider) {
    distSlider.value = fare.distanceKm;
  }
  updateFareModalWithDistance(worker, fare.distanceKm);

  const modal = document.getElementById('fareBreakdownModal');
  if (modal) modal.classList.remove('hidden');
  sfx.playTone(540, 'sine', 0.08);
}

function closeFareBreakdownModal() {
  const modal = document.getElementById('fareBreakdownModal');
  if (modal) modal.classList.add('hidden');
}

function onFdDistanceSliderChange(distVal) {
  if (!currentFareModalWorker) return;
  updateFareModalWithDistance(currentFareModalWorker, parseFloat(distVal));
}

function updateFareModalWithDistance(worker, distKm) {
  const fare = calculateWorkerDynamicFare(worker, distKm);

  document.getElementById('fdSliderKm').textContent = `${fare.distanceKm} km`;
  document.getElementById('fdSliderEta').textContent = `~${worker.etaMins || Math.max(3, Math.round(fare.distanceKm * 7))} mins ETA`;

  document.getElementById('fdBaseWage').textContent = `₹${fare.baseFare}`;
  document.getElementById('fdCertTierName').textContent = fare.certLabel;
  document.getElementById('fdCertMultVal').textContent = `${fare.certMultiplier}x (+${fare.certPercent}%)`;
  document.getElementById('fdCertBonusVal').textContent = `+₹${fare.certBonusAmount}`;

  document.getElementById('fdRatingText').textContent = `${fare.rating} ★ (${fare.reviewsCount} Reviews)`;
  document.getElementById('fdRatingFactorVal').textContent = `${fare.ratingFactor}x (+${fare.ratingPercent}%)`;
  document.getElementById('fdRatingBonusVal').textContent = `+₹${fare.ratingBonusAmount}`;

  document.getElementById('fdDistChargeText').textContent = `${fare.distanceKm} km @ ₹${fare.perKmRate}/km`;
  document.getElementById('fdDistChargeVal').textContent = `+₹${fare.distanceCharge}`;

  document.getElementById('fdTotalBig').textContent = `₹${fare.totalFare}`;
  document.getElementById('fdWorkerShareVal').textContent = `₹${fare.workerShare}`;
  document.getElementById('fdCoopFeeVal').textContent = `₹${fare.coopFee}`;
}

function bookFromFareModal() {
  if (!currentFareModalWorker) return;
  const distSlider = document.getElementById('fdDistanceSlider');
  const distKm = distSlider ? parseFloat(distSlider.value) : null;
  closeFareBreakdownModal();
  bookWorkerDirectly(currentFareModalWorker.id, distKm);
}

// =====================================================================
// DETAILED WORKER PROFILE MODAL & DISTANCE SIMULATOR
// =====================================================================
let currentProfileWorker = null;

function openWorkerProfile(workerId) {
  const worker = APP_STATE.nearbyWorkers.find(w => w.id === workerId);
  if (!worker) return;
  currentProfileWorker = worker;

  const tier = getWorkerGradeTier(worker.jobs);
  const defaultDistKm = worker.distanceMeters / 1000;
  const fare = calculateWorkerDynamicFare(worker, defaultDistKm);

  document.getElementById('wpAvatar').textContent = worker.avatar;
  document.getElementById('wpName').textContent = worker.name;
  document.getElementById('wpTrade').textContent = worker.trade;
  document.getElementById('wpCategoryTag').textContent = worker.categoryLabel;
  document.getElementById('wpSociety').textContent = worker.society;
  document.getElementById('wpCoopId').textContent = worker.coopId;
  document.getElementById('wpJobsCount').textContent = worker.jobs;
  document.getElementById('wpRating').textContent = `${worker.rating} ★ (${worker.reviewsCount} verified reviews)`;
  document.getElementById('wpScore').textContent = `${worker.score}/100`;
  document.getElementById('wpExp').textContent = `${worker.experienceYears} Years`;
  document.getElementById('wpDistance').textContent = `${worker.distanceMeters} meters (~${worker.etaMins} mins ETA)`;
  document.getElementById('wpRate').textContent = `₹${fare.totalFare}`;
  document.getElementById('wpBio').textContent = worker.bio;

  // Grade Banner
  const gradeBadge = document.getElementById('wpGradeBadge');
  const gradeDesc = document.getElementById('wpGradeDesc');
  if (gradeBadge) {
    gradeBadge.textContent = tier.title.toUpperCase();
    gradeBadge.className = `profile-tier-badge grade-${tier.grade.toLowerCase()}`;
  }
  if (gradeDesc) {
    gradeDesc.innerHTML = `<strong>Accredited Criterion:</strong> ${tier.threshold} • Entitlement: <strong>${tier.multiplier}</strong>`;
  }

  // Dynamic Fare Block inside Profile Modal
  const rangeSlider = document.getElementById('wpDistanceRange');
  if (rangeSlider) rangeSlider.value = defaultDistKm;
  const ratePerKmEl = document.getElementById('wpSliderRatePerKm');
  if (ratePerKmEl) ratePerKmEl.textContent = fare.perKmRate;
  const certTagEl = document.getElementById('wpFareCertTag');
  if (certTagEl) certTagEl.textContent = `Grade ${worker.grade} (${fare.certMultiplier}x)`;
  const ratingTagEl = document.getElementById('wpFareRatingTag');
  if (ratingTagEl) ratingTagEl.textContent = `${worker.rating}★ (${worker.reviewsCount} reviews)`;

  onWpDistanceSliderChange(defaultDistKm);

  // Skills
  const skillsContainer = document.getElementById('wpSkillsList');
  if (skillsContainer) {
    skillsContainer.innerHTML = worker.specialties.map(s => `<span class="wp-pill">${s}</span>`).join('');
  }

  // Tools
  const toolsContainer = document.getElementById('wpToolsList');
  if (toolsContainer) {
    toolsContainer.innerHTML = worker.tools.map(t => `<span class="wp-tool-item">🔧 ${t}</span>`).join('');
  }

  // CTA button bindings
  const btnCert = document.getElementById('btnWpViewCert');
  if (btnCert) {
    btnCert.onclick = () => {
      closeWorkerProfileModal();
      openCertificateModal(worker);
    };
  }

  const btnBook = document.getElementById('btnWpBookDirect');
  if (btnBook) {
    btnBook.onclick = () => {
      const slider = document.getElementById('wpDistanceRange');
      const customDist = slider ? parseFloat(slider.value) : null;
      closeWorkerProfileModal();
      bookWorkerDirectly(worker.id, customDist);
    };
  }

  const modal = document.getElementById('workerProfileModal');
  if (modal) modal.classList.remove('hidden');
  sfx.playTone(580, 'sine', 0.08);
}

function onWpDistanceSliderChange(distVal) {
  if (!currentProfileWorker) return;
  const distKm = parseFloat(distVal);
  const fare = calculateWorkerDynamicFare(currentProfileWorker, distKm);

  const sliderDistVal = document.getElementById('wpSliderDistVal');
  const sliderEtaVal = document.getElementById('wpSliderEtaVal');
  const rcBase = document.getElementById('wpRcBase');
  const rcCert = document.getElementById('wpRcCert');
  const rcRating = document.getElementById('wpRcRating');
  const rcDist = document.getElementById('wpRcDist');
  const wpRate = document.getElementById('wpRate');
  const wpDistance = document.getElementById('wpDistance');

  if (sliderDistVal) sliderDistVal.textContent = `${fare.distanceKm} km`;
  if (sliderEtaVal) sliderEtaVal.textContent = `~${Math.max(3, Math.round(fare.distanceKm * 7))} mins ETA`;
  if (rcBase) rcBase.textContent = `₹${fare.baseFare}`;
  if (rcCert) rcCert.textContent = `+₹${fare.certBonusAmount}`;
  if (rcRating) rcRating.textContent = `+₹${fare.ratingBonusAmount}`;
  if (rcDist) rcDist.textContent = `+₹${fare.distanceCharge}`;
  if (wpRate) wpRate.textContent = `₹${fare.totalFare}`;
  if (wpDistance) wpDistance.textContent = `${fare.distanceMeters}m away`;
}

function closeWorkerProfileModal() {
  const modal = document.getElementById('workerProfileModal');
  if (modal) modal.classList.add('hidden');
}

// 1-Tap Booking for specific worker with dynamic fare
function bookWorkerDirectly(workerId, customDistKm = null) {
  const worker = APP_STATE.nearbyWorkers.find(w => w.id === workerId);
  if (!worker) return;

  const fare = calculateWorkerDynamicFare(worker, customDistKm);

  APP_STATE.selectedService = {
    id: worker.category,
    title: `${worker.categoryLabel} (${worker.name})`,
    price: fare.totalFare,
    icon: worker.avatar,
    workerShare: fare.workerShare,
    coopFee: fare.coopFee,
    preAssignedWorker: worker,
    fareDetails: fare
  };

  // Update Booking Dock
  document.getElementById('dockSrvIcon').textContent = worker.avatar;
  document.getElementById('dockSrvTitle').textContent = `${worker.categoryLabel} • ${worker.name} (Grade ${worker.grade})`;
  document.getElementById('dockSrvSub').textContent = `Direct dispatch: ${fare.distanceKm}km away • ~${worker.etaMins || Math.max(3, Math.round(fare.distanceKm * 7))} mins ETA • ${fare.rating}★ (${fare.reviewsCount} reviews) • ${worker.society}`;
  document.getElementById('dockBasePrice').textContent = `₹${fare.totalFare}`;
  document.querySelector('.coop-fee-note').textContent = 
    `(Dynamic Fare: Base ₹${fare.baseFare} + Cert(+${fare.certPercent}%) + Rating(+${fare.ratingPercent}%) + Distance ₹${fare.distanceCharge} • Worker 95%: ₹${fare.workerShare} • Coop 5%: ₹${fare.coopFee})`;

  // Ensure Customer portal is visible
  switchPortal('customer');

  // Scroll to dock smoothly
  const dock = document.getElementById('bookingDock');
  if (dock) {
    dock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dock.classList.add('pulse-dock-highlight');
    setTimeout(() => dock.classList.remove('pulse-dock-highlight'), 1800);
  }

  sfx.successChime();
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  initRoleGateway();
  initRadarMap();
  updateWorkerCertificationUI();
  renderWorkerDirectory();
  updateDynamicFareEstimator();
});


