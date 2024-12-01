const isProduction = process.env.NODE_ENV === 'production';

const XLog = {
    info: (...args) => {
        if (!isProduction) {
            console.log('[INFO]', ...args);
        }
    },
    warn: (...args) => {
        if (!isProduction) {
            console.warn('[WARN]', ...args);
        }
    },
    error: (...args) => {
        console.error('[ERROR]', ...args);
    },
};

export default XLog;