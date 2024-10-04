import automotiveWorkshopApi from '../../api/baseApi.ts';


export const useReportsStore = () => {

    const handleDownloadReport = async (path: string, title: string) => {
        const response = await automotiveWorkshopApi.get(`reports/${path}`, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', title);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    return {
        handleDownloadReport
    };
}
