const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch(url: string, fn: Function) {
  await timeout(1500);
  return fn();
}

export default fetch
