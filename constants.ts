
import { CountryData } from './types';

export const EUROPE_COUNTRIES: CountryData[] = [
  {
    id: 'sweden',
    name: 'Sweden',
    lat: 59.3293,
    lng: 18.0686,
    uvIndex: 'Very Low',
    omega3: 'Moderate',
    riskLevel: 'High',
    riskScore: 85,
    product: { name: 'Arctic D3+', match: '98% Match' }
  },
  {
    id: 'germany',
    name: 'Germany',
    lat: 52.5200,
    lng: 13.4050,
    uvIndex: 'Low',
    omega3: 'High',
    riskLevel: 'Moderate',
    riskScore: 45,
    product: { name: 'Euro-D Essentials', match: '92% Match' }
  },
  {
    id: 'france',
    name: 'France',
    lat: 48.8566,
    lng: 2.3522,
    uvIndex: 'Moderate',
    omega3: 'Moderate',
    riskLevel: 'Moderate',
    riskScore: 55,
    product: { name: 'Solaris D Balance', match: '85% Match' }
  },
  {
    id: 'spain',
    name: 'Spain',
    lat: 40.4168,
    lng: -3.7038,
    uvIndex: 'High',
    omega3: 'Moderate',
    riskLevel: 'Low',
    riskScore: 15,
    product: { name: 'Mediterranean D+', match: '78% Match' }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    uvIndex: 'Very Low',
    omega3: 'Low',
    riskLevel: 'High',
    riskScore: 92,
    product: { name: 'Thames Fortify D', match: '99% Match' }
  },
  {
    id: 'italy',
    name: 'Italy',
    lat: 41.9028,
    lng: 12.4964,
    uvIndex: 'Moderate',
    omega3: 'High',
    riskLevel: 'Low',
    riskScore: 22,
    product: { name: 'Lumina D Support', match: '81% Match' }
  },
  {
    id: 'norway',
    name: 'Norway',
    lat: 59.9139,
    lng: 10.7522,
    uvIndex: 'Extremely Low',
    omega3: 'Very High',
    riskLevel: 'High',
    riskScore: 78,
    product: { name: 'Fjord Omega-D', match: '95% Match' }
  }
];

export const SKIN_TYPES = [
  { id: '1', label: 'Type I (Very Fair)' },
  { id: '2', label: 'Type II (Fair)' },
  { id: '3', label: 'Type III (Medium)' },
  { id: '4', label: 'Type IV (Olive)' },
  { id: '5', label: 'Type V (Brown)' },
  { id: '6', label: 'Type VI (Dark Brown/Black)' },
];
