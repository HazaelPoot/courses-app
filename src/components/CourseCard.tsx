'use client'

import { ICourseComponent } from '@/interfaces/ICourseComponent';
import { useRouter } from 'next/navigation'
import { SafeCourse } from '@/types'
import Image from 'next/image'

function CourseCard({ data, key }: ICourseComponent) {
    const router = useRouter();

    function handleCourseClick() {
        router.push(`/course/${data.id}`)
    }

    return (
        <div key={key} onClick={handleCourseClick} className='pt-4'>
            <div className='flex flex-col p-2 relative'>
                <div className='cursor-pointer hover:opacity-80'>
                    <div className='border-[4px] border-yellow-400 relative'>
                        <Image src={data.imageSrc} alt='Image' width={330} height={500} className='object-cover w-[339px] h-[200px]' />
                    </div>
                    <div className='pt-1 px-1'>
                        <h3 className='text-[17px]'>{data.name}</h3>
                        <span className='text-gray-400 block text-[13.5px] font-normal'>{data.author}</span>
                        <span>{data.price} MX$</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseCard