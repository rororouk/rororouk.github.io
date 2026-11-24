/**
 * Single source of truth for the image assets that are embedded into the source code.
 * Used by generate-asset-modules.cjs and restore-assets.cjs.
 *
 * `slot` is used when one logical asset has two variants (animated GIF + static frame).
 */
const GROUPS = [
  {
    module: "src/assets/posters.ts",
    exportName: "POSTER_IMAGES",
    dir: "public/images/posters",
    files: [
      { key: "fuel", file: "fuel.jpg" },
      { key: "heating", file: "heating.jpg" },
      { key: "compound", file: "compound.jpg" },
      { key: "salary", file: "salary.jpg" },
    ],
  },
  {
    module: "src/assets/articleImages.ts",
    exportName: "ARTICLE_IMAGES",
    dir: "public/images/articles",
    files: [
      { key: "fuelBanner", file: "fuel-banner.jpg" },
      { key: "fuelTire", file: "fuel-tire.jpg" },
      { key: "fuelRoad", file: "fuel-road.jpg" },
      { key: "heatingInsulation", file: "heating-insulation.jpg" },
      { key: "heatingThermostat", file: "heating-thermostat.jpg" },
      { key: "compoundJar", file: "compound-jar.jpg" },
      { key: "compoundChart", file: "compound-chart.jpg" },
      { key: "salaryDesk", file: "salary-desk.jpg" },
      { key: "salaryAnalysis", file: "salary-analysis.jpg" },
    ],
  },
  {
    module: "src/assets/gifs.ts",
    exportName: "CALCULATOR_GIFS",
    dir: "public/images/gifs",
    nested: true,
    files: [
      { key: "fuel", slot: "animated", file: "fuel.gif" },
      { key: "fuel", slot: "still", file: "fuel-still.png" },
      { key: "heating", slot: "animated", file: "heating.gif" },
      { key: "heating", slot: "still", file: "heating-still.png" },
      { key: "compoundInterest", slot: "animated", file: "compound-interest.gif" },
      { key: "compoundInterest", slot: "still", file: "compound-interest-still.png" },
      { key: "salary", slot: "animated", file: "salary.gif" },
      { key: "salary", slot: "still", file: "salary-still.png" },
    ],
  },
  {
    module: "src/assets/resourcePreviews.ts",
    exportName: "RESOURCE_PREVIEWS",
    dir: "public/images/resources",
    files: [
      { key: "talan", file: "talan.png" },
      { key: "harazd", file: "harazd.png" },
      { key: "fincult", file: "fincult.png" },
      { key: "prometheus", file: "prometheus.png" },
      { key: "diiaOsvita", file: "diia-osvita.png" },
    ],
  },
  {
    module: "src/assets/authorImages.ts",
    exportName: "AUTHOR_IMAGES",
    dir: "public/images",
    files: [
      { key: "photo", file: "author-photo.jpg" },
      { key: "background", file: "author-bg.jpg" },
    ],
  },
];

const MIME_BY_EXTENSION = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
};

module.exports = { GROUPS, MIME_BY_EXTENSION };
