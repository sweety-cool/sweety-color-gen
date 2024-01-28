import chroma from "chroma-js";

export default function (hexcode) {
  const closestColorFamily = findClosestColor(hexcode);

  const inputHue = chroma(hexcode).get("hsl.h");
  const matchHue = chroma(closestColorFamily.closestShadeLightness.hexcode).get(
    "hsl.h"
  );

  let hueDifference = inputHue - (matchHue || 0);

  const saturationRatio =
    chroma(hexcode).get("hsl.s") /
    chroma(closestColorFamily.closestShadeLightness.hexcode).get("hsl.s");

  if (hueDifference === 0) hueDifference = matchHue.toString();
  else if (hueDifference > 0) hueDifference = "+" + hueDifference;
  else hueDifference = hueDifference.toString();

  const generatedColorFamily = {};

  generatedColorFamily.shades = closestColorFamily.shades.map((color) => {
    let newColor = color.hexcode;
    let newSaturation = chroma(newColor).get("hsl.s") * saturationRatio;

    newColor = chroma(newColor).set("hsl.s", newSaturation).hex();
    newColor = chroma(newColor).set("hsl.h", hueDifference).hex();

    if (closestColorFamily.closestShadeLightness.number === color.number)
      newColor = chroma(hexcode).hex();

    return {
      number: color.number,
      hexcode: newColor,
      hue: Math.round(chroma(newColor).get("hsl.h")),
      saturation: Math.round(chroma(newColor).get("hsl.s") * 100),
      lightness: Math.round(chroma(newColor).get("hsl.l") * 100),
      luminance: Math.round(chroma(newColor).luminance() * 100)
    };
  });

  return generatedColorFamily;
}

function findClosestColor(hexcode) {
  // Add DELTA key / value to array of objects
  tailwindColors.forEach((color) => {
    color.shades = color.shades.map((shade) => ({
      ...shade,
      delta: chroma.deltaE(hexcode, shade.hexcode)
    }));
  });

  // Calculate the lowest DELTA per color
  tailwindColors.forEach((color) => {
    color.closestShade = color.shades.reduce((previous, current) =>
      previous.delta < current.delta ? previous : current
    );
  });

  // Calculate the color family with the lowest DELTA
  let closestColorFamily = tailwindColors.reduce((previous, current) =>
    previous.closestShade.delta < current.closestShade.delta
      ? previous
      : current
  );

  // Add lightness difference key / value to array of objects
  closestColorFamily.shades = closestColorFamily.shades.map((shade) => ({
    ...shade,
    lightnessDiff: Math.abs(
      chroma(shade.hexcode).get("hsl.l") - chroma(hexcode).get("hsl.l")
    )
  }));

  closestColorFamily.closestShadeLightness = closestColorFamily.shades.reduce(
    (previous, current) =>
      previous.lightnessDiff < current.lightnessDiff ? previous : current
  );

  return closestColorFamily;
}

