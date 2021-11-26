export async function fetchThemeFolderConfigFile(): Promise<any> {
    try {
        if (!window) {
            return null;
        }
        const response = await window.fetch(`${window.mx.remoteUrl}com.mendix.charts.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        return null;
    }
}
