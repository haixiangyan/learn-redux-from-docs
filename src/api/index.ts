const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch(url: string, fn: Function) {
  await timeout(3000);
  return fn();
}

export default fetch