export const tailwindColors = [
  {
    name: "rose",
    shades: [
      { number: 50, hexcode: "#fff1f2" },
      { number: 100, hexcode: "#ffe4e6" },
      { number: 200, hexcode: "#fecdd3" },
      { number: 300, hexcode: "#fda4af" },
      { number: 400, hexcode: "#fb7185" },
      { number: 500, hexcode: "#f43f5e" },
      { number: 600, hexcode: "#e11d48" },
      { number: 700, hexcode: "#be123c" },
      { number: 800, hexcode: "#9f1239" },
      { number: 900, hexcode: "#881337" }
    ]
  },
  {
    name: "pink",
    shades: [
      { number: 50, hexcode: "#fdf2f8" },
      { number: 100, hexcode: "#fce7f3" },
      { number: 200, hexcode: "#fbcfe8" },
      { number: 300, hexcode: "#f9a8d4" },
      { number: 400, hexcode: "#f472b6" },
      { number: 500, hexcode: "#ec4899" },
      { number: 600, hexcode: "#db2777" },
      { number: 700, hexcode: "#be185d" },
      { number: 800, hexcode: "#9d174d" },
      { number: 900, hexcode: "#831843" }
    ]
  },
  {
    name: "fuchsia",
    shades: [
      { number: 50, hexcode: "#fdf4ff" },
      { number: 100, hexcode: "#fae8ff" },
      { number: 200, hexcode: "#f5d0fe" },
      { number: 300, hexcode: "#f0abfc" },
      { number: 400, hexcode: "#e879f9" },
      { number: 500, hexcode: "#d946ef" },
      { number: 600, hexcode: "#c026d3" },
      { number: 700, hexcode: "#a21caf" },
      { number: 800, hexcode: "#86198f" },
      { number: 900, hexcode: "#701a75" }
    ]
  },
  {
    name: "purple",
    shades: [
      { number: 50, hexcode: "#faf5ff" },
      { number: 100, hexcode: "#f3e8ff" },
      { number: 200, hexcode: "#e9d5ff" },
      { number: 300, hexcode: "#d8b4fe" },
      { number: 400, hexcode: "#c084fc" },
      { number: 500, hexcode: "#a855f7" },
      { number: 600, hexcode: "#9333ea" },
      { number: 700, hexcode: "#7e22ce" },
      { number: 800, hexcode: "#6b21a8" },
      { number: 900, hexcode: "#581c87" }
    ]
  },
  {
    name: "violet",
    shades: [
      { number: 50, hexcode: "#f5f3ff" },
      { number: 100, hexcode: "#ede9fe" },
      { number: 200, hexcode: "#ddd6fe" },
      { number: 300, hexcode: "#c4b5fd" },
      { number: 400, hexcode: "#a78bfa" },
      { number: 500, hexcode: "#8b5cf6" },
      { number: 600, hexcode: "#7c3aed" },
      { number: 700, hexcode: "#6d28d9" },
      { number: 800, hexcode: "#5b21b6" },
      { number: 900, hexcode: "#4c1d95" }
    ]
  },
  {
    name: "indigo",
    shades: [
      { number: 50, hexcode: "#eef2ff" },
      { number: 100, hexcode: "#e0e7ff" },
      { number: 200, hexcode: "#c7d2fe" },
      { number: 300, hexcode: "#a5b4fc" },
      { number: 400, hexcode: "#818cf8" },
      { number: 500, hexcode: "#6366f1" },
      { number: 600, hexcode: "#4f46e5" },
      { number: 700, hexcode: "#4338ca" },
      { number: 800, hexcode: "#3730a3" },
      { number: 900, hexcode: "#312e81" }
    ]
  },
  {
    name: "blue",
    shades: [
      { number: 50, hexcode: "#eff6ff" },
      { number: 100, hexcode: "#dbeafe" },
      { number: 200, hexcode: "#bfdbfe" },
      { number: 300, hexcode: "#93c5fd" },
      { number: 400, hexcode: "#60a5fa" },
      { number: 500, hexcode: "#3b82f6" },
      { number: 600, hexcode: "#2563eb" },
      { number: 700, hexcode: "#1d4ed8" },
      { number: 800, hexcode: "#1e40af" },
      { number: 900, hexcode: "#1e3a8a" }
    ]
  },
  {
    name: "sky",
    shades: [
      { number: 50, hexcode: "#f0f9ff" },
      { number: 100, hexcode: "#e0f2fe" },
      { number: 200, hexcode: "#bae6fd" },
      { number: 300, hexcode: "#7dd3fc" },
      { number: 400, hexcode: "#38bdf8" },
      { number: 500, hexcode: "#0ea5e9" },
      { number: 600, hexcode: "#0284c7" },
      { number: 700, hexcode: "#0369a1" },
      { number: 800, hexcode: "#075985" },
      { number: 900, hexcode: "#0c4a6e" }
    ]
  },
  {
    name: "cyan",
    shades: [
      { number: 50, hexcode: "#ecfeff" },
      { number: 100, hexcode: "#cffafe" },
      { number: 200, hexcode: "#a5f3fc" },
      { number: 300, hexcode: "#67e8f9" },
      { number: 400, hexcode: "#22d3ee" },
      { number: 500, hexcode: "#06b6d4" },
      { number: 600, hexcode: "#0891b2" },
      { number: 700, hexcode: "#0e7490" },
      { number: 800, hexcode: "#155e75" },
      { number: 900, hexcode: "#164e63" }
    ]
  },
  {
    name: "teal",
    shades: [
      { number: 50, hexcode: "#f0fdfa" },
      { number: 100, hexcode: "#ccfbf1" },
      { number: 200, hexcode: "#99f6e4" },
      { number: 300, hexcode: "#5eead4" },
      { number: 400, hexcode: "#2dd4bf" },
      { number: 500, hexcode: "#14b8a6" },
      { number: 600, hexcode: "#0d9488" },
      { number: 700, hexcode: "#0f766e" },
      { number: 800, hexcode: "#115e59" },
      { number: 900, hexcode: "#134e4a" }
    ]
  },
  {
    name: "emerald",
    shades: [
      { number: 50, hexcode: "#ecfdf5" },
      { number: 100, hexcode: "#d1fae5" },
      { number: 200, hexcode: "#a7f3d0" },
      { number: 300, hexcode: "#6ee7b7" },
      { number: 400, hexcode: "#34d399" },
      { number: 500, hexcode: "#10b981" },
      { number: 600, hexcode: "#059669" },
      { number: 700, hexcode: "#047857" },
      { number: 800, hexcode: "#065f46" },
      { number: 900, hexcode: "#064e3b" }
    ]
  },
  {
    name: "green",
    shades: [
      { number: 50, hexcode: "#f0fdf4" },
      { number: 100, hexcode: "#dcfce7" },
      { number: 200, hexcode: "#bbf7d0" },
      { number: 300, hexcode: "#86efac" },
      { number: 400, hexcode: "#4ade80" },
      { number: 500, hexcode: "#22c55e" },
      { number: 600, hexcode: "#16a34a" },
      { number: 700, hexcode: "#15803d" },
      { number: 800, hexcode: "#166534" },
      { number: 900, hexcode: "#14532d" }
    ]
  },
  {
    name: "lime",
    shades: [
      { number: 50, hexcode: "#f7fee7" },
      { number: 100, hexcode: "#ecfccb" },
      { number: 200, hexcode: "#d9f99d" },
      { number: 300, hexcode: "#bef264" },
      { number: 400, hexcode: "#a3e635" },
      { number: 500, hexcode: "#84cc16" },
      { number: 600, hexcode: "#65a30d" },
      { number: 700, hexcode: "#4d7c0f" },
      { number: 800, hexcode: "#3f6212" },
      { number: 900, hexcode: "#365314" }
    ]
  },
  {
    name: "yellow",
    shades: [
      { number: 50, hexcode: "#fefce8" },
      { number: 100, hexcode: "#fef9c3" },
      { number: 200, hexcode: "#fef08a" },
      { number: 300, hexcode: "#fde047" },
      { number: 400, hexcode: "#facc15" },
      { number: 500, hexcode: "#eab308" },
      { number: 600, hexcode: "#ca8a04" },
      { number: 700, hexcode: "#a16207" },
      { number: 800, hexcode: "#854d0e" },
      { number: 900, hexcode: "#713f12" }
    ]
  },
  {
    name: "amber",
    shades: [
      { number: 50, hexcode: "#fffbeb" },
      { number: 100, hexcode: "#fef3c7" },
      { number: 200, hexcode: "#fde68a" },
      { number: 300, hexcode: "#fcd34d" },
      { number: 400, hexcode: "#fbbf24" },
      { number: 500, hexcode: "#f59e0b" },
      { number: 600, hexcode: "#d97706" },
      { number: 700, hexcode: "#b45309" },
      { number: 800, hexcode: "#92400e" },
      { number: 900, hexcode: "#78350f" }
    ]
  },
  {
    name: "orange",
    shades: [
      { number: 50, hexcode: "#fff7ed" },
      { number: 100, hexcode: "#ffedd5" },
      { number: 200, hexcode: "#fed7aa" },
      { number: 300, hexcode: "#fdba74" },
      { number: 400, hexcode: "#fb923c" },
      { number: 500, hexcode: "#f97316" },
      { number: 600, hexcode: "#ea580c" },
      { number: 700, hexcode: "#c2410c" },
      { number: 800, hexcode: "#9a3412" },
      { number: 900, hexcode: "#7c2d12" }
    ]
  },
  {
    name: "red",
    shades: [
      { number: 50, hexcode: "#fef2f2" },
      { number: 100, hexcode: "#fee2e2" },
      { number: 200, hexcode: "#fecaca" },
      { number: 300, hexcode: "#fca5a5" },
      { number: 400, hexcode: "#f87171" },
      { number: 500, hexcode: "#ef4444" },
      { number: 600, hexcode: "#dc2626" },
      { number: 700, hexcode: "#b91c1c" },
      { number: 800, hexcode: "#991b1b" },
      { number: 900, hexcode: "#7f1d1d" }
    ]
  }
];
