export const truuncateAddress = (address: string) => {
    if(!address) return;
    return address.slice(0,5) + "..." + address.slice(address.length - 4, address.length)
}