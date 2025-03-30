"use client"
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Theme() {
    const {theme, setTheme} = useTheme();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true)
    }, []);
    if(!mount) return null; // avoid hydration mismatch

    return (
        <button
        className='p-1.5 absolute'
            onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
            }>
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    )

}