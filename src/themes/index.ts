import { extendTheme } from 'native-base';

const theme = extendTheme({
    colors: {
        // Add new color
        blue: {
            100: '#16A6DA',
            200: '#1C6EBA',
            300: '#074582',
            400: '#47A9DA',
            500: '#0088CC',
            600: '#007AB8',
            700: '#006BA1',
            800: '#005885',
            900: '#003F5E',
        },

        red: {
            100: '#FF0000',
        },
        black: {
            100: '#000000',
        },
        gray: {
            100: '#F3F3F3',
            200: '#A6A6A6',
            300: '#4C4C4C',
        },
        white: {
            100: '#FFFFFF',
        },
    },
    fontConfig: {
        Arch: {
            50: {
                normal: 'Archivo-Regular',
            },
            100: {
                normal: 'Archivo-Medium',
            },
            200: {
                normal: 'Archivo-Medium',
            },
            300: {
                normal: 'Archivo-Medium',
            },
            400: {
                normal: 'Archivo-Medium',
            },
            500: {
                normal: 'Archivo-SemiBold',
            },
            600: {
                normal: 'Archivo-SemiBold',
            },
            700: {
                normal: 'Archivo-Bold',
            },
            800: {
                normal: 'Archivo-Bold',
            },
            900: {
                normal: 'Archivo-Bold',
            },
        },
        Lato: {
            100: {
                normal: 'Lato-Light',
            },
            200: {
                normal: 'Lato-Light',
            },
            300: {
                normal: 'Lato-Light',
            },
            400: {
                normal: 'Lato-Regular',
            },
            500: {
                normal: 'Lato-Regular',
            },
            600: {
                normal: 'Lato-Regular',
            },
            700: {
                normal: 'Lato-Bold',
            },
            800: {
                normal: 'Lato-Bold',
            },
            900: {
                normal: 'Lato-Bold',
            },
        },
    },
    components: {
        Button: {
            variants: {
                basicButton: ({ colorScheme }: any) => {
                    return {
                        _pressed: { opacity: 50 },
                        bg: `${colorScheme}`,
                        rounded: 'full',
                        height: '56px',
                        maxW: '450px',
                        width: '100%',
                    };
                },
                dButton: ({ colorScheme }: any) => {
                    return {
                        _pressed: { opacity: 50 },
                        bg: `${colorScheme}`,
                        rounded: 'full',
                        height: '56px',
                        maxW: '450px',
                        width: '100%',
                        _disabled: {
                            bg: 'gray.200',
                        },
                    };
                },
                shadowBasic: ({ colorScheme }: any) => {
                    return {
                        _pressed: { opacity: 50 },
                        bg: `${colorScheme}`,
                        rounded: 'full',
                        height: '56px',
                        maxW: '450px',
                        width: '100%',
                        shadow: 6,
                        _disabled: {
                            bg: 'gray.200',
                        },
                    };
                },
            },
        },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        Arch: 'Arch',
        Lato: 'Lato',
        mono: 'Roboto',
    },
    // config: {
    //   // Changing initialColorMode to 'dark'
    //   initialColorMode: 'dark',
    // },
});

export default theme;
