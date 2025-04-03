

const API = "http://localhost:11434/api/generate";

export async function POST(req) {
    const {prompt} = await req.json();
    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                model : "gemma3:1b",
                prompt, 
                stream : false
            })
        })
        const data = await response.json()
        console.log(data.response);
        return Response.json({message: "Success", response : data.response}, {status: 200});
    }catch(err) {
        console.log("Error: ", err);
        return Response.json({message: "Error"}, {status: 500});
    }
}