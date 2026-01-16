
import React from 'react';

export const UnitSystemsInfo: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto pr-2 pb-10 scroll-smooth">
      <div className="max-w-4xl mx-auto space-y-12 pt-4">
        
        <header className="border-b border-neutral-800 pb-8">
           <h2 className="text-2xl font-light text-white mb-2">Common Unit Systems</h2>
           <p className="text-neutral-500 text-sm leading-relaxed">Understanding the mathematical foundations of global measurement standards.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#111] border border-neutral-800 p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-blue-500"></div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Metric System (SI)</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed italic mb-6">International System of Units. Based on powers of 10.</p>
            <ul className="space-y-4">
              <InfoItem label="Base Length" val="Meter (m)" />
              <InfoItem label="Base Mass" val="Kilogram (kg)" />
              <InfoItem label="Base Temperature" val="Kelvin (K) / Celsius (°C)" />
              <InfoItem label="Logic" val="Decimal based. Prefixes (kilo, mega, milli) define scale." />
              <InfoItem label="Global Usage" val="Adopted by nearly every country worldwide." />
            </ul>
          </div>

          <div className="bg-[#111] border border-neutral-800 p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-500"></div>
              <h3 className="text-lg font-bold uppercase tracking-widest text-white">Imperial System</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed italic mb-6">Derived from historical English units.</p>
            <ul className="space-y-4">
              <InfoItem label="Base Length" val="Inch, Foot, Yard, Mile" />
              <InfoItem label="Base Mass" val="Ounce, Pound, Stone, Ton" />
              <InfoItem label="Base Temperature" val="Fahrenheit (°F)" />
              <InfoItem label="Logic" val="Irregular subdivisions (12 in = 1 ft, 3 ft = 1 yd)." />
              <InfoItem label="Global Usage" val="Primarily used in USA, Liberia, and Myanmar." />
            </ul>
          </div>
        </section>

        <section className="bg-neutral-900 border border-neutral-800 p-10">
           <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 mb-6">Metric Prefixes Table</h4>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PrefixItem p="Tera-" m="10¹²" />
              <PrefixItem p="Giga-" m="10⁹" />
              <PrefixItem p="Mega-" m="10⁶" />
              <PrefixItem p="Kilo-" m="10³" />
              <PrefixItem p="Hecto-" m="10²" />
              <PrefixItem p="Centi-" m="10⁻²" />
              <PrefixItem p="Milli-" m="10⁻³" />
              <PrefixItem p="Micro-" m="10⁻⁶" />
              <PrefixItem p="Nano-" m="10⁻⁹" />
              <PrefixItem p="Pico-" m="10⁻¹²" />
           </div>
        </section>

        <footer className="text-center py-10 opacity-30">
          <p className="text-[10px] uppercase tracking-widest font-bold">Standardized Reference Material • Swiss Knife Utility Kit</p>
        </footer>
      </div>
    </div>
  );
};

const InfoItem = ({ label, val }: { label: string; val: string }) => (
  <li className="flex flex-col border-b border-neutral-900 pb-2 last:border-0">
    <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-tighter">{label}</span>
    <span className="text-sm text-neutral-300">{val}</span>
  </li>
);

const PrefixItem = ({ p, m }: { p: string; m: string }) => (
  <div className="p-3 border border-neutral-800 bg-black/40">
    <div className="text-sm font-bold text-white">{p}</div>
    <div className="text-[10px] font-mono text-neutral-600">{m}</div>
  </div>
);
