import { useMemo } from 'react'
import _styled, { createGlobalStyle as _createGlobalStyle, css as _css, keyframes as _keyframes, withTheme } from 'styled-components'
import cssPropsArray from './cssPropsArray'

const getValuesFromTheme = (value, props) => {
    let callbackResult = value

    const { colors, spacing } = props.theme

    if (!value) {
        return false
    }

    switch (typeof value) {
        case 'object':
            value
        case 'function':
            callbackResult = value(props)
    }

    if (colors[callbackResult]) {
        return colors[callbackResult]
    }

    return value
}

const handleThemeVariables = (toInterpolate) => toInterpolate.map((el) => (props) => getValuesFromTheme(el, props))

export const keyframes = (styleArr, ...toInterpolate) => _keyframes(styleArr, ...handleThemeVariables(toInterpolate))

export const css = (styleArr, ...toInterpolate) => _css(styleArr, ...handleThemeVariables(toInterpolate))

export const createGlobalStyle = (styleArr, ...toInterpolate) => _createGlobalStyle(styleArr, ...handleThemeVariables(toInterpolate))

export const size = (value) => {
    return typeof value === 'number' ? `${value}px` : value
}

const skeletonKeyframes = keyframes`
    0%, 10% {
        background-position: 200% 200%;
    }
    90%, 100% {
        background-position: -200% -200%;
    }
`

export const filterCommonParams = (props) => {
    const styleEntries = Object.entries(props).filter((el) => cssPropsArray[el[0]])
    return Object.fromEntries(styleEntries)
}

export const commonPropsCallback = (props, propsArray, theme) => {
    const styleProps = Object.entries(props).filter((el) => cssPropsArray[el[0]])
    let stylesObject = {}

    const fillStylesObject = (array, stylePropsArr) => {
        for (let el of array) {
            const key = el[0].substring(1)
            const styleProcessingCallback = stylePropsArr[el[0]]
            const value = styleProcessingCallback(el[1])

            if (value && typeof value === 'object') {
                const tmpValue = Object.entries(value).reduce((prev, cur) => {
                    const aliasKey = cur[0].substring(1)
                    const styleValueProcessor = cur[1]
                    const processedStyleValue = styleValueProcessor(el[1])

                    return { ...prev, [aliasKey]: getValuesFromTheme(processedStyleValue, { theme }) }
                }, {})

                stylesObject = { ...stylesObject, ...tmpValue }
            } else {
                stylesObject[key] = getValuesFromTheme(value, { theme })
            }
        }
    }

    fillStylesObject(styleProps, propsArray)

    return stylesObject
}

const skeletonCallback = (props) => {
    const { $defaultSkeletonActive, $skeletonProps } = props

    if (!$defaultSkeletonActive) {
        return ''
    }

    const skeletonProps = {
        backgroundColor: ['generalGentleGray', 'generalPebblePebble'],
        highlightColor: ['generalGhostWhite', 'shadesOn'],
        speed: 800,
        ...$skeletonProps
    }

    const propsStyles = css`
        background-image: linear-gradient(
            40deg,
            ${skeletonProps.backgroundColor} 30%,
            ${skeletonProps.highlightColor} 50%,
            ${skeletonProps.backgroundColor} 70%
        );
        background-color: ${skeletonProps.backgroundColor};
        background-repeat: no-repeat;
        background-size: 300%;

        animation-name: ${skeletonKeyframes};
        animation-duration: ${skeletonProps.speed}ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        pointer-events: none;
        color: transparent;

        & * {
            color: transparent;
            display: none;
        }
    `

    return propsStyles
}

// https://mxstbr.blog/2016/11/styled-components-magic-explained/
const styled = (component, styledProps = {}) => {
    return (styleArr, ...toInterpolate) => {
        const { themeKey } = styledProps

        const variantCallback = (props) => {
            const { variant, theme } = props
            const { textVariants, buttonVariants, cardVariants, textInput, textArea } = theme

            const tmp = {
                textVariants,
                buttonVariants,
                cardVariants,
                textInput,
                textArea
            }

            return tmp?.[themeKey]?.[variant] || ''
        }

        const callbackList = [variantCallback, ...handleThemeVariables(toInterpolate), skeletonCallback]
        const stylesArr = ['', ...styleArr, '']

        const Component = _styled(component)(stylesArr, ...callbackList)

        return withTheme((props) => {
            const { theme, ...data } = props
            const commonProps = useMemo(() => commonPropsCallback(data, cssPropsArray, theme), [theme, data])

            return <Component {...data} theme={theme} style={{ ...data?.style, ...commonProps }} />
        })
    }
}

export default styled
