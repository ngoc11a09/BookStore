export class Util {
    static lowerCase(str: string): string {
        return str.toLowerCase()
    }
    static randomInt(length: number): number {
        const chars = '0123456789'
        let res = ' '
        const charslength = chars.length
        for (let i=0; i< charslength; i++) {
            res +=chars.charAt(Math.floor(Math.random()*charslength))
        }
        return parseInt(res,10)
    }
}