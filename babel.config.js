module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                moduleName: 'react-native-dotenv',
                path: '.env',
                blocklist: null,
                allowlist: [
                    'API_URL',
                    'CLIENT_ID',
                    'LOGIN_URL',
                    'TOKEN_URL',
                    'VIEW_ANNOUNCEMENTS',
                ],
                typeRoots: ['./src/config'],
                safe: false,
                allowUndefined: true,
            },
        ],
    ],
};