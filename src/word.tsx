
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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
    const { loading, error, data } = useQuery(GET_PAGES);



    const [page, setPage] = useState(1);

  
    const previous = <button className="page-button" onClick={()=> setPage(page - 1)}>Previous</button>

    const next = <button className="page-button" onClick={()=> setPage(page + 1)}>Next</button>

    const  [word, setWord] = useState("");
    const  [tokens, setTokens] = useState <Token[]>([] as Token[]);

    useEffect(
        ()=>{
            if(data != undefined){
                console.log(page);
                console.log("sd");
                
                setWord(data.book.pages[page].content);
                setTokens(data.book.pages[page].tokens);
          
            }
        
        },
        [data,page]
    )
  
    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <p>`Error! ${error.message}`</p>;


    


    
    //console.log(word);


    function showResult( j:number){
        alert(tokens[j -1 ].value)
        console.log(j -1 );
        
        console.log(tokens[j -1 ].value);
        
        
        
    }

    
    
    
    

    let a:any[] = [];

    for(let i = 0 ,tokenposition = 0; i < word.length ;){
        if(word[i].match(/[a-zA-Z]/)){
           
            //console.log(tokenposition, word.substring(i,tokens[tokenposition].position[1] ));
            
        a.push(<span onClick={() => showResult( tokenposition)} className="wordBackGround">{word.substring(i,tokens[tokenposition].position[1] )}</span>);

        i = tokens[tokenposition].position[1];
        tokenposition++;
    }
    else{
        a.push( <span>{word[i]}</span>);
      
        i++
    }
}


   
  
    return (
     <div className="pageBackground">{previous} {a} {next}</div>
    );

  }