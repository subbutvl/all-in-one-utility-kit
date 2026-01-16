
import React from 'react';
import { Tool, Category } from './types';
import { JsonFormatter } from './modules/dev/JsonFormatter';
import { ShadowGenerator } from './modules/dev/ShadowGenerator';
import { GradientGenerator } from './modules/dev/GradientGenerator';
import { FlexboxGenerator } from './modules/dev/FlexboxGenerator';
import { GridGenerator } from './modules/dev/GridGenerator';
import { SubGridGenerator } from './modules/dev/SubGridGenerator';
import { ButtonGenerator } from './modules/dev/ButtonGenerator';
import { CheckboxGenerator } from './modules/dev/CheckboxGenerator';
import { RadioButtonGenerator } from './modules/dev/RadioButtonGenerator';
import { SwitchGenerator } from './modules/dev/SwitchGenerator';
import { FormGenerator } from './modules/dev/FormGenerator';
import { CursorList } from './modules/dev/CursorList';
import { EntitiesList } from './modules/dev/EntitiesList';
import { PatternsGenerator } from './modules/dev/PatternsGenerator';

// Design Tools
import { PaletteGenerator } from './modules/design/PaletteGenerator';
import { ColorRangeGenerator } from './modules/design/ColorRangeGenerator';
import { ColorList } from './modules/design/ColorList';
import { ContrastChecker } from './modules/design/ContrastChecker';
import { VisionSimulator } from './modules/design/VisionSimulator';
import { ColorModeConverter } from './modules/design/ColorModeConverter';
import { ColorMixer } from './modules/design/ColorMixer';
import { PantoneHistory } from './modules/design/PantoneHistory';
import { HtmlColorNames } from './modules/design/HtmlColorNames';
import { ColorFinder } from './modules/design/ColorFinder';
import { ColorExtractor } from './modules/design/ColorExtractor';

import { CaseConverter } from './modules/text/CaseConverter';
import { PasswordGenerator } from './modules/utils/PasswordGenerator';
import { Counter } from './modules/text/Counter';
import { WhitespaceRemover } from './modules/text/WhitespaceRemover';
import { FontPairFinder } from './modules/text/FontPairFinder';
import { StringSplitter } from './modules/text/StringSplitter';
import { LoremIpsum } from './modules/text/LoremIpsum';
import { BionicReading } from './modules/text/BionicReading';
import { HandwritingConverter } from './modules/text/HandwritingConverter';
import { Base64Tool } from './modules/utils/Base64Tool';
import { HtmlEntityTool } from './modules/utils/HtmlEntityTool';
import { UrlTool } from './modules/utils/UrlTool';
import { HashTool } from './modules/utils/HashTool';
import { UuidGenerator } from './modules/utils/UuidGenerator';

// World Clock
import { WorldClock } from './modules/worldclock/WorldClock';

// Calendar Module
import { Calendar } from './modules/calendar/Calendar';

// Social Modules
import { YoutubeThumbnail } from './modules/social/YoutubeThumbnail';
import { YoutubeTitleGen } from './modules/social/YoutubeTitleGen';
import { YoutubeViralStrategy } from './modules/social/YoutubeViralStrategy';
import { InstagramGen } from './modules/social/InstagramGen';
import { TweetGen } from './modules/social/TweetGen';
import { FacebookGen } from './modules/social/FacebookGen';
import { DesignPortfolioGen } from './modules/social/DesignPortfolioGen';

// Unit Converters
import { LengthConverter } from './modules/converters/LengthConverter';
import { WeightConverter } from './modules/converters/WeightConverter';
import { TemperatureConverter } from './modules/converters/TemperatureConverter';
import { AreaConverter } from './modules/converters/AreaConverter';
import { VolumeConverter } from './modules/converters/VolumeConverter';
import { TimeConverter } from './modules/converters/TimeConverter';
import { EnergyConverter } from './modules/converters/EnergyConverter';
import { SpeedConverter } from './modules/converters/SpeedConverter';
import { PressureConverter } from './modules/converters/PressureConverter';
import { PowerConverter } from './modules/converters/PowerConverter';
import { AngleConverter } from './modules/converters/AngleConverter';
import { FuelConverter } from './modules/converters/FuelConverter';
import { DataConverter } from './modules/converters/DataConverter';
import { UnitSystemsInfo } from './modules/converters/UnitSystemsInfo';

