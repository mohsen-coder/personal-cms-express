export const redirectWithMessage = (route: string, messages: string[], status: string) => {
    return `${route}?message=${messages.join(',')}&&status=${status}`;
}