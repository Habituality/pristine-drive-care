// prerender.cjs — runs after `vite build` to generate static HTML for each public route.
// Usage: node prerender.cjs  (called automatically by `npm run build`)
// Requires: @prerenderer/prerenderer, @prerenderer/renderer-puppeteer (devDependencies)

const path = require("path");
const fs = require("fs");
const Prerenderer = require("@prerenderer/prerenderer");
const PuppeteerRenderer = require("@prerenderer/renderer-puppeteer");

const ROUTES = ["/", "/tjanster-fordelar", "/galleri"];
const DIST = path.join(__dirname, "dist");

async function main() {
  const prerenderer = new Prerenderer({
    staticDir: DIST,
    renderer: new PuppeteerRenderer({
      // Wait 2.5 s for React to finish mounting — plenty for this 3-page site
      renderAfterTime: 2500,
      // Required for Vercel/CI environments where Chrome sandbox is blocked
      puppeteerOptions: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      },
    }),
  });

  try {
    await prerenderer.initialize();
    console.log("⏳ Prerendering routes:", ROUTES.join(", "));

    const rendered = await prerenderer.renderRoutes(ROUTES);

    rendered.forEach(({ route, html }) => {
      // Build the output path: / → dist/index.html, /galleri → dist/galleri/index.html
      const outDir = route === "/" ? DIST : path.join(DIST, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html.trim());
      console.log(`✅ Prerendered ${route}`);
    });
  } finally {
    await prerenderer.destroy();
  }
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
