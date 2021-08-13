module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Peer-to-Peer Delegation Poker',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
};
