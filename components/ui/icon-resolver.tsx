import React from "react";
import {
  ShieldCheck,
  Settings,
  TrendingUp,
  Handshake,
  Leaf,
  MapPin,
  Mountain,
  Users,
  Target,
  Search,
  Compass,
  BarChart3,
  Hammer,
  Cog,
  Award,
  Truck,
  HardHat,
  HeartPulse,
  Globe,
  Building2,
  Cpu,
  Wrench,
  Factory,
  Map,
  Lightbulb,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Layers,
  Activity,
  Flame,
  Scale,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  // Common Values & Principles
  shieldcheck: ShieldCheck,
  shield: ShieldCheck,
  settings: Settings,
  gear: Settings,
  trendingup: TrendingUp,
  trend: TrendingUp,
  handshake: Handshake,
  partner: Handshake,
  leaf: Leaf,
  sustainability: Leaf,
  heartpulse: HeartPulse,
  heart: HeartPulse,
  activity: Activity,

  // Differentiators & Strategy
  mappin: MapPin,
  location: MapPin,
  mountain: Mountain,
  mining: Mountain,
  users: Users,
  team: Users,
  target: Target,
  goal: Target,
  search: Search,
  compass: Compass,
  barchart3: BarChart3,
  barchart: BarChart3,
  chart: BarChart3,
  hammer: Hammer,
  cog: Cog,
  award: Award,
  truck: Truck,
  hardhat: HardHat,
  safety: HardHat,
  globe: Globe,
  building2: Building2,
  building: Building2,
  cpu: Cpu,
  wrench: Wrench,
  factory: Factory,
  map: Map,
  lightbulb: Lightbulb,
  checkcircle2: CheckCircle2,
  check: CheckCircle2,
  phone: Phone,
  mail: Mail,
  arrowright: ArrowRight,
  layers: Layers,
  flame: Flame,
  scale: Scale,
};

/**
 * Safe, case-insensitive icon resolver for Lucide icons.
 * Returns the resolved LucideIcon component, or the specified fallback if not found.
 */
export function getLucideIcon(
  iconName?: string | null,
  fallback: LucideIcon = ShieldCheck
): LucideIcon {
  if (!iconName || typeof iconName !== "string") {
    return fallback;
  }

  // Normalize: remove whitespace, dashes, underscores, and lowercase
  const normalized = iconName.toLowerCase().replace(/[\s\-_]/g, "");
  return ICON_MAP[normalized] || fallback;
}

/**
 * Curated list of icon options for Sanity Studio dropdown fields.
 */
export const SANITY_ICON_OPTIONS = [
  // Value / Principle Icons
  { title: "Shield Check (Integrity / Compliance)", value: "ShieldCheck" },
  { title: "Settings / Gear (Technical Excellence / Engineering)", value: "Settings" },
  { title: "Trending Up (Execution / Progress)", value: "TrendingUp" },
  { title: "Handshake (Partnership / Trust)", value: "Handshake" },
  { title: "Leaf (Responsible Development / ESG)", value: "Leaf" },
  { title: "Heart Pulse (Health, Safety & Environment)", value: "HeartPulse" },
  { title: "Hard Hat (Safety / Operations)", value: "HardHat" },

  // Strategy & Differentiator Icons
  { title: "Map Pin (Local Execution / Egypt)", value: "MapPin" },
  { title: "Mountain (Technical Judgment / Geology & Resources)", value: "Mountain" },
  { title: "Users (Partnerships / Integrated Team)", value: "Users" },
  { title: "Target (Production Mindset / Focus)", value: "Target" },
  { title: "Compass (Exploration / Vision)", value: "Compass" },
  { title: "Search / Magnifier (Evaluation / Research)", value: "Search" },
  { title: "Bar Chart (Development / Economics)", value: "BarChart3" },
  { title: "Hammer / Pickaxe (Build / Mining)", value: "Hammer" },
  { title: "Cog / Machinery (Operations / Processing)", value: "Cog" },
  { title: "Award (Production / Quality)", value: "Award" },
  { title: "Truck (Transport / Logistics)", value: "Truck" },
  { title: "Globe (International Reach)", value: "Globe" },
  { title: "Building (Corporate / Infrastructure)", value: "Building2" },
  { title: "Cpu (Technology / Systems)", value: "Cpu" },
  { title: "Wrench (Engineering / Execution)", value: "Wrench" },
  { title: "Factory (Mineral Processing / Facilities)", value: "Factory" },
  { title: "Lightbulb (Innovation / Insight)", value: "Lightbulb" },
  { title: "Scale (Governance / Ethics)", value: "Scale" },
];
