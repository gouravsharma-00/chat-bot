import React from 'react'
import { ThemeProvider } from 'next-themes'
import "@/globals.css"

export const metadata = {
    title: {
        "template": "%s | Your AI guru",
        "default" : "ICE | Your AI guru"
    },
    description : "Your AI-powered guide and beyond!",
    keywords: [
        "AI Chatbot"
    ],
    authors: [{ name: "gouravsharma-00" }],
    icons: "/favicon.png",
}

export default function RootLayout({ children }) {
    return(
        <html lang='en' suppressHydrationWarning>
            <head>
                {/* OpenGraph */}
                <meta property='og:title' content='ICE | Your AI guru' />
                <meta property='og:description' content='Your AI-powered guide and beyond!' />
                {/* Icon : Peacock icons created by Freepik - Flaticon 
                    link : https://www.flaticon.com/free-icons/peacock */}
                <meta property='og:image' content='https://braj-darshan.vercel.app/favicon.png' />
                <meta property='og:url' content='https://braj-darshan.vercel.app' />
                <meta property="og:site_name" content="Braj-Darshan" />   

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ICE | Your AI guru" />
                <meta name="twitter:description" content="Your AI-powered guide and beyond!" />
                <meta name="twitter:image" content="https://braj-darshan.vercel.app/favicon.png" />
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
