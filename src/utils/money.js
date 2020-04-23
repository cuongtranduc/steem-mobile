export const sbdToDollar = (money) => {
    return `$${Number(money.replace(" SBD", "")).toFixed(2)}`
}