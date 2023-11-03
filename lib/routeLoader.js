import { Router } from "express";
import fs from "fs/promises";
import path from "path";

const baseDir = process.cwd();

function parseRoute(basePath, file) {
  let route = path.join(basePath, file).slice(0, -3);
  if (route.endsWith("index")) route = route.slice(0, -5);
  if (route.length > 1 && route.endsWith("/")) route = route.slice(0, -1);
  return route;
}

async function loadRoute(basePath, searchDir, file, parent) {
  const router = (await import(path.join(searchDir, file))).default;
  const route = parseRoute(basePath, file);
  console.log("Loaded route %s", route);
  parent.use(route, router);
  return router;
}

/**
 *
 * @param {string} dir
 * @param {Router} parent
 */
export default async function loadRoutes(dir, parent) {
  const searchDir = path.join(baseDir, dir);
  let basePath = "/" + dir.split("/").slice(1).join("/");
  const files = await fs.readdir(searchDir);
  if (files.includes("index.js")) {
    parent = await loadRoute(basePath, searchDir, "index.js", parent);
    console.log("Parent now %s", basePath);
    files.splice(files.indexOf("index.js"), 1);
    basePath = path.resolve(basePath, "..");
  }
  for (let file of files) {
    const searchFile = path.join(searchDir, file);
    const stat = await fs.stat(searchFile);
    if (stat.isDirectory()) {
      await loadRoutes(path.join(dir, file), parent);
    } else {
      if (file.endsWith(".js")) {
        await loadRoute(basePath, searchDir, file, parent);
      }
    }
  }
}
