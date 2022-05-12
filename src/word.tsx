
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


    const  [a,setA]  = useState<any[]>([]);

    const [wordToDisplay, setWordToDisplay] = useState("")


    const [page, setPage] = useState(0);



    function changePage(page:number){
        if(page >=  data.book.pages.length){
            return;
        }

        if(page < 0){
            return;
        }
        
        setPage(page)
    }

  
    const previous = <button className="page-button" onClick={()=> changePage(page - 1)}>Previous</button>
    const next = <button className="page-button" onClick={()=> changePage(page + 1)}>Next</button>




    const  [sententce, setSentence] = useState("");
    const  [tokens, setTokens] = useState <Token[]>([] as Token[]);

    useEffect(
        ()=>{
            if(data != undefined){
                   
                console.log(data.book.pages[page ].content);
                console.log(page);
                
                
 
                setSentence(data.book.pages[page ].content);
                setTokens(data.book.pages[page ].tokens);

                let k = [];


                for(let i = 0 ,tokenposition = 0; i < sententce.length ;){
                    if(sententce[i].match(/[a-zA-Z]/)){
                        
                       
                    

                        if(tokens[tokenposition] == undefined){
                            break;
                        }
                        
                    k.push(<span key={i} onClick={() => showResult( tokenposition)} className="wordBackGround">{sententce.substring(i,tokens[tokenposition].position[1] )}</span>);
            
                    i = tokens[tokenposition].position[1];
                    tokenposition++;
                }
                else{
                    k.push( <span className="wordBackGround" key={i}>{sententce[i]}</span>);
                  
                    i++
                }
            }

            setA(k);
            
          
            }
        
        },
        [page,sententce, tokens]
    )
  
    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <p>`Error! ${error.message}`</p>;


    


    
    //console.log(word);


    function showResult( j:number){
        setDialogVisble(true)
        setWordToDisplay(tokens[j -1 ].value);
    
    }

    
    
    
    
   
  
    return (<div>
    <Dialog onClose={()=>{setDialogVisble(false)}} isVisble={isDialogVisible} width="50%" height="50%"><span>{wordToDisplay}</span> </Dialog>
     <div className="pageBackground">{previous} {a} {page + 1} {next}</div>
     </div>
    );

  }