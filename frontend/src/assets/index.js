/**
 * Optional image assets (exported from Figma).
 *
 * Drop the exported files into the matching folder and name each file after the slug it belongs to:
 *
 *   assets/foods/<food-id>.png          dish photo, e.g. greek-salad.png (transparent PNG or WebP)
 *   assets/categories/<category-id>.svg category icon, e.g. burger.svg
 *   assets/banners/<banner-id>.png      offer banner picture, e.g. chicken-burger.png
 *   assets/avatars/<name>.jpg           user photo, e.g. default.jpg
 *
 * Components look an asset up by its slug. When the file does not exist yet they render a
 * placeholder, so the app works (and keeps its layout) before any asset is added.
 * The full list of slugs and recommended sizes is in docs/DESIGN_SYSTEM.md.
 */
// Turns a webpack context into { 'file-name-without-extension': url }.
// NOTE: webpack needs the require.context() arguments to be literals, so the file pattern is repeated below.
const collect = (context) => {
  const assets = {};
  context.keys().forEach((key) => {
    const slug = key.replace(/^\.\//, '').replace(/\.[^.]+$/, '');
    const asset = context(key);
    assets[slug] = typeof asset === 'string' ? asset : asset.default;
  });
  return assets;
};

export const foodImages = collect(require.context('./foods', false, /\.(png|jpe?g|webp|avif|svg)$/i));
export const categoryIcons = collect(require.context('./categories', false, /\.(png|jpe?g|webp|avif|svg)$/i));
export const bannerImages = collect(require.context('./banners', false, /\.(png|jpe?g|webp|avif|svg)$/i));
export const avatarImages = collect(require.context('./avatars', false, /\.(png|jpe?g|webp|avif|svg)$/i));
