"use client"


import { ICourseDetailComponent } from '@/interfaces/ICourseDetailComponent';
import useBasket from '@/hooks/useBasket';
import Button from '@/components/Button'
import Image from "next/image";
import React from 'react';

export default function CourseDetail({ data, currentUser, courseId }: ICourseDetailComponent) {
    const { hasBasket, toggleBasket } = useBasket({
        currentUser, courseId
    });

    return (
        <div>
            <div className="h-[60vh] bg-zinc-900 flex justify-between text-white px-14 items-center">
                <div>
                    <h1 className="text-[4rem]">{data.name}</h1>
                    <p>{data.author}</p>
                    <p>{data.description}</p>
                    <p>{data.price} MX$</p>
                </div>
                <div className="w-[320px] bg-white p-1 text-black">
                    <Image src={data.imageSrc || ''} alt="Image" width={200} height={200} className="w-full object-cover" />
                    <div>
                        <p className='mt-2'>${data.price}</p>
                        <div className="flex flex-col gap-1 mt-4">
                            <Button onClick={toggleBasket} label={`${hasBasket ? 'Remove from Basket' : 'Add to Basket'}`} className='rounded-lg' small />
                            <Button type='button' label="Buy now" outline small />
                            <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">30 day money back guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}