const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@resources': path.resolve(__dirname, 'src/resources'),
            '@images': path.resolve(__dirname, 'src/resources/images'),
            '@strings': path.resolve(__dirname, 'src/resources/strings'),
            '@data-access': path.resolve(__dirname, 'src/data-access'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@redux-store': path.resolve(__dirname, 'src/redux-store'),
            '@actions': path.resolve(__dirname, 'src/redux-store/actions'),
            '@user': path.resolve(__dirname, 'src/sites/user'),
            '@manager': path.resolve(__dirname, 'src/sites/manager'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    };

    return config;
};