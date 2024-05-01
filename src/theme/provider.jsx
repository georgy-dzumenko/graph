import { StyleSheetManager, ThemeProvider } from 'styled-components'

import GlobalStyles from '@theme/globalStyles'
import { theme } from '@theme/theme'

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system'
}

const MainThemeProvider = (props) => {
    const { children } = props

    const shouldForwardProp = (prop) => !['variant'].includes(prop)

    return (
        <ThemeProvider theme={theme}>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <GlobalStyles />
                {children}
            </StyleSheetManager>
        </ThemeProvider>
    )
}

export default MainThemeProvider
