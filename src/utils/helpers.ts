export const average = <T extends number>(arr: T[]): number =>
    arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);
