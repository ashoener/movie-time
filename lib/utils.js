export const wait = (time) => new Promise((res) => setTimeout(res, time));
export const waitUntil = async (time) => {
  const diff = time - Date.now();
  if (diff > 0) await wait(diff);
};
