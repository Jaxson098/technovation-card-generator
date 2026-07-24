'use client'

import { useState, useEffect, useRef } from "react"
import { DynamicIcon } from 'lucide-react/dynamic';
import { getIcons } from "./getIcons";
import TextLogo from "./textLogo";
import { Users, MapPin } from "lucide-react";
import { createPortal } from 'react-dom';

export default function InnovationCard({ isEditing }) {

    const [scale, set_scale] = useState(0.1)
    const availbileSpaceRef = useRef(null)

    useEffect(()=>{
        function updateScale() {

            if (availbileSpaceRef.current != null) {
                set_scale(Math.min(
                    (availbileSpaceRef.current.clientWidth - 36 - 8*2 -18) / 1080,
                    (availbileSpaceRef.current.clientHeight - 36 - 8*2 -18) / 1920,
                ))
            }
        }

        updateScale()

        window.addEventListener('resize', updateScale);
    },[])

    return (
        <div className="grid grid-cols-1 w-3/4 h-screen">

            <div ref={availbileSpaceRef} className="flex flex-col items-center justify-center">
                <h3 className="text-text text-center font-castoro italic text-xl 2xl:text-3xl">Card</h3>
                
                <div style={{width: 1088 * scale, height: 1928 * scale}}>
                    <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                        <div className="border-8 border-text rounded-sm inline-block">
                            <Front isEditing={isEditing}/>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

function Front( {isEditing} ) {
    const [image, set_image] = useState()

    return(
        <div id="card-front" className="w-[1080px] h-[1920px] bg-primary flex flex-col px-16 py-18">
            <div className="flex items-center">
                <h3 className="tracking-widest font-bold text-3xl text-secondary">INNOVATION CARD</h3>
                <TextLogo className="ml-auto w-100"/>
            </div>

            <div className="mx-4 mt-10">
                <div className="relative flex bg-text text-gray-500 text-3xl h-100 w-full rounded-4xl text-center items-center justify-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();

                        const file = e.dataTransfer.files[0];

                        if (file && file.type.startsWith("image/")) {
                            set_image(URL.createObjectURL(file));
                        }
                    }}
                >

                    <input id="imageUpload" type="file" accept="image/*" className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];

                            if (file) {
                                set_image(URL.createObjectURL(file));
                            }
                        }}
                    />

                    <label htmlFor="imageUpload" className="absolute inset-0 flex items-center justify-center cursor-pointer">  { !image && "Click or drag to add your app logo or a screenshot"}</label>

                    { image && (<img src={image} className="w-full h-full object-contain"/>)}

                </div>
            </div>

            <div id="name" data-placeholder="Your App Name" className={`
                empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                outline-none focus:outline-none focus:ring-0
                text-7xl font-bold w-fit mt-5 mx-auto text-center ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4 line-clamp-2 max-w-full`}
                suppressContentEditableWarning 
                contentEditable="true" 
                onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = "";}}}
                >
            </div>

            <div className={`${isEditing ? "border-b-4 border-l-4 border-r-4 border-dashed border-text" : ""} py-4 px-4 w-fit line-clamp-1 max-w-full self-center`}>
                <div className={`bg-secondary rounded-4xl text-3xl tracking-wider font-bold w-fit text-primary px-6 pt-2 pb-1.5 line-clamp-1 max-w-full`}>
                    <Users className="size-8 inline mb-1 mr-3"/>
                    <p className="inline mr-3 font-castoro font-bold">By Team:</p>
                    <div data-placeholder="Your team" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-primary/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        inline text-3xl tracking-wider font-bold`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                </div>
            </div>

            <hr className="border-none opacity-20 h-1 bg-text my-10"/>

            <div className="grid grid-cols-3 w-full gap-10">

                <div className="flex flex-col gap-5">
                    <IconPicker/>
                    <div data-placeholder="Feature 1" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        font-medium text-3xl text-text tracking-wider w-fit uppercase text-center self-center ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-2 max-w-full`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <IconPicker/>
                    <div data-placeholder="Feature 2" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        font-medium text-3xl text-text tracking-wider w-fit uppercase text-center self-center ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-2 max-w-full`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <IconPicker/>
                    <div data-placeholder="Feature 3" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        font-medium text-3xl text-text tracking-wider w-fit uppercase text-center self-center ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-2 max-w-full`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                </div>

            </div>

            <hr className="border-none opacity-20 h-1 bg-text my-10"/>

            <div data-placeholder="A short app discription" className={`
                empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                outline-none focus:outline-none focus:ring-0
                text-6xl tracking-wider font-castoro italic font-medium w-fit ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4  line-clamp-7 max-w-full`}
                suppressContentEditableWarning 
                contentEditable="true" 
                onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                >
            </div>


            <div className="flex flex-col mt-auto gap-5">
                <hr className="border-none opacity-20 h-1 bg-text"/>

                <div className="grid grid-cols-2 gap-5">

                    <div className="flex justify-self-start">
                        <div data-placeholder="Year" className={`
                            empty:before:content-[attr(data-placeholder)] empty:before:text-secondary/50 empty:before:pointer-events-none 
                            outline-none focus:outline-none focus:ring-0
                            text-5xl tracking-wider font-castoro italic font-medium w-fit max-w-1/2 text-secondary ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4 line-clamp-1 max-w-full`}
                            suppressContentEditableWarning 
                            contentEditable="true" 
                            onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                            >
                        </div>

                        <h3 className=" text-2xl tracking-wider font-medium uppercase mt-2">SEASON</h3>
                    </div>

                    <div className={`${isEditing ? "border-4 border-dashed border-text" : ""} text-4xl w-fit text-text px-6 pt-2 pb-1.5 line-clamp-1 max-w-full justify-self-end`}>
                        <MapPin className="size-8 inline mr-2"/>
                        <div data-placeholder="Country" className={`
                            empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                            outline-none focus:outline-none focus:ring-0
                            inline text-2xl font-medium`}
                            suppressContentEditableWarning 
                            contentEditable="true" 
                            onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                            >
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

