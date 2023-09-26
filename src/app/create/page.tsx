'use client'

import { ICoursePage } from "@/interfaces/ICoursePage"
import { ChangeEvent, FormEvent, useState } from "react"
import ImageUpload from "@/components/ImageUpload"
import { useRouter } from "next/navigation"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Swal from "sweetalert2"
import axios from "axios"

const initialValue: ICoursePage = {
  name: '',
  imageSrc: '',
  videoSrc: '',
  author: '',
  description: '',
  price: 0
}

enum PATH {
  SPECS = 0,
  VIDEOS = 1,
}

export default function CreateCoursePage() {
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const setCustomValue = (id: any, value: any) => {
    setState((prevState) => ({
      ...prevState, [id]: value
    }));
  }

  const onSubmit = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    axios.post('/api/course', state)
      .then(response => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: response.data.message,
        }).then(() => {
          router.push('/');
        });
      })
      .catch(error => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: error.response?.data?.error,
        });
      });
  }
  //PENDIENTE: MEJORAR EL DISEÑO.
  return (
    <div className="flex justify-center">
      <div className="flex flex-col h-[900px]">
        <form onSubmit={onSubmit} className="w-[600px] py-12 flex flex-col items-center gap-4">
          <>
            <div className="w-[500px]">
              <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>

            <div className="flex flex-col gap-2 py-4 w-full">
              <Input big placeholder="Course name " id="name" type="text" value={state.name} name="name" onChange={handleChange} />
              <Input big placeholder='Authors' id='author' type='text' value={state.author} name='author' onChange={handleChange} />
              <Input big placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange} />
              <Input big placeholder='Price' id='price' type='number' value={state.price} name='price' onChange={handleChange} />
            </div>
          </>
          <Button label="Create Course" disabled={loading} />
        </form>
      </div>
    </div>
  )
}