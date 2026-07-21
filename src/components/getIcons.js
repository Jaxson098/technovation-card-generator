'use server'

import { readFileSync } from 'fs';
import tags from '@/components/tags.json'

export async function getIcons(querry) {
    if (String(querry).trim() === "" || querry == null) return []
    const returned = Object.entries(tags)
        .map(([name, tags])=>({name: name, score: Math.max(...tags.map(tag => score(tag, querry)), nameScore(name, querry))}))
        .filter(icon => icon.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(icon => icon.name);
    return returned
}

function score(tag, querry) {
    tag = String(tag).toLowerCase()
    querry = String(querry).toLowerCase().trim()
    if (tag === querry) return 3
    if (tag.startsWith(querry)) return 2
    if (tag.includes(querry)) return 1
    return 0
}

function nameScore(name, querry) {
    name = String(name).toLowerCase()
    querry = String(querry).toLowerCase().trim()
    if (name === querry) return 4
    if (name.startsWith(querry)) return 2
    if (name.includes(querry)) return 1
    return 0
}