export class Util {
    static lowerCase(str: string): string {
        return str.toLowerCase()
    }
    static randomInt(length: number): number {
        const chars = '0123456789'
        let res = ' '
        const charslength = chars.length
        for (let i = 0; i < length; i++) {
            res += chars.charAt(Math.floor(Math.random() * charslength))
        }
        return parseInt(res, 10)
    }
    static firstLetterUppercase(str: string): string {
        const valueString = str.toLowerCase();
        return valueString
            .split(' ')
            .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
            .join(' ');
    }
    // static escapeRegex(text: string): string {
    //     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    // }
}