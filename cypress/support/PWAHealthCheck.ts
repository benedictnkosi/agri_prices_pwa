import axios from 'axios';

const host = `${process.env.HOST}/`;
console.log(`Checking URL: ${host}`);

async function waitForAppToShutdown(url: string, attempts: number, delay: number): Promise<void> {
  for (let i = 1; i <= attempts; i++) {
    try {
      const response = await axios.get(url);
      if (response.status === 503) {
        console.log('Server is down');
        return;
      } else {
        console.log(`Attempt ${i}: server is still up (status code: ${response.status})`);
      }
    } catch (_error) {
      console.log(`Attempt ${i}: Server is down - Unable to resolve DNS for ${url}`);
      return;
    }

    if (i < attempts) {
      await new Promise(resolve => setTimeout(resolve, delay));
    } else {
      console.log(`Failed to shutdown server after ${attempts} attempts`);
      process.exit(1);
    }
  }
}

const checkHealth = async (url: string, attempts: number, delay: number) => {
  for (let i = 1; i <= attempts; i++) {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log('API is healthy');
        return;
      } else {
        console.log(`Attempt ${i}: API is not healthy (status code: ${response.status})`);
      }
    } catch (_error) {
      console.log(`Attempt ${i}: API is not healthy - Unable to resolve DNS for ${url}`);
    }

    if (i < attempts) {
      await new Promise(resolve => setTimeout(resolve, delay));
    } else {
      console.log(`Failed to reach API after ${attempts} attempts`);
      process.exit(1);
    }
  }
};

async function runHealthCheckAfterShutdown() {
  await waitForAppToShutdown(host, 120, 5000);
  await checkHealth(host, 120, 5000);
  //check sit api is up
  await checkHealth('https://func-ticketing-sit-euw-000.azurewebsites.net/api/products', 120, 5000);
}

if (host.includes('sit')) {
  runHealthCheckAfterShutdown().catch(error => {
    console.error('An unexpected error occurred during shutdown:', error);
    process.exit(1);
  });
} else {
  checkHealth(host, 120, 5000).catch(error => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
  });
}