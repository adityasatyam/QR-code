import { useEffect, useState  } from "react";
import axios from 'axios';

const CreateShortLink = ( {originalLink})=>{
    const [shortLink,setShortLink] = useState(originalLink);
    const api = 'https://api.shrtco.de/v2/shorten'
    useEffect(()=>{
        // setTimeout(
        axios.get(api, {
            params: {
                url: originalLink
            }
          })
          .then(res=>{
              console.log(res)
              setShortLink(res.data.result.full_short_link)})
        // ,1000)
    }
    );
    return( <div>
        {/* <p>{originalLink}</p> */}

        <a href={shortLink} target="_blank" >{shortLink}</a>
    </div>
    )
}

export default CreateShortLink;