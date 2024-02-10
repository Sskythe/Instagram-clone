import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Button } from "../ui/button"

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: String
}

const FileUploader = ({ fieldChange, mediaUrl }: any) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)


    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])


    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            onDrop,
            accept: {
                'image/*': ['.png', '.svg', '.jpeg', '.jpg']
            }
        })

    return (
        <div {...getRootProps()} className="flex flex-center  flex-col bg-dark-1 rounded-xl cursor-pointer">
            <input {...getInputProps()} className="cursor-pointer" />
            {
                fileUrl ? (
                    <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img
                            src={fileUrl}
                            alt="image"
                            className="file_uploader-img"
                        />
                        
                    </div>
                    <p className="file-uploader-label"> Click or drag photo to replace</p>
                    </>
                ) : (
                    <div className="file_uploader-box">
                        <img src="/assets/icons/file-upload.svg"
                            width={98}
                            height={88}
                            alt="file-upload" />
                        <h3 className="text-light-4 small-regular mb-6"> Drag photo here </h3>
                        {/* <p className="text-light-4 small-regular mb-6"> SVG, PNG and JPEG </p> */}
                        <Button className="shad-button_dark_4">choose from file</Button>
                    </div>
                )

            }
        </div>
    )
}

export default FileUploader