// Theme Generators
import { BootstrapThemeBuilder } from './modules/themes/BootstrapThemeBuilder';
import { TailwindThemeBuilder } from './modules/themes/TailwindThemeBuilder';
import { ShadcnThemeBuilder } from './modules/themes/ShadcnThemeBuilder';
import { PrimengThemeBuilder } from './modules/themes/PrimengThemeBuilder';

// Icon Components (minimalist)
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconBox = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const IconLayout = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3"/><rect width="7" height="7" x="14" y="3"/><rect width="7" height="7" x="14" y="14"/><rect width="7" height="7" x="3" y="14"/></svg>;
const IconText = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/></svg>;
const IconTool = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconCursor = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>;
const IconPalette = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.4-.5 1.4-1.2 0-.3-.1-.6-.1-.9.1-.4.4-.8.4-1.2 0-.9-.7-1.6-1.6-1.6-1 0-1.8.8-1.8 1.8 0 .4.1.8.1 1.1 0 .3-.1.5-.5.5-4.6 0-8.3-3.7-8.3-8.2S7.3 4.2 12 4.2c4.1 0 7.3 3 7.3 7.2 0 2.2-1.2 3.8-2.6 3.8-.5 0-1-.3-1-.9 0-.2.1-.4.2-.6.2-.3.5-.8.5-1.4 0-1.6-1.3-3-3-3s-3 1.4-3 3c0 .1 0 .2.1.3.1.5.3 1.1.3 1.6 0 1.3-.9 2.5-2.2 2.5-1.4 0-2.5-1.1-2.5-2.5 0-4.6 4-8.3 9-8.3s9 3.7 9 8.3c0 4.2-3.6 7.6-8 7.6"/></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconSliders = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/></svg>;
const IconHistory = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>;
const IconScale = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>;
const IconSparkles = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;

// Brand Icons
const IconYoutube = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;
const IconInstagram = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const IconTwitter = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const IconFacebook = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;

