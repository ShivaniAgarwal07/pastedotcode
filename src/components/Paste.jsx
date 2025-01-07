import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import toast from "react-hot-toast";
import { removeFromPastes } from '../redux/pasteSlice';
import {LinkedinShareButton, TwitterShareButton, EmailShareButton, LinkedinIcon, TwitterIcon, EmailIcon} from "react-share";
import { Link } from "react-router";

const Paste= () => {
    const pastes= useSelector((state)=>state.paste.pastes);
    console.log(pastes);

    const [searchTerm, setSearchTerm]= useState('')

    const dispatch= useDispatch();

    const filteredData= pastes.filter((paste)=> paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));

    }

    function handleShare(){
        return (
    <div>
      <LinkedinShareButton url="https://www.linkedin.com/">
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <TwitterShareButton url="https://x.com/" title="Twitter(X)">
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <EmailShareButton url="https://mail.google.com/">
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
    }

    


    return(
        <div>
            <input className='p-2 rounded-2xl min-w-[600px] mt-5 pl-5' type="search" placeholder='search here' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/> 

            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length>0  &&
                    filteredData.map((paste)=>{
                        return (
                            <div className='border' key={paste?._id}>
                                <div>

                                {paste.title}
                                </div>
                                <div>
                                    {paste.content}
                                </div>
                                <div className='flex flex-row gap-4 place-content-evenly'>

                                    <button><Link
                                        to={`/?pasteId=${paste?._id}`}>Edit</Link></button>

                                    <button>
                                        <Link
                                        to={{
                                          pathname: `/pastes/${paste?._id}`
                                          
                                        }}>View</Link>
                                       
                                    </button>

                                    <button onClick={()=> handleDelete(paste?._id)} >Delete</button>

                                    <button onClick={() => {navigator.clipboard.writeText(paste?.content) 
                                        toast.success("Copied to clipboard")
                                    }}>Copy</button>

                                    <button onClick={handleShare}>Share</button>
                                </div>
                                <div>
                                    {paste.createdAt}
                                </div>
                            </div>
                        )
                    }
                        
                    )
                }

            </div>
        </div>
    )
}
export default Paste