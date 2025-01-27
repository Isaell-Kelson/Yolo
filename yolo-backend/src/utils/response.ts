export const success = (data: unknown, statusCode = 200) => ({
    statusCode,
    body: JSON.stringify(data),
});

export const error = (message: string, statusCode = 500) => ({
    statusCode,
    body: JSON.stringify({ error: message }),
});
