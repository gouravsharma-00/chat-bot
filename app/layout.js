import React from 'react'
import { ThemeProvider } from 'next-themes'
import "@/globals.css"

export const metadata = {
    title: {
        "template": "%s | Your AI guide to Braj",
        "default" : "Braj-Darshan | Your AI guide to Braj"
    },
    description : "Explore the rich heritage of Braj with Braj-Darshan | Your AI-powered guide for temples, history, culture, and travel in Mathura, Vrindavan, and beyond!",
    keywords: [
        "Braj",
        "Mathura",
        "Vrindavan",
        "Krishna",
        "Temples",
        "Festivals",
        "Travel",
        "AI Chatbot",
    ],
    authors: [{ name: "gouravsharma-00" }],
    icons: "/favicon.png",
}

export default function RootLayout({ children }) {
    return(
        <html lang='en' suppressHydrationWarning>
            <head>
                {/* OpenGraph */}
                <meta property='og:title' content='Braj-Darshan | Your AI guide to Braj' />
                <meta property='og:description' content='Explore the rich heritage of Braj with Braj-Darshan | Your AI-powered guide for temples, history, culture, and travel in Mathura, Vrindavan, and beyond!' />
                {/* Icon : Peacock icons created by Freepik - Flaticon 
                    link : https://www.flaticon.com/free-icons/peacock */}
                <meta property='og:image' content='https://www.braj-darshan.vercel.app/favicon.png' />
                <meta property='og:url' content='https://www.braj-darshan.vercel.app' />
                <meta property="og:site_name" content="Braj-Darshan" />   

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Braj-Darshan | Your AI guide to Braj" />
                <meta name="twitter:description" content="Explore the rich heritage of Braj with Braj-Darshan | Your AI-powered guide for temples, history, culture, and travel in Mathura, Vrindavan, and beyond!" />
                <meta name="twitter:image" content="https://www.braj-darshan.vercel.app/favicon.png" />
                <meta name="twitter:site" content="@braj-darshan" />
            </head>
            <body>
                <ThemeProvider attribute='class' defaultTheme='system'>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}