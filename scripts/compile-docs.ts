import { compileComponents } from "./utils/docs/compileComponents.ts";

async function run() {
  await compileComponents({
    componentNames: ["AutoSizer.tsx"],
    outputDirName: "js-docs"
  });
}

run();
