"use client"

import { ChangeEvent, FormEvent , useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import ImageUpload from "@/components/input/ImageUpload";
import axios from "axios";

interface InitialStateProps {
    name?: string;
    imageSrc: string;
    description: string;
}

const initialState:InitialStateProps = {
    name: "",
    imageSrc: "",
    description: ""
}

export default function Create() {
    const [state, setState] = useState(initialState);
    const router = useRouter();

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    }

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value });
    }

    const onSubmit = (event:FormEvent) => {
        event.preventDefault();

        axios.post('/api/blogs', state)
        .then(() => {
            router.push('/')
        })

        .catch((err) => {
           throw new Error(`failed to create blog: ${err.message}`)
        })
        router.refresh();
    }

  return (
    <form onSubmit={onSubmit} className="w-[600px] h-[700px] mx-auto py-12">
        <div>
            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
        </div>

        <div className=' flex mt-14 rounded-md flex-col justify-center items-center px-10 py-3 h-[450px] w-[650px] mx-auto gap-2 border border-slate-300 shadow-md'>
           
            <Input placeholder='Blog header' id='name' name='name' type='text' onChange={handleChange} value={state.name}/>
            <Input big placeholder='Blog content or description' id='description' name='description' type='text' onChange={handleChange} value={state.description}/>

            <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md tracking-wider uppercase'>Post</button>
        </div>

  </form>
  )
}
