import "./Home.css"
import { useState } from 'react';
import Axios from 'axios';
const YOUR_APP_ID='f63db11e';

const YOUR_APP_KEY='01a4afd914dc41f5b2bff63f81692658'
function Home()
{
    const [query,setquery]= useState("");
    const [recipes ,setrecipes] = useState([]);
    const [healthLabel,sethealthLabel]=useState('vegan')
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;
   async function getData()
   {
    try{
        const result = await  Axios.get(url); 
        setrecipes(result.data.hits);
        console.log(result.data.hits);
    }
    catch(err)
    {
        alert(err);
    }
   } 
   const onsubmit = (e)=>
    {
        e.preventDefault();
        getData();
    }
   return<div className="inputregion">
    <h1>Food Recipes 🍕</h1>
    <form className="fields" onSubmit={onsubmit}>
        <input type='text' placeholder='Enter the ingredient' className='box'  onChange={(e)=>{
          setquery(e.target.value)
        }}
         ></input>
        <button className="btn">Search</button>
        <br></br>
        <small>Click on the image to know about it !</small>
    </form>
    <div className="Out">
        
        {recipes.map(recipe=>{
             return (
             <div>
                <p>Recipe</p>
                <img src={recipe.recipe.image} onClick={()=>{
                  window.open(recipe.recipe.url)
                }}></img>
                <br></br>
                <p className="recipeTile__name">{recipe.recipe.label}</p>
             </div>)
        })}
    </div>
   </div>
}
export default Home