import { BaseError } from "sequelize";

export const wait = (time) => new Promise((res) => setTimeout(res, time));

export const waitUntil = async (time) => {
  const diff = time - Date.now();
  if (diff > 0) await wait(diff);
};

/**
 *
 * @param {Error} err
 * @param {import("express").Response} res
 */
export const handleError = (err, res) => {
  if (err instanceof BaseError) {
    err.errors = err.errors ? err.errors.map((e) => e.message) : [err.message];
  }
  res.status(500).json({ success: false, errors: err.errors });
};
