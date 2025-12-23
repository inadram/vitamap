
export interface CountryData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  uvIndex: string;
  omega3: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskScore: number; // 0-100
  product: {
    name: string;
    match: string;
  };
}

export interface UserProfile {
  age: string;
  sex: 'Female' | 'Male';
  skinType: string;
}

export enum MapViewType {
  Sunshine = 'Sunshine',
  Dietary = 'Dietary',
  Heatmap = 'Heatmap'
}
