import http from "../http-common";

export const exportToCSV = (data, fileName) => {
    http.post('/exportcsv', data, {
        responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    })
    .catch((error) => {
        console.error("Error exporting CSV:", error);
    });
};


export const importFromCSV = async (csvFile, modelName, refreshData) => {
    const formData = new FormData();
    formData.append('modelName', modelName);
    formData.append('file', csvFile);

    const response = await http.post('/importcsv', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (refreshData) {
        refreshData();
    }
    return response;
};