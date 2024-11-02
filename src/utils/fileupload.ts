import { toast } from 'sonner';

import axiosInstance from './axios';

export const uploadFiles = async (files: any, folder_name: string, cb: any) => {
  let uploadedFiles = {};
  const fileData = files.map((file: any) => ({
    filename: file.name,
    contentType: file.type,
    uploadPath: folder_name,
  }));

  try {
    const { data: responses } = await axiosInstance.post('/upload/image', fileData);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < responses.length; i++) {
      const { url, fields } = responses[i];
      const file = files[i];

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]: any) => {
        formData.append(key, value);
      });
      formData.append('file', file);

      // eslint-disable-next-line no-await-in-loop
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        uploadedFiles = { ...uploadedFiles, [file.name]: responses[i] };
        toast.success(`${file.name} uploaded`);
        if (i === files.length - 1) {
          cb(uploadedFiles);
        }
      } else {
        console.error('S3 Upload Error:', uploadResponse);
        // alert('Upload failed.');
        toast.error('Upload failed.');
      }
    }
  } catch (error) {
    console.error('Error during file upload:', error);
    toast.error(error.message);
  }
};
