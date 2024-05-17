import { API_ADMIN, API_URL, API_WEB } from '../utils/constants';
import { useState } from 'react';

import axios from '../lib/axios';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import toast from 'react-hot-toast';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Fileponds({ source, filePath, imageToken, className, inTime = false }) {
    const [files, setFiles] = useState([])

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const handleFileUpload = async (file, metadata, load, error, progress, abort, options) => {
        try {
            await csrf();

            // Create a FormData object
            const formData = new FormData();
            formData.append(options.name, file, file.name);

            const response = await axios.post(`${API_WEB}/filepond`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const progressPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    progress(progressPercent);
                }
            });


            load(response.data);
            inTime && imageToken(response.data);
        } catch (err) {
            // Call the error method if there's an error
            toast.error("حث خطأ اثناء رفع الملف الرجاء محاوله مره اخري");
        }
    };

    const handleProcessFile = (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        handleFileUpload(file, metadata, load, error, progress, abort, options);
    };

    const handleRevertFile = async (uniqueFileId, load) => {
        try {
            // Fetch CSRF token
            await csrf();

            await axios.delete(`${API_ADMIN}/filepond`, { data: uniqueFileId });

            load();
        } catch (err) {
            // Handle error if file revert fails
            console.error('Failed to revert file:', err);
        }
    };


    const handleLoadFile = async (source, load, error, progress) => {
        try {
            // Fetch CSRF token
            await csrf();

            const fileData = await fetchFileData(source);

            const blob = new Blob([fileData], { type: 'image/jpeg/jpg' });

            // Call the load method with the Blob object
            load(blob);

            // Call the progress method to update the progress to 100%
            progress(true, 100, 100);
        } catch (err) {
            console.error('Failed to load file:', err);
        }
    };

    async function fetchFileData(source) {
        await csrf();
        const response = await axios.get(`/filepond/load/${source}`, {
            headers: {
                'file-path': filePath,
            }
        });
        return response.data;
    }

    !inTime && imageToken(files[0]?.serverId);

    return (
        <div className="filepond">

            <FilePond
                className={className}
                allowImagePreview={true}
                allowFilePoster={true}
                server={{
                    url: `${API_URL}/filepond`,
                    process: handleProcessFile,
                    revert: handleRevertFile, // Delete function
                    load: source && handleLoadFile
                }}
                onupdatefiles={(e) => setFiles(e)}
                labelIdle='قم بسحب وإسقاط ملفاتك أو<span class="filepond--label-action">تصفح</span>'
            />
        </div>
    );
}

export default Fileponds;


