'use client'

import { useState, useEffect, useRef } from "react"
import TextLogo from "./textLogo"
import { House, MapPin, Calendar, Megaphone, UserStar, Award, Mail } from "lucide-react";

export default function PartnershipCard({ isEditing }) {

    const [scale, set_scale] = useState(0.1)
    const availbileSpaceRef = useRef(null)
    const [name, set_name] = useState("Organization Name");

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
        <div className="grid grid-cols-2 w-3/4 h-screen">

            <div ref={availbileSpaceRef} className="flex flex-col items-center justify-center">
                <h3 className="text-text text-center font-castoro italic text-xl 2xl:text-3xl">Front</h3>
                
                <div style={{width: 1088 * scale, height: 1928 * scale}}>
                    <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                        <div className="border-8 border-text rounded-sm inline-block">
                            <Front isEditing={isEditing} set_name={set_name}/>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="flex flex-col items-center justify-center">
                <h3 className="text-text text-center font-castoro italic text-xl 2xl:text-3xl">Back</h3>

                <div style={{width: 1088 * scale, height: 1928 * scale}}>
                    <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                        <div className="border-8 border-text rounded-sm inline-block">
                            <div id="card-back" className="w-[1080px] h-[1920px] bg-primary text-9xl">
                                <Back isEditing={isEditing} name={name}/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

function Front( {isEditing, set_name} ) {

    const [image, set_image] = useState()

    return (
        <div id="card-front" className="w-[1080px] h-[1920px] bg-primary flex flex-col px-16 py-18 gap-15 overflow-auto">
            <div className="flex items-center">
                <h3 className="tracking-widest font-bold text-3xl text-secondary">TECHNOVATION PARTNER</h3>
                <TextLogo className="ml-auto w-100"/>
            </div>

            <div className="mx-4">
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

                    <label htmlFor="imageUpload" className="absolute inset-0 flex items-center justify-center cursor-pointer">  { !image && "Click or drag to add your logo"}</label>

                    { image && (<img src={image} className="w-full h-full object-contain"/>)}

                </div>
            </div>

            <div className={`${isEditing ? "border-4 border-dashed border-text" : ""} py-4 px-4 w-fit line-clamp-1 max-w-full`}>
                <div className={`bg-secondary rounded-4xl text-3xl tracking-wider font-bold w-fit text-primary px-6 pt-2 pb-1.5 line-clamp-1 max-w-full`}>
                    <House className="size-8 inline mb-1 mr-5"/>
                    <div data-placeholder="Club Type (e.g in-school elective)" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-primary/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        inline text-3xl tracking-wider font-bold uppercase`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                </div>
            </div>

            <div id="name" data-placeholder="Your Organization Name" className={`
                empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                outline-none focus:outline-none focus:ring-0
                text-7xl font-bold w-fit ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4 line-clamp-2 max-w-full`}
                suppressContentEditableWarning 
                contentEditable="true" 
                onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""; set_name("Your Organization")} else set_name(event.currentTarget.innerText)}}
                >
            </div>

            <div className={`${isEditing ? "border-4 border-dashed border-text" : ""} text-4xl w-fit text-text px-6 pt-2 pb-1.5 line-clamp-1 max-w-full`}>
                <MapPin className="size-8 inline mb-1 mr-5"/>
                <div data-placeholder="City, Country (e.g New York City, USA)" className={`
                    empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                    outline-none focus:outline-none focus:ring-0
                    inline text-4xl font-medium`}
                    suppressContentEditableWarning 
                    contentEditable="true" 
                    onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                    >
                </div>
            </div>

            <div data-placeholder="A one-sentence summary of what this partnership makes possible" className={`
                empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                outline-none focus:outline-none focus:ring-0
                text-6xl tracking-wider font-castoro italic font-medium w-fit ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4  line-clamp-6 max-w-full`}
                suppressContentEditableWarning 
                contentEditable="true" 
                onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                >
            </div>

            <div className="mt-auto flex flex-col gap-8">
                <hr className="border-none opacity-20 h-1 bg-text"/>

                <div data-placeholder="# (e.g 48)" className={`
                    empty:before:content-[attr(data-placeholder)] empty:before:text-secondary/50 empty:before:pointer-events-none 
                    outline-none focus:outline-none focus:ring-0
                    text-8xl tracking-wider font-castoro italic font-medium w-fit text-secondary ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4 line-clamp-1 max-w-full`}
                    suppressContentEditableWarning 
                    contentEditable="true" 
                    onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                    >
                </div>

                <h3 className="text-3xl tracking-wider font-medium uppercase">YOUTH IN THE PROGRAM</h3>
            </div>
            
        </div>
    )
}

function Back( {isEditing, name} ) {
    return (
        <div id="card-back" className="w-[1080px] h-[1920px] bg-primary flex flex-col px-16 py-18 gap-10 overflow-auto">
            <div className="flex items-center">
                <h3 className="tracking-widest font-bold text-3xl text-secondary max-w-2/3 line-clamp-2 uppercase">{name}</h3>
                <h3 className="tracking-wider font-bold text-4xl text-text ml-auto">HOW WE RUN</h3>
            </div>

            <hr className="border-none opacity-20 h-1 bg-text"/>

            <div className="flex flex-col gap-2 line-clamp-4 max-w-full">
                <h3 className="tracking-wider font-bold text-4xl text-secondary">GOALS OF COLLABORATION</h3>
                <div data-placeholder="The summarized goals of your program (e.g give students a working feedback loop: pitch a real problem, ship a prototype, present to the community.)" className={`
                    empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                    outline-none focus:outline-none focus:ring-0
                    text-4xl w-fit ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-4 max-w-full`}
                    suppressContentEditableWarning 
                    contentEditable="true" 
                    onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                    >
                </div>
            </div>

            <hr className="border-none opacity-20 h-1 bg-text"/>

            <div className="flex justify-evenly">

                <div className="flex flex-col gap-2 line-clamp-1 max-w-1/3">
                    <div data-placeholder="#" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-secondary/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        text-7xl font-castoro italic tracking-wider font-medium w-fit text-secondary ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-3 max-w-full`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                    <h3 className="font-medium text-3xl text-text tracking-wider">DAYS / WEEK</h3>
                </div>

                <div className="flex flex-col gap-2 line-clamp-1 max-w-1/3">
                    <div data-placeholder="#" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-secondary/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        text-7xl font-castoro italic tracking-wider font-medium w-fit text-secondary ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-3 max-w-full`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                    <h3 className="font-medium text-3xl text-text tracking-wider">WEEKS TOTAL</h3>
                </div>

                <div className="flex flex-col gap-2 line-clamp-1 max-w-1/3">
                    <div data-placeholder="#" className={`
                        empty:before:content-[attr(data-placeholder)] empty:before:text-secondary/50 empty:before:pointer-events-none 
                        outline-none focus:outline-none focus:ring-0
                        text-7xl font-castoro italic tracking-wider font-medium w-fit text-secondary ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-3 max-w-full`}
                        suppressContentEditableWarning 
                        contentEditable="true" 
                        onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                        >
                    </div>
                    <h3 className="font-medium text-3xl text-text tracking-wider">YOUTH REACHED</h3>
                </div>

            </div>

            <hr className="border-none opacity-20 h-1 bg-text"/>

            <div className="flex-flex-col">

                <div className="flex gap-8 mb-10">
                    <Calendar className="text-secondary size-14 inline shrink-0"/>
                    <div className="flex flex-col line-clamp-1 max-w-full">
                        <h3 className="font-medium text-3xl text-text tracking-wider">SEASON OF LAUNCH</h3>
                        <div data-placeholder="Season, Year (e.g Fall 2024)" className={`
                            empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                            outline-none focus:outline-none focus:ring-0
                            text-4xl w-fit ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-1 max-w-full`}
                            suppressContentEditableWarning 
                            contentEditable="true" 
                            onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                            >
                        </div>
                    </div>
                </div>

                <div className="flex gap-8 mb-10">
                    <Megaphone className="text-secondary size-14 inline shrink-0"/>
                    <div className="flex flex-col line-clamp-3 max-w-full">
                        <h3 className="font-medium text-3xl text-text tracking-wider">HOW WE RECRUIT</h3>
                        <div data-placeholder="Your recruitment method (e.g through STEM electives and the school innovation club)" className={`
                            empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                            outline-none focus:outline-none focus:ring-0
                            text-4xl w-fit ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-3 max-w-full`}
                            suppressContentEditableWarning 
                            contentEditable="true" 
                            onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                            >
                        </div>
                    </div>
                </div>

                <div className="flex gap-8 mb-10">
                    <UserStar className="text-secondary size-14 inline shrink-0"/>
                    <div className="flex flex-col line-clamp-3 max-w-full">
                        <h3 className="font-medium text-3xl text-text tracking-wider">FACILITATION MODEL</h3>
                        <div data-placeholder="Who are your facilitators (e.g classroom teachers and local university students)" className={`
                            empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                            outline-none focus:outline-none focus:ring-0
                            text-4xl w-fit ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-3 max-w-full`}
                            suppressContentEditableWarning 
                            contentEditable="true" 
                            onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                            >
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    <Award className="text-secondary size-14 inline shrink-0"/>
                    <div className="flex flex-col line-clamp-3 max-w-full">
                        <h3 className="font-medium text-3xl text-text tracking-wider">HOW WE CELEBRATE</h3>
                        <div data-placeholder="How does your program celebrate (e.g project showcase with family members)" className={`
                            empty:before:content-[attr(data-placeholder)] empty:before:text-text/50 empty:before:pointer-events-none 
                            outline-none focus:outline-none focus:ring-0
                            text-4xl w-fit ${isEditing ? "border-4 border-dashed border-text py-2 px-4" : ""} line-clamp-3 max-w-full`}
                            suppressContentEditableWarning 
                            contentEditable="true" 
                            onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                            >
                        </div>
                    </div>
                </div>

            </div>

            <hr className="border-none opacity-20 h-1 bg-text mt-auto"/>

            <div className="flex">
                <Mail className="size-10 inline mt-3"/>
                <div data-placeholder="you@email.com" className={`
                    empty:before:content-[attr(data-placeholder)] empty:before:text-secondary/50 empty:before:pointer-events-none 
                    outline-none focus:outline-none focus:ring-0
                    text-3xl w-fit text-secondary ${isEditing ? "border-4 border-dashed border-text" : ""} py-2 px-4 line-clamp-1 max-w-3/4`}
                    suppressContentEditableWarning 
                    contentEditable="true" 
                    onInput={(event)=>{if (event.currentTarget.innerText.trim() == ""){event.currentTarget.innerText = ""}}}
                    >
                </div>
            </div>
        </div>
    )
}