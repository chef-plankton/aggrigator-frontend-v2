export const wait = (ttl) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("");
    }, ttl)
  );
