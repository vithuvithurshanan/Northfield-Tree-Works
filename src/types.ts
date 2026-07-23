export type ThemeMode = 'light' | 'dark' | 'system';

export interface TreeServiceItem {
  id: string;
  title: string;
  category: 'trimming' | 'removal' | 'emergency' | 'health' | 'land';
  shortDesc: string;
  fullDesc: string;
  priceStartingFrom: number;
  unit: string;
  features: string[];
  iconName: string;
  urgencyRecommended: boolean;
  image: string;
}

export interface QuoteCalculatorState {
  treeHeightFt: number;
  treeCondition: 'healthy' | 'leaning' | 'dead_rotting' | 'storm_hazard';
  proximity: 'clear' | 'near_house' | 'powerlines' | 'tight_space';
  numberOfTrees: number;
  includeStumpGrinding: boolean;
  includeWoodChipping: boolean;
  emergencyExpress: boolean;
  zipCode: string;
}

export interface CalculatedQuoteResult {
  minPrice: number;
  maxPrice: number;
  estimatedHours: string;
  riskFactor: 'Low' | 'Moderate' | 'High' | 'Severe';
  recommendedEquipment: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  serviceUsed: string;
  comment: string;
  verified: boolean;
  avatarSeed: string;
}

export interface TreeSymptom {
  id: string;
  symptomName: string;
  category: 'leaves' | 'bark' | 'structure' | 'pests';
  severity: 'low' | 'medium' | 'critical';
  possibleCause: string;
  recommendedAction: string;
}

export interface ParallaxCutStage {
  id: number;
  stageName: string;
  scrollProgressRange: [number, number]; // e.g. [0, 0.25]
  tagline: string;
  arboristNote: string;
  canopyDensityPercentage: number; // 100% -> 70% -> 30% -> 0%
  cutLineYPercent: number;
  treeState: 'intact' | 'pruned' | 'felling' | 'cleared';
  safetyProtocol: string;
}
