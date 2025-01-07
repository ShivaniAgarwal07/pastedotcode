import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home= () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const[searchParams, setSearchParams]= useSearchParams();
    const pasteId= searchParams.get("pasteId")
    const allPastes= useSelector((state)=> state.paste.pastes);

    function handleTitleChange(e){
        setTitle(e.target.value)
    }

    const dispatch= useDispatch();

    useEffect(()=>{
        console.log("inside use effect")
        if(pasteId){
            const paste= allPastes.find((p)=> p._id===pasteId);
            console.log("page found")
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])

    function createPaste(){

        //below is paste creation
        const paste ={
            title: title, 
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),

        }

        

        if (pasteId){
            //update the paste
            dispatch(updateToPastes(paste));
        }else{
            //create a new one
            dispatch(addToPastes(paste));
        }

        //after creation or updation clear the input title and content area
        
        setTitle("");
        setValue("");
        setSearchParams({});
    }
    return(
        <div>

        <div className="flex flex-row gap-6 place-content-between">
            <input type="text" placeholder="enter title here"
             value={title} onChange={handleTitleChange} className="p-2 rounded-2xl mt-2 w-[68%] pl-5"/>

             <button onClick={createPaste} className="p-2 rounded-2xl mt-2 pl-5 pr-5">
                {
                    pasteId? "Update Paste": "Create Paste"
                }
             </button>
        </div>
        <div className="mt-8">
            <textarea 
            value={value} placeholder="enter content here" 
            onChange={(e)=> setValue(e.target.value)} 
            rows={20} className="p-4 rounded-2xl mt-4 min-w-[500px] pl-5">
                 
            </textarea>
        </div>
        </div>
    )
}
export default Home