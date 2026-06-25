// Ambient declaration for CSS side-effect imports (e.g. "@mantine/core/styles.css").
// Next.js handles these at build time; this keeps the standalone type-checker happy.
declare module "*.css";
