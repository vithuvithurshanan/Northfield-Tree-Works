import { TreeServiceItem, CustomerReview, TreeSymptom, ParallaxCutStage } from '../types';

export const TREE_SERVICES: TreeServiceItem[] = [
  {
    id: 'tree-trimming',
    title: 'Precision Tree Trimming & Pruning',
    category: 'trimming',
    shortDesc: 'Arborist-guided crown thinning, deadwood removal, and aesthetic canopy shaping.',
    fullDesc: 'Proper trimming is essential for tree structural health and safety. Our ISA-certified arborists remove hazardous overgrown limbs, improve sunlight penetration, and promote healthy growth patterns without stressing the tree.',
    priceStartingFrom: 180,
    unit: 'per tree',
    features: [
      'Crown thinning & elevation',
      'Deadwood & crossing branch removal',
      'Structural pruning for young trees',
      'Property & roof line clearance',
      'Debris chipping & site cleanup'
    ],
    iconName: 'Scissors',
    urgencyRecommended: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fm=webp&fit=crop&w=360&q=40'
  },
  {
    id: 'emergency-tree-removal',
    title: '24/7 Emergency Storm Removal',
    category: 'emergency',
    shortDesc: 'Rapid response for storm-damaged, fallen, or powerline-threatening trees.',
    fullDesc: 'High winds, heavy downpours, and lightning strikes can instantly turn mature trees into severe hazards. Our 24/7 storm team arrives with heavy rigging, cranes, and chainsaw crews to safely clear fallen trees off houses, driveways, and roads.',
    priceStartingFrom: 450,
    unit: 'emergency job',
    features: [
      '60-minute emergency dispatch option',
      'Safe rigging off roofs & vehicles',
      'Power utility coordination',
      'Insurance claim documentation',
      'Full hazard perimeter clearance'
    ],
    iconName: 'Zap',
    urgencyRecommended: true,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fm=webp&fit=crop&w=360&q=40'
  },
  {
    id: 'hazardous-tree-felling',
    title: 'Complete Hazardous Tree Felling',
    category: 'removal',
    shortDesc: 'Controlled sectional dismantling of diseased, dead, or structurally unstable trees.',
    fullDesc: 'When a tree is decaying or posing an imminent safety threat in tight urban spaces, standard falling is impossible. We use aerial buckets, crane assistance, and friction lowering devices to take down trees branch-by-branch with zero damage to surrounding property.',
    priceStartingFrom: 350,
    unit: 'per tree',
    features: [
      'Sectional piecemeal dismantling',
      'Crane-assisted tree removals',
      'Tight space / near-structure specialists',
      'Heavy timber logging & haulage',
      'Full root-line risk audit'
    ],
    iconName: 'Axe',
    urgencyRecommended: false,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fm=webp&fit=crop&w=360&q=40'
  },
  {
    id: 'stump-grinding',
    title: 'Deep Stump Grinding & Root Clearance',
    category: 'land',
    shortDesc: 'Complete stump elimination 8-12 inches below ground level.',
    fullDesc: 'Old tree stumps invite wood-boring pests like termites, yellowjackets, and carpenter ants. Our high-torque hydraulic stump grinders erase unsightly stumps and root flares, leaving pristine soil ready for replanting or sod installation.',
    priceStartingFrom: 120,
    unit: 'per stump',
    features: [
      'Sub-surface grinding (8"-12" depth)',
      'Root collar & lateral root removal',
      'Mulch recycling or removal option',
      'Underground utility line scan (811)',
      'Leveling & soil backfilling'
    ],
    iconName: 'Disc',
    urgencyRecommended: false,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fm=webp&fit=crop&w=360&q=40'
  },
  {
    id: 'arborist-health-diagnosis',
    title: 'Arborist Health Inspection & Disease Treatment',
    category: 'health',
    shortDesc: 'Microscopic soil analysis, pest control, deep-root fertilization, and tree rescue.',
    fullDesc: 'Save infected or stressed trees before removal becomes necessary. Our certified arborists diagnose root rot, fungal infections, bark beetles, and nutrient deficiencies, prescribing targeted trunk micro-injections and root aeration.',
    priceStartingFrom: 150,
    unit: 'consultation',
    features: [
      'ISA Certified Arborist evaluation',
      'Tree decay & sonic tomography test',
      'Systemic pest micro-injections',
      'Deep root mycorrhizal fertilization',
      'Risk assessment certification report'
    ],
    iconName: 'Stethoscope',
    urgencyRecommended: false,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fm=webp&fit=crop&w=360&q=40'
  },
  {
    id: 'lot-clearing-crane',
    title: 'Lot Clearing & Commercial Land Prep',
    category: 'land',
    shortDesc: 'Heavy equipment brush removal, selective forestry mulching, and site clearance.',
    fullDesc: 'Preparing land for new construction, driveways, or firebreaks? We handle full acreage clearing with excavators, forestry mulchers, and high-capacity chippers to deliver clean build-ready ground.',
    priceStartingFrom: 850,
    unit: 'per quarter acre',
    features: [
      'Forestry mulching & brush clearing',
      'Selective tree preservation',
      'Boulder & heavy debris removal',
      'Erosion control compliance',
      'Rapid turnaround timeline'
    ],
    iconName: 'Tractor',
    urgencyRecommended: false,
    image: 'https://images.unsplash.com/photo-1511497584788-876761c11969?auto=format&fm=webp&fit=crop&w=360&q=40'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    location: 'Oakridge Estates',
    rating: 5,
    date: '2 days ago',
    serviceUsed: '24/7 Emergency Storm Removal',
    comment: 'A massive 60ft pine limb cracked right over our master bedroom during midnight storms. Northfield Tree Works arrived within 45 minutes! Their crane operator extracted the heavy timber with pinpoint accuracy. Unbelievable precision and clean-up.',
    verified: true,
    avatarSeed: 'marcus'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    location: 'Green Valley',
    rating: 5,
    date: '1 week ago',
    serviceUsed: 'Precision Tree Trimming',
    comment: 'Our ancient oak tree was blocking all sunlight and touching roof shingles. The crew trimmed it back symmetrically while keeping the tree healthy and gorgeous. The glass contact form quote was spot on!',
    verified: true,
    avatarSeed: 'elena'
  },
  {
    id: 'rev-3',
    author: 'David Chen',
    location: 'Suburban Pines',
    rating: 5,
    date: '2 weeks ago',
    serviceUsed: 'Stump Grinding & Root Clearance',
    comment: 'Had 3 huge oak stumps left behind by a previous contractor. Northfield Tree Works ground them down 10 inches below grass level and backfilled the soil perfectly. Lawn looks brand new!',
    verified: true,
    avatarSeed: 'david'
  }
];