export const TOOLS: Tool[] = [
  // World Clock
  {
    id: 'world-clock',
    name: 'Global Monitor',
    description: 'Real-time global clock dashboard with analog/digital views and day-night logic.',
    category: 'World Clock',
    icon: <IconClock />,
    component: WorldClock,
  },

  // Calendar
  {
    id: 'global-calendar',
    name: 'Unified Calendar',
    description: 'Yearly view with integrated India/US federal holiday tracking and regional toggles.',
    category: 'Calendar',
    icon: <IconCalendar />,
    component: Calendar,
  },

  // Design Tools
  {
    id: 'color-finder',
    name: 'Image Color Finder',
    description: 'Detect Average, RMS, and Dominant colors from any uploaded image.',
    category: 'Design Tools',
    icon: <IconEye />,
    component: ColorFinder,
  },
  {
    id: 'color-extractor',
    name: 'Palette Extractor',
    description: 'Extract a cohesive 5-color palette from images using cluster analysis.',
    category: 'Design Tools',
    icon: <IconPalette />,
    component: ColorExtractor,
  },
  {
    id: 'palette-gen',
    name: 'Palette Generator',
    description: 'Generate beautiful 5-color palettes with randomization and locking.',
    category: 'Design Tools',
    icon: <IconPalette />,
    component: PaletteGenerator,
  },
  {
    id: 'pantone-history',
    name: 'Pantone History',
    description: 'Archive of Pantone Colors of the Year (1976-2026).',
    category: 'Design Tools',
    icon: <IconHistory />,
    component: PantoneHistory,
  },
  {
    id: 'html-color-names',
    name: 'HTML Color Names',
    description: 'Reference of all 140 W3C standardized CSS color names.',
    category: 'Design Tools',
    icon: <IconPalette />,
    component: HtmlColorNames,
  },
  {
    id: 'color-range',
    name: 'Color Range Generator',
    description: 'Create harmonious color ramps and scales from a base color.',
    category: 'Design Tools',
    icon: <IconSliders />,
    component: ColorRangeGenerator,
  },
  {
    id: 'color-list',
    name: 'Master Color List',
    description: 'A comprehensive searchable reference of named CSS colors.',
    category: 'Design Tools',
    icon: <IconPalette />,
    component: ColorList,
  },
  {
    id: 'contrast-checker',
    name: 'Contrast Checker',
    description: 'WCAG compliance tool for text and background contrast.',
    category: 'Design Tools',
    icon: <IconCheck />,
    component: ContrastChecker,
  },
  {
    id: 'vision-simulator',
    name: 'Vision Simulator',
    description: 'Simulate color vision deficiencies for accessibility testing.',
    category: 'Design Tools',
    icon: <IconEye />,
    component: VisionSimulator,
  },
  {
    id: 'color-converter',
    name: 'Color Mode Converter',
    description: 'Convert between HEX, RGB, HSL, OKLCH and high-gamut modes.',
    category: 'Design Tools',
    icon: <IconSliders />,
    component: ColorModeConverter,
  },
  {
    id: 'color-mixer',
    name: 'Color Mixer',
    description: 'Blend two colors together with precision ratios.',
    category: 'Design Tools',
    icon: <IconPalette />,
    component: ColorMixer,
  },

  // Dev Tools
  {
    id: 'pattern-gen',
    name: 'Pattern Generator',
    description: 'Create geometric CSS background patterns with live blending and geometry controls.',
    category: 'Dev Tools',
    icon: <IconGrid />,
    component: PatternsGenerator,
  },
  {
    id: 'shadow-gen',
    name: 'Shadow Generator',
    description: 'Create multi-layered CSS box-shadows with presets.',
    category: 'Dev Tools',
    icon: <IconBox />,
    component: ShadowGenerator,
  },
  {
    id: 'gradient-gen',
    name: 'Gradient Generator',
    description: 'Advanced linear and radial CSS gradient editor.',
    category: 'Dev Tools',
    icon: <IconCode />,
    component: GradientGenerator,
  },
  {
    id: 'flex-gen',
    name: 'Flexbox Generator',
    description: 'Visual sandbox for CSS Flexbox layouts.',
    category: 'Dev Tools',
    icon: <IconLayout />,
    component: FlexboxGenerator,
  },
  {
    id: 'grid-gen',
    name: 'Grid Generator',
    description: 'Generate complex CSS Grid layouts visually.',
    category: 'Dev Tools',
    icon: <IconGrid />,
    component: GridGenerator,
  },
  {
    id: 'subgrid-gen',
    name: 'SubGrid Generator',
    description: 'Experiment with CSS Grid subgrid properties.',
    category: 'Dev Tools',
    icon: <IconGrid />,
    component: SubGridGenerator,
  },
  {
    id: 'button-gen',
    name: 'Buttons Generator',
    description: 'Custom CSS button designer with hover states.',
    category: 'Dev Tools',
    icon: <IconTool />,
    component: ButtonGenerator,
  },
  {
    id: 'checkbox-gen',
    name: 'Checkbox Generator',
    description: 'Custom CSS checkbox and radio style generator.',
    category: 'Dev Tools',
    icon: <IconCheck />,
    component: CheckboxGenerator,
  },
  {
    id: 'radio-gen',
    name: 'Radiobutton Generator',
    description: 'Stylish CSS-only radio button generator.',
    category: 'Dev Tools',
    icon: <IconCheck />,
    component: RadioButtonGenerator,
  },
  {
    id: 'switch-gen',
    name: 'Input Switch Generator',
    description: 'Create modern toggle switches for your forms.',
    category: 'Dev Tools',
    icon: <IconTool />,
    component: SwitchGenerator,
  },
  {
    id: 'form-gen',
    name: 'Input Form Generator',
    description: 'Generate clean HTML/CSS form layouts.',
    category: 'Dev Tools',
    icon: <IconCode />,
    component: FormGenerator,
  },

  // Text Tools
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between different case styles.',
    category: 'Text Tools',
    icon: <IconText />,
    component: CaseConverter,
  },
  {
    id: 'text-counter',
    name: 'Text Counter',
    description: 'Detailed analysis of characters, words, and sentences.',
    category: 'Text Tools',
    icon: <IconText />,
    component: Counter,
  },
  {
    id: 'whitespace-remover',
    name: 'Whitespace Remover',
    description: 'Clean up unnecessary spaces, tabs, and line breaks.',
    category: 'Text Tools',
    icon: <IconText />,
    component: WhitespaceRemover,
  },
  {
    id: 'font-pair-finder',
    name: 'Font Pair Finder (AI)',
    description: 'Find perfect Google Font pairings (uses Gemini AI).',
    category: 'Text Tools',
    icon: <IconText />,
    component: FontPairFinder,
  },
  {
    id: 'string-splitter',
    name: 'String Splitter',
    description: 'Split strings by custom delimiters and format as lists or arrays.',
    category: 'Text Tools',
    icon: <IconText />,
    component: StringSplitter,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum (AI)',
    description: 'Generate standard (Latin) or thematic placeholder text (AI).',
    category: 'Text Tools',
    icon: <IconText />,
    component: LoremIpsum,
  },
  {
    id: 'bionic-reading',
    name: 'Bionic Reading',
    description: 'Optimize text for faster reading with saccade bolding.',
    category: 'Text Tools',
    icon: <IconText />,
    component: BionicReading,
  },
  {
    id: 'handwriting-converter',
    name: 'Handwriting Converter',
    description: 'Transform digital text into realistic handwritten notes.',
    category: 'Text Tools',
    icon: <IconText />,
    component: HandwritingConverter,
  },

  // Unit Converters
  {
    id: 'conv-length',
    name: 'Length Converter',
    description: 'Convert between metric and imperial length units (mm to Light Years).',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: LengthConverter,
  },
  {
    id: 'conv-weight',
    name: 'Weight & Mass',
    description: 'Convert mass from milligrams to Petagrams and tons.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: WeightConverter,
  },
  {
    id: 'conv-temp',
    name: 'Temperature',
    description: 'Switch between Celsius, Fahrenheit, and Kelvin scales.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: TemperatureConverter,
  },
  {
    id: 'conv-area',
    name: 'Area Converter',
    description: 'Convert square units, hectares, and acres.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: AreaConverter,
  },
  {
    id: 'conv-volume',
    name: 'Volume Converter',
    description: 'Convert solid cubic units and liquid measurements.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: VolumeConverter,
  },
  {
    id: 'conv-time',
    name: 'Time Converter',
    description: 'Precision time unit conversion from nano-seconds to years.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: TimeConverter,
  },
  {
    id: 'conv-energy',
    name: 'Energy Converter',
    description: 'Joules, Calories, BTU, and Watt-hour conversions.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: EnergyConverter,
  },
  {
    id: 'conv-speed',
    name: 'Speed Converter',
    description: 'Km/h, Mph, Knots, and Speed of Light conversions.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: SpeedConverter,
  },
  {
    id: 'conv-pressure',
    name: 'Pressure Converter',
    description: 'Pascal, Bar, PSI, and Atmosphere units.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: PressureConverter,
  },
  {
    id: 'conv-power',
    name: 'Power Converter',
    description: 'Watts, Horsepower, and related power units.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: PowerConverter,
  },
  {
    id: 'conv-angle',
    name: 'Angle Converter',
    description: 'Convert Degrees, Radians, and Gradians.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: AngleConverter,
  },
  {
    id: 'conv-fuel',
    name: 'Fuel Consumption',
    description: 'MPG and Liters per 100km conversions.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: FuelConverter,
  },
  {
    id: 'conv-data',
    name: 'Data Storage',
    description: 'Digital storage units from Bits to Petabytes.',
    category: 'Unit Converters',
    icon: <IconScale />,
    component: DataConverter,
  },
  {
    id: 'conv-systems',
    name: 'Unit Systems Reference',
    description: 'Encyclopedia of Metric and Imperial systems.',
    category: 'Unit Converters',
    icon: <IconHistory />,
    component: UnitSystemsInfo,
  },

  // Theme Generators
  {
    id: 'theme-bootstrap',
    name: 'Bootstrap Builder',
    description: 'Customize Bootstrap theme colors and generate SCSS/CSS variables.',
    category: 'Theme Generator',
    icon: <IconSparkles />,
    component: BootstrapThemeBuilder,
  },
  {
    id: 'theme-tailwind',
    name: 'Tailwind Configurator',
    description: 'Build custom Tailwind color palettes and generate config objects.',
    category: 'Theme Generator',
    icon: <IconSparkles />,
    component: TailwindThemeBuilder,
  },
  {
    id: 'theme-shadcn',
    name: 'ShadCN UI Designer',
    description: 'Visual editor for Radix-based ShadCN CSS variables for light/dark modes.',
    category: 'Theme Generator',
    icon: <IconSparkles />,
    component: ShadcnThemeBuilder,
  },
  {
    id: 'theme-primeng',
    name: 'PrimeNG Builder',
    description: 'Enterprise-grade theme builder for PrimeNG components.',
    category: 'Theme Generator',
    icon: <IconSparkles />,
    component: PrimengThemeBuilder,
  },

  // Utilities
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Pretty print, minify and validate JSON data.',
    category: 'Utilities',
    icon: <IconCode />,
    component: JsonFormatter,
  },
  {
    id: 'cursor-preview',
    name: 'Cursor List Preview',
    description: 'Reference for all available CSS cursor types.',
    category: 'Utilities',
    icon: <IconCursor />,
    component: CursorList,
  },
  {
    id: 'html-entity-tool',
    name: 'HTML Entity Encoder',
    description: 'Encode/Decode individual HTML entities.',
    category: 'Utilities',
    icon: <IconCode />,
    component: HtmlEntityTool,
  },
  {
    id: 'entities-list',
    name: 'Entities List',
    description: 'Searchable database of HTML special characters.',
    category: 'Utilities',
    icon: <IconText />,
    component: EntitiesList,
  },
  {
    id: 'url-percent',
    name: 'URL Percent Coder',
    description: 'URL encode/decode strings safely.',
    category: 'Utilities',
    icon: <IconCode />,
    component: UrlTool,
  },
  {
    id: 'base64-coder',
    name: 'Base 64 Coder',
    description: 'Convert strings to/from Base64 format.',
    category: 'Utilities',
    icon: <IconCode />,
    component: Base64Tool,
  },
  {
    id: 'password-gen',
    name: 'Password Generator',
    description: 'Create secure and random passwords.',
    category: 'Utilities',
    icon: <IconTool />,
    component: PasswordGenerator,
  },
  {
    id: 'md5-hash',
    name: 'MD5 Encrypt',
    description: 'Generate MD5 message-digest algorithm hashes.',
    category: 'Utilities',
    icon: <IconTool />,
    component: () => <HashTool algorithm="MD5" />,
  },
  {
    id: 'sha256-hash',
    name: 'SHA256 Encrypt',
    description: 'Generate standard SHA-256 secure hashes.',
    category: 'Utilities',
    icon: <IconTool />,
    component: () => <HashTool algorithm="SHA-256" />,
  },
  {
    id: 'uuid-gen',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (v1, v4) for development.',
    category: 'Utilities',
    icon: <IconTool />,
    component: UuidGenerator,
  },

  // Social Tools
  {
    id: 'yt-thumbnail',
    name: 'YT Thumbnail Maker',
    description: 'Create high-impact thumbnails (AI or manual).',
    category: 'Social Tools',
    icon: <IconYoutube />,
    component: YoutubeThumbnail,
  },
  {
    id: 'yt-title-gen',
    name: 'YT Title Generator (AI)',
    description: 'Generate high-CTR titles (Gemini AI optimized).',
    category: 'Social Tools',
    icon: <IconYoutube />,
    component: YoutubeTitleGen,
  },
  {
    id: 'yt-viral-kit',
    name: 'Viral Strategy (AI)',
    description: 'Comprehensive AI analysis to make your video go viral.',
    category: 'Social Tools',
    icon: <IconYoutube />,
    component: YoutubeViralStrategy,
  },
  {
    id: 'ig-gen',
    name: 'Instagram Hub (AI)',
    description: 'Generate viral captions and optimized hashtags.',
    category: 'Social Tools',
    icon: <IconInstagram />,
    component: InstagramGen,
  },
  {
    id: 'tweet-gen',
    name: 'Tweet Maker (AI)',
    description: 'Craft engaging tweets and multi-post threads.',
    category: 'Social Tools',
    icon: <IconTwitter />,
    component: TweetGen,
  },
  {
    id: 'fb-gen',
    name: 'Facebook Copy (AI)',
    description: 'Generate persuasive Facebook posts and advertisements.',
    category: 'Social Tools',
    icon: <IconFacebook />,
    component: FacebookGen,
  },
  {
    id: 'portfolio-gen',
    name: 'Portfolio Helper (AI)',
    description: 'Optimize descriptions and tags for Dribbble and Behance.',
    category: 'Social Tools',
    icon: <IconBriefcase />,
    component: DesignPortfolioGen,
  }
];

export const CATEGORIES: Category[] = [
  'Image Tools',
  'Design Tools',
  'Dev Tools',
  'Text Tools',
  'Unit Converters',
  'Theme Generator',
  'Social Tools',
  'Utilities',
  'World Clock',
  'Calendar'
];
