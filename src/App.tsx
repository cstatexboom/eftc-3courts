import {
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Clock3,
  Landmark,
  LineChart,
  ShieldAlert,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  assumptions,
  capexItems,
  cashflowData,
  disclaimer,
  fixedCosts,
  navItems,
  priceRows,
  revenueMix,
  scenarioRows,
  scenarios,
} from './data/financialModel';

const formatWan = (value: number) => `${(value / 10000).toFixed(1)}万`;
const formatRmb = (value: number) => `¥${Math.round(value).toLocaleString('zh-CN')}`;

const SectionTitle = ({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="max-w-3xl">
    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-600">{kicker}</p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
    {subtitle ? <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">{subtitle}</p> : null}
  </div>
);

const MetricCard = ({
  label,
  value,
  note,
  tone = 'light',
}: {
  label: string;
  value: string;
  note: string;
  tone?: 'light' | 'dark';
}) => (
  <div className={tone === 'dark' ? 'dark-panel rounded-3xl p-6' : 'bp-card rounded-3xl p-6'}>
    <p className={tone === 'dark' ? 'text-sm text-sky-100' : 'metric-label'}>{label}</p>
    <p className={tone === 'dark' ? 'mt-3 text-3xl font-semibold text-white' : 'mt-3 text-3xl font-semibold text-slate-950'}>
      {value}
    </p>
    <p className={tone === 'dark' ? 'mt-3 text-sm text-blue-100' : 'mt-3 text-sm text-slate-500'}>{note}</p>
  </div>
);

const SimpleTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-3 text-sm shadow-xl">
      <p className="mb-2 font-medium text-slate-900">{typeof label === 'number' ? `第 ${label} 月` : label}</p>
      {payload.map((item: any) => (
        <p key={item.dataKey} className="text-slate-600">
          <span style={{ color: item.color }}>●</span> {item.name || item.dataKey}: {formatRmb(item.value)}
        </p>
      ))}
    </div>
  );
};

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/50 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
            ET
          </span>
          <span className="hidden text-sm font-semibold text-slate-950 sm:block">Evolution Tennis Financial</span>
        </a>
        <nav className="flex max-w-[72vw] gap-1 overflow-x-auto rounded-full bg-slate-100 p-1 text-sm text-slate-600">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-white hover:text-slate-950">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="slide relative flex items-center px-4 pt-28 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-medium text-sky-700">
            3 courts financial forecast / 三片场财务预测
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            进界网球俱乐部财务预测模型
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            2片顶棚标准场 + 1片室外标准场的小型精品网球 Club 模型。用于展示财务假设、三档预测结果、现金流与静态回本周期。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard label="初始投资 / Initial CAPEX" value="85.0万" note="折旧按10年，年折旧8.5万" tone="dark" />
          <MetricCard label="年租金 / Annual rent" value="11.0万" note="轻资产、低固定租金模型" />
          <MetricCard label="正常年收入 / Base revenue" value="104.2万" note="订场84.7万 + 私教19.5万" />
          <MetricCard label="正常经营现金流 / Base OCF" value="73.7万" note="静态回本约1.15年" tone="dark" />
        </div>
      </div>
    </section>
  );
}

