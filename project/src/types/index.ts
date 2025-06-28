export interface NavLink {
  label: string;
  path: string;
}

export interface LocationData {
  id: string;
  city: string;
  state: string;
  suitabilityScore: number;
  solarRadiation: number;
  landAvailability: number;
  windSpeed: number;
  coordinates: [number, number];
  details?: {
    latitude: string;
    longitude: string;
    predictedScore: number;
  };
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}