// Mock Feastables global sales data
export interface CountryData {
  country: string;
  flag: string;
  revenue: number;
  profit: number;
  loss: number;
  gained: number;
  users: number;
  donations: number;
}

export interface RegionData {
  region: string;
  color: string;
  totalRevenue: number;
  totalProfit: number;
  totalLoss: number;
  totalGained: number;
  totalUsers: number;
  totalDonations: number;
  countries: CountryData[];
}

export const salesData: RegionData[] = [
  {
    region: 'North America',
    color: '#0057FF',
    totalRevenue: 112_000_000,
    totalProfit: 38_200_000,
    totalLoss: 4_100_000,
    totalGained: 34_100_000,
    totalUsers: 4_820_000,
    totalDonations: 2_300_000,
    countries: [
      { country: 'United States', flag: '🇺🇸', revenue: 89_000_000, profit: 31_000_000, loss: 2_900_000, gained: 28_100_000, users: 3_800_000, donations: 1_900_000 },
      { country: 'Canada', flag: '🇨🇦', revenue: 14_500_000, profit: 5_100_000, loss: 800_000, gained: 4_300_000, users: 720_000, donations: 280_000 },
      { country: 'Mexico', flag: '🇲🇽', revenue: 8_500_000, profit: 2_100_000, loss: 400_000, gained: 1_700_000, users: 300_000, donations: 120_000 },
    ],
  },
  {
    region: 'Europe',
    color: '#7C3AED',
    totalRevenue: 64_000_000,
    totalProfit: 19_800_000,
    totalLoss: 3_200_000,
    totalGained: 16_600_000,
    totalUsers: 2_140_000,
    totalDonations: 980_000,
    countries: [
      { country: 'United Kingdom', flag: '🇬🇧', revenue: 22_000_000, profit: 7_200_000, loss: 900_000, gained: 6_300_000, users: 720_000, donations: 350_000 },
      { country: 'Germany', flag: '🇩🇪', revenue: 16_000_000, profit: 5_100_000, loss: 700_000, gained: 4_400_000, users: 510_000, donations: 240_000 },
      { country: 'France', flag: '🇫🇷', revenue: 12_000_000, profit: 3_800_000, loss: 600_000, gained: 3_200_000, users: 390_000, donations: 180_000 },
      { country: 'Spain', flag: '🇪🇸', revenue: 8_000_000, profit: 2_400_000, loss: 500_000, gained: 1_900_000, users: 280_000, donations: 120_000 },
      { country: 'Italy', flag: '🇮🇹', revenue: 6_000_000, profit: 1_300_000, loss: 500_000, gained: 800_000, users: 240_000, donations: 90_000 },
    ],
  },
  {
    region: 'Asia Pacific',
    color: '#059669',
    totalRevenue: 42_000_000,
    totalProfit: 11_200_000,
    totalLoss: 5_800_000,
    totalGained: 5_400_000,
    totalUsers: 3_610_000,
    totalDonations: 620_000,
    countries: [
      { country: 'Australia', flag: '🇦🇺', revenue: 14_000_000, profit: 4_500_000, loss: 1_100_000, gained: 3_400_000, users: 680_000, donations: 240_000 },
      { country: 'Japan', flag: '🇯🇵', revenue: 11_000_000, profit: 3_100_000, loss: 1_800_000, gained: 1_300_000, users: 920_000, donations: 180_000 },
      { country: 'South Korea', flag: '🇰🇷', revenue: 8_500_000, profit: 2_100_000, loss: 1_500_000, gained: 600_000, users: 740_000, donations: 110_000 },
      { country: 'India', flag: '🇮🇳', revenue: 5_500_000, profit: 900_000, loss: 900_000, gained: 0, users: 1_010_000, donations: 60_000 },
      { country: 'New Zealand', flag: '🇳🇿', revenue: 3_000_000, profit: 600_000, loss: 500_000, gained: 100_000, users: 260_000, donations: 30_000 },
    ],
  },
  {
    region: 'Latin America',
    color: '#DC2626',
    totalRevenue: 18_500_000,
    totalProfit: 3_900_000,
    totalLoss: 2_600_000,
    totalGained: 1_300_000,
    totalUsers: 1_240_000,
    totalDonations: 210_000,
    countries: [
      { country: 'Brazil', flag: '🇧🇷', revenue: 9_000_000, profit: 2_000_000, loss: 1_400_000, gained: 600_000, users: 610_000, donations: 110_000 },
      { country: 'Argentina', flag: '🇦🇷', revenue: 5_500_000, profit: 1_100_000, loss: 800_000, gained: 300_000, users: 390_000, donations: 60_000 },
      { country: 'Colombia', flag: '🇨🇴', revenue: 4_000_000, profit: 800_000, loss: 400_000, gained: 400_000, users: 240_000, donations: 40_000 },
    ],
  },
  {
    region: 'Middle East & Africa',
    color: '#D97706',
    totalRevenue: 14_500_000,
    totalProfit: 2_800_000,
    totalLoss: 2_100_000,
    totalGained: 700_000,
    totalUsers: 890_000,
    totalDonations: 380_000,
    countries: [
      { country: 'UAE', flag: '🇦🇪', revenue: 6_500_000, profit: 1_600_000, loss: 600_000, gained: 1_000_000, users: 340_000, donations: 190_000 },
      { country: 'Saudi Arabia', flag: '🇸🇦', revenue: 4_500_000, profit: 800_000, loss: 700_000, gained: 100_000, users: 280_000, donations: 120_000 },
      { country: 'South Africa', flag: '🇿🇦', revenue: 3_500_000, profit: 400_000, loss: 800_000, gained: -400_000, users: 270_000, donations: 70_000 },
    ],
  },
];

export const globalTotals = {
  revenue: 251_000_000,
  profit: 75_900_000,
  loss: 17_800_000,
  gained: 58_100_000,
  users: 12_700_000,
  donations: 4_490_000,
};