function IconPicker() {
    const [search_result, set_search_result] = useState([])
    const [is_searching, set_is_searching] = useState(false)
    const [selected_icon, set_selected_icon] = useState("square-dashed")
    const icon_querry = useRef();

    useEffect(() => {
        if (is_searching) {
            icon_querry.current.focus();
        }
    }, [is_searching]);

    async function handleSearch() {
        const iconNames =  await getIcons(icon_querry.current.textContent)
        if (iconNames[0] == null) {set_search_result([]); return;}
        let results = []
        let key = 0
        for (const iconName of iconNames) {
            results.push((<div className="w-full gap-5" key={key}><hr className="border-none opacity-20 h-0.5 w-full bg-primary"/><button onMouseDown={(e)=>{e.preventDefault(); set_selected_icon(iconName);}} className="truncate text-left w-full cursor-pointer text-3xl text-primary"><DynamicIcon name={iconName} size={48} className="mr-1 inline"/> {iconName}</button></div>))
            key++
        }
        set_search_result(results)
    }

    return (
        <div className="flex flex-col relative" onBlur={()=>{set_is_searching(false);}}>
            <DynamicIcon name={selected_icon} size={200} className="self-center text-secondary cursor-pointer" onMouseDown={(e)=>{e.preventDefault(); set_is_searching(!is_searching);}}/>
            {is_searching &&
                <div className="top-full absolute w-full z-50 flex flex-col items-start bg-secondary justify-start px-2 py-1 rounded-xl">
                    <div ref={icon_querry} data-placeholder="Search Icons..." contentEditable="true" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-primary/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        text-primary text-3xl w-full`} 
                        onInput={handleSearch}></div>
                    {search_result}
                </div>
            }
        </div>
    )
}