function ModelSection() {
  const cards = [
    { icon: Landmark, title: '场地配置', text: '2片顶棚标准硬地 + 1片室外标准硬地，无单打场，无发球机。' },
    { icon: Users, title: '商业模式', text: '以会员体系为中心，订场与比赛构成日常高频触点。' },
    { icon: Target, title: '私教定位', text: '私教不是主要利润中心，而是培养长期用户和订场习惯的转化工具。' },
  ];

  return (
    <section id="model" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle kicker="The model / 项目结构" title="小型精品 Club，不是传统培训馆。" subtitle="核心逻辑是用较低固定成本承接稳定夜场需求，再通过会员活动和私教提升留存与复购。" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bp-card rounded-3xl p-8">
                <Icon className="h-8 w-8 text-sky-600" />
                <h3 className="mt-8 text-2xl font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CapexSection() {
  return (
    <section id="capex" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionTitle kicker="CAPEX / 初始投资" title="85万启动资金，主要投向顶棚与基础场地。" subtitle="模型按10年折旧，会计口径每年确认8.5万元折旧成本。" />
        <div className="bp-card rounded-3xl p-5 md:p-8">
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capexItems} layout="vertical" margin={{ left: 28, right: 24, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" tickFormatter={formatWan} stroke="#64748B" />
                <YAxis type="category" dataKey="name" width={112} stroke="#64748B" />
                <Tooltip content={<SimpleTooltip />} />
                <Bar dataKey="amount" name="投资额" radius={[0, 8, 8, 0]}>
                  {capexItems.map((_, index) => (
                    <Cell key={index} fill={['#1D4ED8', '#0EA5E9', '#60A5FA', '#93C5FD'][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard label="总 CAPEX" value={formatWan(assumptions.initialInvestment)} note="一次性投入" />
            <MetricCard label="年折旧" value={formatWan(assumptions.annualDepreciation)} note="10年直线折旧" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle kicker="Pricing & Utilization / 价格与利用率" title="夜场利用率决定模型弹性。" subtitle="正常模型使用下方利用率；悲观整体下调30%，乐观整体上调30%。" />
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white/85">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-5 py-4">时段 / Period</th>
                  <th className="px-5 py-4">小时</th>
                  <th className="px-5 py-4">顶棚价格</th>
                  <th className="px-5 py-4">室外价格</th>
                  <th className="px-5 py-4">顶棚利用率</th>
                  <th className="px-5 py-4">室外利用率</th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.period} className="border-t border-slate-200">
                    <td className="px-5 py-4 font-medium text-slate-950">
                      {row.period}
                      <span className="block text-xs font-normal text-slate-500">{row.english}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{row.hours}</td>
                    <td className="px-5 py-4 text-slate-600">{row.coveredPrice}元/小时</td>
                    <td className="px-5 py-4 text-slate-600">{row.outdoorPrice}元/小时</td>
                    <td className="px-5 py-4 font-semibold text-sky-700">{row.coveredUtilization}%</td>
                    <td className="px-5 py-4 font-semibold text-blue-700">{row.outdoorUtilization}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section id="booking" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionTitle kicker="Court booking / 订场收入" title="正常模型订场收入约84.7万。" />
          <div className="mt-8 grid gap-4">
            <MetricCard label="顶棚标准场 / Covered courts" value="64.5万" note="两片顶棚场，承担主要收入贡献" />
            <MetricCard label="室外标准场 / Outdoor court" value="20.2万" note="一片室外场，低价高频补充" />
            <MetricCard label="订场总收入 / Total booking" value="84.7万" note="正常模型年度订场收入" tone="dark" />
          </div>
        </div>
        <div className="bp-card rounded-3xl p-5 md:p-8">
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={scenarioRows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="shortLabel" stroke="#64748B" />
                <YAxis tickFormatter={formatWan} stroke="#64748B" />
                <Tooltip content={<SimpleTooltip />} />
                <Bar dataKey="bookingRevenue" name="订场收入" radius={[10, 10, 0, 0]}>
                  {scenarioRows.map((row) => (
                    <Cell key={row.key} fill={row.color} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoachingSection() {
  return (
    <section id="coaching" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionTitle kicker="Coaching / 私教收入" title="私教是用户转化工具，不是培训馆逻辑。" subtitle="仅做1对1课程，顶棚与室外各占50%，平均单节收入250元，教练课时绩效50元/节。" />
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="平均单节收入" value="250元" note="顶棚300元，室外200元" />
            <MetricCard label="正常周课时" value="15节" note="年私教收入19.5万" />
            <MetricCard label="课时绩效" value="50元/节" note="正常年绩效3.9万" />
          </div>
          <div className="bp-card rounded-3xl p-5 md:p-8">
            <div className="chart-height">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="shortLabel" stroke="#64748B" />
                  <YAxis yAxisId="left" tickFormatter={formatWan} stroke="#64748B" />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748B" />
                  <Tooltip content={<SimpleTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="coachingRevenue" name="年私教收入" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
                  <Bar yAxisId="left" dataKey="coachingIncentive" name="年课时绩效" fill="#93C5FD" radius={[8, 8, 0, 0]} />
                  <Line yAxisId="right" dataKey="coachingLessonsPerWeek" name="每周课时" stroke="#1E3A8A" strokeWidth={3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ForecastSection() {
  return (
    <section id="forecast" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle kicker="Scenario forecast / 三档预测总览" title="正常模型经营现金流约73.7万。" subtitle="现金流和会计利润分开展示，折旧会影响会计利润，但不影响当期现金回收。" />
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white/85">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-5 py-4">模型</th>
                  <th className="px-5 py-4">订场收入</th>
                  <th className="px-5 py-4">私教收入</th>
                  <th className="px-5 py-4">总收入</th>
                  <th className="px-5 py-4">现金成本</th>
                  <th className="px-5 py-4">经营现金流</th>
                  <th className="px-5 py-4">会计利润</th>
                  <th className="px-5 py-4">回本周期</th>
                </tr>
              </thead>
              <tbody>
                {scenarioRows.map((row) => (
                  <tr key={row.key} className="border-t border-slate-200">
                    <td className="px-5 py-5 font-semibold text-slate-950">{row.label}</td>
                    <td className="px-5 py-5">{formatWan(row.bookingRevenue)}</td>
                    <td className="px-5 py-5">{formatWan(row.coachingRevenue)}</td>
                    <td className="px-5 py-5 font-semibold text-slate-950">{formatWan(row.totalRevenue)}</td>
                    <td className="px-5 py-5">{formatWan(row.cashCost)}</td>
                    <td className="px-5 py-5 font-semibold text-sky-700">{formatWan(row.operatingCashflow)}</td>
                    <td className="px-5 py-5">{formatWan(row.accountingProfit)}</td>
                    <td className="px-5 py-5 font-semibold text-blue-700">约{row.paybackYears}年</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
          备注：当前模型暂未计入税费、日常营销、维修、保险、活动成本、系统费用和不可预见支出。
        </p>
      </div>
    </section>
  );
}

function CashflowSection() {
  return (
    <section id="cashflow" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <SectionTitle kicker="Cashflow / 现金流与回本" title="36个月累计现金流曲线。" subtitle="月0初始投入-85万，之后按不同模型的月均经营现金流累加。" />
          <div className="mt-8 grid gap-4">
            {scenarios.map((scenario) => (
              <div key={scenario.key} className="bp-card rounded-2xl p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-slate-950">{scenario.label}</span>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">约第{scenario.paybackMonth}个月回本</span>
                </div>
                <p className="mt-3 text-sm text-slate-500">月均经营现金流 {formatRmb(scenario.operatingCashflow / 12)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bp-card rounded-3xl p-5 md:p-8">
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={cashflowData} margin={{ top: 12, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis tickFormatter={formatWan} stroke="#64748B" />
                <Tooltip content={<SimpleTooltip />} />
                <Legend />
                <ReferenceLine y={0} stroke="#0F172A" strokeWidth={1.5} />
                <ReferenceLine x={10} stroke="#2563EB" strokeDasharray="4 4" label={{ value: '乐观 M10', fill: '#2563EB', position: 'insideTop' }} />
                <ReferenceLine x={14} stroke="#0EA5E9" strokeDasharray="4 4" label={{ value: '正常 M14', fill: '#0EA5E9', position: 'insideTop' }} />
                <ReferenceLine x={24} stroke="#60A5FA" strokeDasharray="4 4" label={{ value: '悲观 M24', fill: '#60A5FA', position: 'insideTop' }} />
                {scenarios.map((scenario) => (
                  <Line
                    key={scenario.key}
                    type="monotone"
                    dataKey={scenario.shortLabel}
                    name={scenario.label}
                    dot={false}
                    stroke={scenario.color}
                    strokeWidth={3}
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConclusionSection() {
  return (
    <section id="conclusion" className="slide flex items-center px-4 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <SectionTitle kicker="Conclusion / 结论" title="模型质量最终来自长期留存。" />
          <div className="mt-10 space-y-4 text-xl leading-9 text-slate-700">
            <p><span className="font-semibold text-slate-950">1.</span> 项目固定成本较低，悲观模型下仍具备生存能力。</p>
            <p><span className="font-semibold text-slate-950">2.</span> 正常模型下，经营现金流约73.7万元，静态回本周期约1.15年。</p>
            <p><span className="font-semibold text-slate-950">3.</span> 后续真正决定模型质量的，不只是场地利用率，而是会员活跃度、夜场运营能力和长期留存。</p>
          </div>
          <p className="mt-10 rounded-2xl border border-slate-200 bg-white/80 p-5 text-sm leading-7 text-slate-600">{disclaimer}</p>
        </div>
        <div className="dark-panel rounded-3xl p-7 md:p-9">
          <div className="flex items-center gap-3 text-sky-100">
            <Trophy className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-[0.16em]">Investor BP view</span>
          </div>
          <div className="mt-10 grid gap-4">
            <MetricCard label="现金固定成本" value={formatWan(assumptions.cashFixedCost)} note="不含私教绩效" />
            <MetricCard label="会计固定成本" value={formatWan(assumptions.accountingFixedCost)} note="含年折旧8.5万" />
            <MetricCard label="正常总收入" value={formatWan(1042028)} note="订场 + 私教" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RevenueMixStrip() {
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bp-card rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-sky-600" />
            <h3 className="text-xl font-semibold text-slate-950">正常模型收入结构</h3>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueMix} dataKey="value" nameKey="name" innerRadius={58} outerRadius={94} paddingAngle={3}>
                  {revenueMix.map((_, index) => (
                    <Cell key={index} fill={['#0EA5E9', '#60A5FA', '#1D4ED8'][index]} />
                  ))}
                </Pie>
                <Tooltip content={<SimpleTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bp-card rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-slate-950">未纳入成本提醒</h3>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {['税费', '营销推广费', '维修保险费', '活动成本', '软件系统费用', '不可预见支出'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ModelSection />
        <CapexSection />
        <PricingSection />
        <BookingSection />
        <CoachingSection />
        <ForecastSection />
        <CashflowSection />
        <ConclusionSection />
        <RevenueMixStrip />
      </main>
      <footer className="border-t border-slate-200 bg-white/70 px-4 py-8 text-center text-sm text-slate-500 md:px-8">
        <p>Evolution Tennis Club / 进界网球俱乐部 · Changzhou, China</p>
      </footer>
    </>
  );
}
