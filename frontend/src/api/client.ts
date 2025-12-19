
import mockProperties from '../data/mockProperties';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProperties = async () => {
  await delay(400); // mimic network
  return mockProperties;
};

export const getProperty = async (id: string) => {
  await delay(300);
  return mockProperties.find((p) => p.id === id) || null;
};
