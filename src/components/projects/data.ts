// ── Shared Data ──────────────────────────────────────────────────

export interface SkillCategory {
  title: string;
  skills: string[];
}

// Each project has a `palette` that controls its background and text colors.
// "light" = light accent tinted background → dark text
// "dark"  = deep/dark accent background → light/white text
// "neutral-light" = near-white clean background → dark text
// "neutral-dark"  = near-black dark background  → white text
export type ProjectPalette =
  | "accent-light"
  | "accent-dark"
  | "neutral-light"
  | "neutral-dark";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  palette: ProjectPalette;
}

// Palette definitions: bg + text colors for each theme
export const PALETTES: Record<
  ProjectPalette,
  {
    bg: string; // background color class / inline style
    textPrimary: string;
    textSecondary: string;
    tagBg: string;
    tagBorder: string;
    tagText: string;
    border: string;
    accentText: string;
  }
> = {
  // Light accent — green (#22c55e) tinted light background, dark text
  "accent-light": {
    bg: "#dcfce7", // very light green tint
    textPrimary: "#09090b",
    textSecondary: "#166534",
    tagBg: "#ffffff",
    tagBorder: "rgba(34,197,94,0.3)",
    tagText: "#166534",
    border: "rgba(34,197,94,0.2)",
    accentText: "#16a34a",
  },
  // Dark accent — saturated deep green background, white text
  "accent-dark": {
    bg: "#14532d", // deep green
    textPrimary: "#ffffff",
    textSecondary: "#86efac",
    tagBg: "rgba(255,255,255,0.1)",
    tagBorder: "rgba(255,255,255,0.15)",
    tagText: "#bbf7d0",
    border: "rgba(255,255,255,0.1)",
    accentText: "#4ade80",
  },
  // Neutral light — very close to `--bg-primary` (#ffffff), dark text
  "neutral-light": {
    bg: "#f4f4f5",
    textPrimary: "#09090b",
    textSecondary: "#52525b",
    tagBg: "#ffffff",
    tagBorder: "rgba(0,0,0,0.1)",
    tagText: "#52525b",
    border: "rgba(0,0,0,0.08)",
    accentText: "#22c55e",
  },
  // Neutral dark — close to `--bg-primary` dark (#080808), white text
  "neutral-dark": {
    bg: "#09090b",
    textPrimary: "#fafafa",
    textSecondary: "#a3a3a3",
    tagBg: "#1a1a1a",
    tagBorder: "rgba(255,255,255,0.08)",
    tagText: "#a3a3a3",
    border: "rgba(255,255,255,0.08)",
    accentText: "#22c55e",
  },
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP Animations",
    ],
  },
  {
    title: "Backend & Mobile",
    skills: [
      "Node.js",
      "Express",
      "Flutter / Dart",
      "REST APIs",
      "Supabase",
      "MySQL",
    ],
  },
  {
    title: "Tools & Platform",
    skills: [
      "Git & GitHub",
      "Vercel",
      "Figma",
      "Postman",
      "Python (AI/ML)",
      "Android Studio",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Prediksi Melanoma",
    description:
      "Aplikasi web berbasis AI untuk mendeteksi dan memprediksi penyakit melanoma pada kulit menggunakan deep learning dan Computer Vision.",
    tags: ["React", "Python", "AI/ML", "Vercel"],
    link: "https://prediksi-melanoma.vercel.app",
    github: "https://github.com/luthfiadilal/Prediksi-Melanoma",
    palette: "neutral-light",
  },
  {
    title: "Aksara Sunda App",
    description:
      "Aplikasi mobile Flutter untuk belajar dan mengenali aksara Sunda menggunakan machine learning. Repo dengan ★10 bintang.",
    tags: ["Flutter", "Dart", "ML Kit", "Android"],
    link: "#",
    github: "https://github.com/luthfiadilal/aksara-sunda-app",
    palette: "accent-dark",
  },
  {
    title: "CBT Exam System",
    description:
      "Sistem ujian yan menggunakan Sistem Pendukung Keputusan (SPK) dengan metode (SAW) dengan fitur soal, timer, hasil, dan manajemen peserta ujian.",
    tags: ["React", "Node.js", "Express", "Supabase"],
    link: "https://cbt-ruddy.vercel.app",
    github: "https://github.com/luthfiadilal/front-end-CBT",
    palette: "accent-light",
  },
  {
    title: "GIS Disaster App",
    description:
      "Aplikasi mobile Flutter untuk pelaporan dan pemetaan bencana alam berbasis GIS, termasuk visualisasi lokasi bencana secara real-time.",
    tags: ["Flutter", "Dart", "GIS", "Maps API"],
    link: "#",
    github: "https://github.com/luthfiadilal/app-disaster",
    palette: "accent-dark",
  },
];
