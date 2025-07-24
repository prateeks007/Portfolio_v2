const tailwind = require('@tailwindcss/postcss');

// postcss.config.js
// ✅ NEW (correct for Tailwind v4+)
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),
  ],
};
