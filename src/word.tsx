
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Dialog from "./dialog";

interface Token{
    value:string;
    position:number[];

}
const GET_PAGES = gql`query{
    book{
        pages{
            content,
            tokens{
               position, value
            }
        }
    }
  }`;

export default function Word() {
    //Getting data from backend
    const { loading, error, data } = useQuery(GET_PAGES);
    const [isDialogVisible, setDialogVisble]= useState(false);


    const  [pageToDisplay,setpageToDispplay]  = useState<any[]>([]);

    const [wordToDisplay, setWordToDisplay] = useState("")


    const [page, setPage] = useState(0);



    function changePage(page:number){
        // if page number is less than 0 or page number is greater than max page skip
        if(page >=  data.book.pages.length){
            return;
        }

        if(page < 0){
            return;
        }
        
        setPage(page)
    }

  
    const previous = <button className="page-button" onClick={()=> changePage(page - 1)}> &#8249;</button>
    const next = <button className="page-button" onClick={()=> changePage(page + 1)}>&#8250;</button>




    const  [sententce, setSentence] = useState("");
    const  [tokens, setTokens] = useState <Token[]>([] as Token[]);

    useEffect(
        ()=>{
            if(data != undefined){
                // set current page sentence and token from page
                setSentence(data.book.pages[page ].content);
                setTokens(data.book.pages[page ].tokens);

                let currentPageToDisplayHolder = [];


                for(let i = 0 ,tokenposition = 0; i < sententce.length ;){
                    // if the current word is an alphabatic character take the start and find the end in the tokenized word
                    if(sententce[i].match(/[a-zA-Z]/)){

                        if(tokens[tokenposition] == undefined){
                            break;
                        }
                        
                    currentPageToDisplayHolder.push(<span key={i} onClick={() => showResult( tokenposition)} className="wordBackGround">{sententce.substring(i,tokens[tokenposition].position[1] )}</span>);
            
                    i = tokens[tokenposition].position[1];
                    tokenposition++;
                }
                else{
                    currentPageToDisplayHolder.push( <span className="punctuationBackGround" key={i}>{sententce[i]}</span>);
                  
                    i++
                }
            }

            setpageToDispplay(currentPageToDisplayHolder);
            
          
            }
        
        },
        [page,sententce, tokens]
    )
  
    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <p>`Error! ${error.message}`</p>;

    function showResult( j:number){
        setDialogVisble(true)
        setWordToDisplay(tokens[j -1 ].value);
    
    }
    return (<div>
    <Dialog onClose={()=>{setDialogVisble(false)}} isVisble={isDialogVisible} width="50%" height="50%"><span>{wordToDisplay}</span> </Dialog>
     <div className="whole-page">
     <div className="page-background"> {pageToDisplay}  </div>
     <div className="next-previous-page">
         <span className="previous-button">{previous}</span>
          <span className="page">Page {page + 1}</span>
          <span className="next-button">{next}</span></div>
     </div>
     </div>
    );

  }