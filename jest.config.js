// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
        preset: 'ts-jest',
      verbose: true,
      roots:["src/test/unit"]
    };
  };