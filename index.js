document.addEventListener("DOMContentLoaded", function() {
    let recipe;
    getRecipe();
});

async function getRecipe(){
    
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(res => {
            return res.json();
        }).then( res => {
            recipe = res.meals[0];
            console.log(recipe);
            setData();
        });
    }

function setData(){
    document.getElementById('recipe-img').src = `${recipe.strMealThumb}`;
    document.getElementById('recipe-title').innerHTML = `${recipe.strMeal}`;
    document.getElementById('instructions').innerHTML = '';
    document.getElementById('ingredients-list').innerHTML = '';
    showInstructions(recipe.strInstructions);
    for(let i = 1; i <= 20; i++){
        let ingredient = recipe[`strIngredient${i}`];
        let measurement = recipe[`strMeasure${i}`];
        if(ingredient != "" && ingredient != " " && ingredient != null){
            const div = document.createElement('div');
            div.innerHTML = `${ingredient} - ${measurement}`;
            div.style = "padding: 3px;"
            document.getElementById('ingredients-list').appendChild(div);
        }
    }
}

function showInstructions(instructions){
    instructions.split('.').forEach(string => {
        if(string != '' && string != ' '){  
            const div = document.createElement('li');
            div.innerHTML = `${string}.`;
            div.style = "padding: 5px;";
            document.getElementById('instructions').appendChild(div);
        }
    });
}