import { css } from '@theme/styled'

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export const objToCss = (data) => {
    const arrayOfKeyValue = Object.entries(data)

    const result = arrayOfKeyValue.reduce(
        (prev, cur) => {
            return {
                string: [
                    ...prev.string,
                    `;
                ${camelToSnakeCase(cur[0])}: `
                ],
                toInterpolate: [...prev.toInterpolate, cur[1]]
            }
        },
        { string: [], toInterpolate: [] }
    )

    return css(result.string, ...result.toInterpolate)
}
