import { IImageComponent } from "@/interfaces/IImageComponent";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import { useCallback } from "react";
import Image from "next/image";

declare global {
    var cloudinary: any;
}

const ImageUpload: React.FC<IImageComponent> = ({ onChange, value }) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url);
        },
        [onChange]
    );

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="t4dcokwq"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover:opacity-70 border-dashed border-2  flex flex-col justify-center items-center h-[500px] "
                    >
                        <TbPhotoPlus />
                        <div className="text-lg">Click to upload</div>

                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    alt="upload"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;
