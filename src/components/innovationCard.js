'use client'

import { useState, useEffect, useRef } from "react"
import { DynamicIcon } from 'lucide-react/dynamic';
import { getIcons } from "./getIcons";

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
                <h3 className="text-text text-center font-castoro italic text-xl 2xl:text-3xl">Front</h3>
                
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
    const icon_querry = useRef();
    const [search_result, set_search_result] = useState([])
    const [is_searching, set_is_searching] = useState(false)

    async function handleSearch() {
        const iconNames =  await getIcons(icon_querry.current.textContent)
        if (iconNames[0] == null) {set_search_result([]); return;}
        let results = []
        let key = 0
        for (const iconName of iconNames) {
            results.push((<DynamicIcon key={key} name={iconName} size={48}/>))
            key++
        }
        set_search_result(results)
    }

    return(
        <div id="card-front" className="w-[1080px] h-[1920px] bg-primary flex flex-col px-16 py-18 gap-15 overflow-auto">
            <div ref={icon_querry} contentEditable="true" className="border-4 border-text border-dotted" onInput={handleSearch}></div>
            {search_result}
        </div>
    )
}