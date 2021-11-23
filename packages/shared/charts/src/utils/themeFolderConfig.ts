export async function fetchThemeFolderConfigFile(): Promise<any> {
    try {
        const response = await window.fetch(`${window.mx.remoteUrl}com.mendix.charts.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        return null;
    }
}
