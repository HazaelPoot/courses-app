"use client"

import { ICourseComponent } from '@/interfaces/ICourseComponent'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import Image from 'next/image'
import Button from './Button'
import axios from 'axios'

export default function MyCourseCard({ data }: ICourseComponent) {
    const router = useRouter();

    function onView() {
        router.push(`/mycourses/${data.id}`)
    }
    const onDelete = (e: FormEvent) => {
        e.preventDefault();

        axios.delete(`/api/course/${data.id}`)
            .then(() => {
                router.refresh();
            }).catch((err) => {
                throw new Error(err.message);
            })
    }

    return (
        <div className='pt-4'>
            <div className='flex flex-col p-2 relative'>
                <Image src={data.imageSrc} alt='Image' width={400} height={200} className='object-cover group-hover:scale-110 transition w-[350px] h-[200px] rounded-tl-xl rounded-tr-xl' />
                <div className='flex flex-col items-start gap-1'>
                    <div className='font-light flex items-center gap-8'>
                        <span>{data.name}</span>
                    </div>
                    <div className='w-full gap-2 flex'>
                        <Button label='View' type='button' className='rounded-lg' small onClick={onView} />
                        <Button label='Delete' type='submit' className='rounded-lg' small onClick={onDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}
