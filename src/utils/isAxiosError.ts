function isAxiosError(error: unknown): error is { response: { data: { detail?: { msg: string }[]; message?: string } } } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response === 'object' &&
        (error as any).response !== null &&
        'data' in (error as any).response &&
        typeof (error as any).response.data === 'object' &&
        (error as any).response.data !== null &&
        (('detail' in (error as any).response.data && Array.isArray((error as any).response.data.detail)) ||
            'message' in (error as any).response.data)
    );
}



export { isAxiosError }