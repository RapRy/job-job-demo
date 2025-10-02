export function convertBoolToPresentText(isPresent: boolean): string{

    if(isPresent) return "Present"

    return ""
}

export function hypenizedLowerCased(value: any): string{
    return String(value).toLowerCase().replaceAll(" ", "-")
}