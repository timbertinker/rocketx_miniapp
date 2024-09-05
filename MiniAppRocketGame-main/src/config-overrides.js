module.exports = function override(config, env) {
    // Disable crypto polyfill
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
    };
    return config;
};