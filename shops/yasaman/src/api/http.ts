export const getJSON = async (path: string): Promise<unknown> => {
    const response: Response = await fetch('../../api/' + path);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data: unknown = await response.json();
    return data;
};
