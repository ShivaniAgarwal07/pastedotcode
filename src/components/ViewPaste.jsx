import {  useSelector } from "react-redux";
import { useParams} from "react-router-dom";

const ViewPaste= () => {

    const {id}= useParams();

    const allPastes= useSelector((state)=> state.paste.pastes);

    const paste= allPastes.filter((p)=> p._id===id)[0];
    return(
        <div>

        <div className="flex flex-row gap-6 place-content-between">
            <input type="text" placeholder="enter title here"
             value={paste.title}  className="p-2 rounded-2xl mt-2 w-[68%] pl-5" disabled/>

             {/* <button onClick={createPaste} className="p-2 rounded-2xl mt-2 pl-5 pr-5">
                {
                    pasteId? "Update Paste": "Create Paste"
                }
             </button> */}
        </div>
        <div className="mt-8">
            <textarea 
            value={paste.content} placeholder="enter content here" 
            
            rows={20} className="p-4 rounded-2xl mt-4 min-w-[500px] pl-5" disabled>
                 
            </textarea>
        </div>
        </div>
    )
}
export default ViewPaste