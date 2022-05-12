
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

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
  
    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <p>`Error! ${error.message}`</p>;
    var word = data.book.pages[1].content;
    var tokens = data.book.pages[1].tokens;
  
    //console.log(word);


    function showResult( j:number){
        console.log(j -1 );
        
        console.log(tokens[j -1 ]);
        
        
        
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
     <div>{a}</div>
    );

  }