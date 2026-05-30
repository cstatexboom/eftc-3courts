export type ScenarioKey = 'downside' | 'base' | 'upside';

export type Scenario = {
  key: ScenarioKey;
  label: string;
  shortLabel: string;
  bookingRevenue: number;
  coachingRevenue: number;
  coachingLessonsPerWeek: number;
  coachingIncentive: number;
  cashCost: number;
  operatingCashflow: number;
  accountingProfit: number;
  paybackYears: number;
  paybackMonth: number;
  color: string;
};

export const capexItems = [
  { name: '沥青铺设 + 丙烯酸', english: 'Asphalt + acrylic surface', amount: 250000 },
  { name: '顶棚', english: 'Canopy structure', amount: 400000 },
  { name: '灯光 / 围网 / 球网', english: 'Lighting, fence, nets', amount: 100000 },
  { name: '前台集装箱', english: 'Front desk container', amount: 100000 },
];

export const fixedCosts = [
  { name: '年租金', english: 'Annual rent', amount: 110000 },
  { name: '全职教练底薪', english: 'Full-time coach base salary', amount: 50000 },
  { name: '店长底薪', english: 'Manager base salary', amount: 50000 },
  { name: '兼职前台', english: 'Part-time front desk', amount: 20000 },
  { name: '水电费', english: 'Utilities', amount: 36000 },
];

export const assumptions = {
  initialInvestment: 850000,
  depreciationYears: 10,
  annualDepreciation: 85000,
  cashFixedCost: 266000,
  accountingFixedCost: 351000,
  normalCoveredRevenue: 644592,
  normalOutdoorRevenue: 202436,
  normalBookingRevenue: 847028,
  averageCoachingPrice: 250,
  coachingIncentivePerLesson: 50,
  weeksPerYear: 52,
  coveredCourts: 2,
  outdoorCourts: 1,
};

export const priceRows = [
  {
    period: '工作日白天',
    english: 'Weekday day',
    hours: '8h',
    coveredPrice: 140,
    outdoorPrice: 80,
    coveredUtilization: 10,
    outdoorUtilization: 15,
  },
  {
    period: '工作日晚场',
    english: 'Weekday evening',
    hours: '7h',
    coveredPrice: 180,
    outdoorPrice: 100,
    coveredUtilization: 50,
    outdoorUtilization: 55,
  },
  {
    period: '周末白天',
    english: 'Weekend day',
    hours: '8h',
    coveredPrice: 200,
    outdoorPrice: 100,
    coveredUtilization: 20,
    outdoorUtilization: 30,
  },
  {
    period: '周末晚场',
    english: 'Weekend evening',
    hours: '7h',
    coveredPrice: 220,
    outdoorPrice: 120,
    coveredUtilization: 60,
    outdoorUtilization: 60,
  },
];

export const scenarios: Scenario[] = [
  {
    key: 'downside',
    label: '悲观模型',
    shortLabel: '悲观',
    bookingRevenue: 592920,
    coachingRevenue: 130000,
    coachingLessonsPerWeek: 10,
    coachingIncentive: 26000,
    cashCost: 292000,
    operatingCashflow: 430920,
    accountingProfit: 345920,
    paybackYears: 1.97,
    paybackMonth: 24,
    color: '#60A5FA',
  },
  {
    key: 'base',
    label: '正常模型',
    shortLabel: '正常',
    bookingRevenue: 847028,
    coachingRevenue: 195000,
    coachingLessonsPerWeek: 15,
    coachingIncentive: 39000,
    cashCost: 305000,
    operatingCashflow: 737028,
    accountingProfit: 652028,
    paybackYears: 1.15,
    paybackMonth: 14,
    color: '#0EA5E9',
  },
  {
    key: 'upside',
    label: '乐观模型',
    shortLabel: '乐观',
    bookingRevenue: 1101136,
    coachingRevenue: 260000,
    coachingLessonsPerWeek: 20,
    coachingIncentive: 52000,
    cashCost: 318000,
    operatingCashflow: 1043136,
    accountingProfit: 958136,
    paybackYears: 0.81,
    paybackMonth: 10,
    color: '#2563EB',
  },
];

export const revenueMix = [
  { name: '顶棚标准场', english: 'Covered courts', value: assumptions.normalCoveredRevenue },
  { name: '室外标准场', english: 'Outdoor court', value: assumptions.normalOutdoorRevenue },
  { name: '私教收入', english: '1:1 coaching', value: 195000 },
];

export const cashflowData = Array.from({ length: 37 }, (_, month) => {
  const row: Record<string, number> & { month: number } = { month };
  scenarios.forEach((scenario) => {
    row[scenario.shortLabel] =
      month === 0
        ? -assumptions.initialInvestment
        : -assumptions.initialInvestment + (scenario.operatingCashflow / 12) * month;
  });
  return row;
});

export const scenarioRows = scenarios.map((scenario) => ({
  ...scenario,
  totalRevenue: scenario.bookingRevenue + scenario.coachingRevenue,
}));

export const navItems = [
  ['首页', 'hero'],
  ['结构', 'model'],
  ['投资', 'capex'],
  ['价格', 'pricing'],
  ['订场', 'booking'],
  ['私教', 'coaching'],
  ['预测', 'forecast'],
  ['现金流', 'cashflow'],
  ['结论', 'conclusion'],
] as const;

export const disclaimer =
  '本模型为经营测算简化版本，暂未计入税费、营销推广费、维修保险费、活动成本、软件系统费用及其他不可预见支出，实际经营结果需以后续运营数据校准。';
