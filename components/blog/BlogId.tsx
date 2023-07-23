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

        <div>
            <button onClick={() => setOnActive(!onActive)} className="uppercase" >Edit</button>
            <button onClick={onDelete} className="uppercase" >Delete</button>
        </div>

        {onActive && (
            <form onSubmit={onSubmit}>
                <div>
                    <ImageUpload  value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                </div>
            </form>
        )}
    </div>
  )
}
