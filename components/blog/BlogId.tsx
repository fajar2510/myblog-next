"use client"

import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import ImageUpload from "../input/ImageUpload"
import Input from "../input/Input";
import { useRouter } from "next/navigation";

interface BlogProps {
    name?: string;
    description?: string;
    imageSrc?: any;
    blogId?: string;
}

interface InitialStateProps {
    name: string;
    description: string;
    imageSrc: string; 
}

const InitialState:InitialStateProps = {
    name: "",
    description: "",
    imageSrc: ""
}

export default function BlogId({name, description, imageSrc, blogId}:BlogProps) {
    const router = useRouter();
    const [state, setState] = useState(InitialState);
    const [onActive, setOnActive] = useState(false);

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }))
    }

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value})
    }


    const onSubmit = (event:FormEvent) => {
        event.preventDefault();

        axios.put(`/api/blogs/${blogId}`, state) // put untuk update data
        .then(() => {
            router.refresh();
        })

        .catch((err) => {
           throw new Error(`Failed to update blog: ${err.message}`)
        })
        .finally(() => {
            router.push("/")
            console.log("Successfully updated blog")
        });
    }

    const onDelete = (event:FormEvent) => {
        event.preventDefault();

        axios.delete(`/api/blogs/${blogId}`)
        .then(() => {
            router.refresh()
        })
        .catch((err) => {
           throw new Error(`failed to delete blog: ${err.message}`)
        })
        .finally(() => {
            router.push('/')
            console.log("Successfully deleted")
        });
    }

  return (
    <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4">
        <div className="flex flex-col border-b-2">
            <span>{name}</span>
        </div>

        <div>
            <span>
                {description}
            </span>
        </div>

        <div>
            <Image src={imageSrc} width={400} height={400} alt="Blog Image" />
        </div>

        <div className="flex justify-center gap-3">
            <button onClick={() => setOnActive(!onActive)} className="uppercase bg-blue-600 hover:bg-blue-500 px-4 py-2.5" >Edit</button>
            <button onClick={onDelete} className="uppercase bg-pink-600 hover:bg-pink-500 px-4 py-2.5" >Delete</button>
        </div>

        {onActive && (
            <form onSubmit={onSubmit}>
                <div>
                    <ImageUpload  value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                </div>

                <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
                    <Input placeholder="Name" id="name" type="text" value={state.name}  name="name" onChange={handleChange}/>
                    <Input placeholder="Description" id="description" type="text" value={state.description}  name="description" onChange={handleChange}/>
                </div>

                <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md tracking-wider uppercase'>Update Post</button>
            </form>
        )}
    </div>
  )
}
