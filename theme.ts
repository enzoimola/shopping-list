import { createTheme } from '@mantine/core';
import { colors } from '@/utils/colors';

export const theme = createTheme({
    colors: {
        blueColor: [colors.blueColor],
    },
    primaryColor: 'blueColor',

});

// Inyectar variables CSS globales
export const injectCssVariables = () => {
    const root = document.documentElement;
    Object.keys(colors).forEach(key => {
        root.style.setProperty(`--${key}`, colors[key]);
    });
};
