import { Router } from "express";
import fs from "fs/promises";
import path from "path/posix";
import url from "url";

const baseDir = process.cwd();

/**
 * Returns the route of a file
 * @param {string} basePath
 * @param {string} file
 * @returns {string}
 */
function parseRoute(basePath, file) {
  let route = path.join(basePath, file).slice(0, -3); // Remove .js
  if (route.endsWith("index")) route = route.slice(0, -5); // Remove index
  if (route.length > 1 && route.endsWith("/")) route = route.slice(0, -1); // Remove trailing slash
  return route;
}

/**
 * Loads a route
 * @param {string} basePath
 * @param {string} searchDir
 * @param {string} file
 * @param {Router} parent
 * @returns {Router}
 */
async function loadRoute(basePath, searchDir, file, parent) {
  const router = (
    await import(url.pathToFileURL(path.join(searchDir, file)).href)
  ).default;
  const route = parseRoute(basePath, file);
  console.log(
    "Loaded route %s",
    parent.basePath ? path.join(parent.basePath, route) : route
  );
  parent.use(route, router);
  return router;
}

/**
 * Loads routes from a directory
 * @param {string} dir
 * @param {Router} parent
 */
export default async function loadRoutes(dir, parent, newParent = false) {
  const searchDir = path.join(baseDir, dir); // Absolute path
  let basePath = "/" + dir.split("/").slice(1).join("/"); // Relative path
  if (newParent) basePath = basePath.replace(parent.basePath, "/"); // Remove parent's basePath
  const files = await fs.readdir(searchDir); // Files in directory
  if (files.includes("index.js")) {
    parent = await loadRoute(basePath, searchDir, "index.js", parent); // Load index.js
    parent.basePath = basePath; // Set basePath
    console.log("Parent now %s", basePath);
    files.splice(files.indexOf("index.js"), 1);
    basePath = basePath.replace(parent.basePath, "/"); // Remove parent's basePath
  }
  for (let file of files) {
    const searchFile = path.join(searchDir, file); // Absolute path
    const stat = await fs.stat(searchFile);
    if (stat.isDirectory()) {
      await loadRoutes(path.join(dir, file), parent, !!parent.basePath); // Load directory
    } else {
      if (file.endsWith(".js")) {
        await loadRoute(basePath, searchDir, file, parent); // Load file
      }
    }
  }
}
