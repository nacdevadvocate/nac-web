function isAxiosError(error: unknown): error is { response: { data: { detail?: string | { msg: string }[]; message?: string } } } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response === 'object' &&
        'data' in (error as any).response &&
        typeof (error as any).response.data === 'object'
    );
}



export { isAxiosError };