export const TREE_SYMPTOMS: TreeSymptom[] = [
  {
    id: 'sym-1',
    symptomName: 'Yellowing / Wilting Leaves in Summer',
    category: 'leaves',
    severity: 'medium',
    possibleCause: 'Chlorosis, root compaction, or early vascular wilt fungal attack.',
    recommendedAction: 'Deep root soil aeration and nutrient injection recommended before leaves drop.'
  },
  {
    id: 'sym-2',
    symptomName: 'Cracked Bark or Hollow Trunk Cavity',
    category: 'bark',
    severity: 'critical',
    possibleCause: 'Internal heartwood decay fungi or structural frost crack.',
    recommendedAction: 'Immediate ISA Arborist Risk Inspection. May require cabling support or controlled felling.'
  },
  {
    id: 'sym-3',
    symptomName: 'Fungal Bracket / Mushroom Clusters at Base',
    category: 'structure',
    severity: 'critical',
    possibleCause: 'Armillaria root rot or Ganoderma wood-decay fungus destroying root anchor.',
    recommendedAction: 'High fall hazard! Schedule urgent risk audit to determine structural root stability.'
  },
  {
    id: 'sym-4',
    symptomName: 'Pin-Sized Holes & Sawdust on Bark (Frass)',
    category: 'pests',
    severity: 'critical',
    possibleCause: 'Active Bark Beetle, Emerald Ash Borer, or Carpenter Ant infestation.',
    recommendedAction: 'Urgent systemic insecticide trunk treatment to protect tree canopy.'
  }
];

export const PARALLAX_CUT_STAGES: ParallaxCutStage[] = [
  {
    id: 1,
    stageName: '1. Initial Inspection & Canopy Assessment',
    scrollProgressRange: [0, 0.25],
    tagline: 'Lush 100% Full Canopy Overview',
    arboristNote: 'Rigging plan established. Arborists secure harness anchors and inspect powerline safety margins.',
    canopyDensityPercentage: 100,
    cutLineYPercent: 10,
    treeState: 'intact',
    safetyProtocol: 'Zone perimeter orange cone lockdown and drop zone clear radius verified.'
  },
  {
    id: 2,
    stageName: '2. Precision Limb Pruning & Crown Thinning',
    scrollProgressRange: [0.25, 0.50],
    tagline: 'Controlled High-Branch Canopy Reduction',
    arboristNote: 'Overhanging limbs trimmed with aerial chainsaw and lowered via zip-line friction brake.',
    canopyDensityPercentage: 65,
    cutLineYPercent: 35,
    treeState: 'pruned',
    safetyProtocol: 'Friction lowering rope active to ensure zero impact on ground structures.'
  },
  {
    id: 3,
    stageName: '3. Controlled Trunk Sectioning & Felling Cut',
    scrollProgressRange: [0.50, 0.75],
    tagline: 'Interlocking Saw Notch & Wedge Placement',
    arboristNote: 'Main trunk sections cut in 4ft blocks. Chainsaw spark line indicates clean timber separation.',
    canopyDensityPercentage: 25,
    cutLineYPercent: 60,
    treeState: 'felling',
    safetyProtocol: 'Voice radio communications and crane load cell monitoring in real time.'
  },
  {
    id: 4,
    stageName: '4. Clean Ground Restoration & Stump Finish',
    scrollProgressRange: [0.75, 1.0],
    tagline: '100% Cleared & Restored Yard',
    arboristNote: 'Timber hauled away for recycling, wood chip mulch distributed, stump ground flush.',
    canopyDensityPercentage: 0,
    cutLineYPercent: 90,
    treeState: 'cleared',
    safetyProtocol: 'Site vacuumed, sod rake completed, homeowner final walkthrough sign-off.'
  }
];
