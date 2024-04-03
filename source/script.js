// Variable to see wheter the extension has run,
// in order to make sure that it isn't triggered 
// too many times
let changed = false;

// Function to check if a string is in an array of strings
// We check if the strings includes the strings in the array
// so that "a"(string) won't pass for "lapte"(string in array)
function check(stringArray, string)
{
   string = string.toLowerCase();
   for (let i = 0; i < stringArray.length; i++)
      if (string.includes(stringArray[i]))
         return true;
   return false;
}

async function getText(file) {
   let myObject = await fetch(file);
   let myText = await myObject.text();
   console.log(myText);
}

// Function to get the user's options
// Similar to the one in popup.js, but also includes arrays of strings
// representing an item's translation or synonym in Romanian
function fetchOptions()
{
   return new Promise((resolve) => {
   chrome.storage.sync.get(
      // { favoriteColor: 'red', likesColor: true },
      {
         salt: {label: "salt", option: "indifferent", ro: ["sare", "săruri", "saruri"]}, 
         sugar: {label: "sugar", option: "indifferent", ro: ["zahar", "zahăr", "zaharat", "zaharuri"]}, 
         gluten: {label: "gluten", option: "indifferent", ro: ["gluten"]},
         lactose: {label: "lactose", option: "indifferent", ro: ["lapte", "lactat", "lactoza", "lactoză"]},
         eggs: {label: "eggs", option: "indifferent", ro: ["ou", "oua", "ouă"]},
         fish: {label: "fish", option: "indifferent", ro: ["peste", "pește", "pești", "pesti"]},
         soy: {label: "soy", option: "indifferent", ro: ["soia"]},
         nuts: {label: "nuts", option: "indifferent", ro: ["nuci", " arahide", " oleic"]}
      },
      (items) => {
         userOpts = JSON.stringify(items);
         resolve(userOpts);
      }
   )
   })
};

// main function of the injected script
async function main()
{
   if (!changed) // prevent the extension from running multiple times
   { 
      changed = true;
      let userOptions = await fetchOptions();
      userOptions = JSON.parse(userOptions); // parse options

      // get the element containing info about the product's ingredients
      ingredients = document.querySelector("#panel\\:r0\\:1 > div > div > div:nth-child(1) > div > div");

      text = "";
      let ingredientsText = ingredients.innerHTML;

      ingredient = ingredientsText.split(" "); // create an array of the words in the element
      let keys = Object.keys(userOptions);
      for (let i = 0; i < ingredient.length; i++)
      {
         ingredient[i] = ingredient[i].replace(/[^a-z0-9șăâîț]/gi, ''); // remove all non-alphanumeric characters from the word
         for (let j = 0; j < keys.length; j++)
            if(check(userOptions[keys[j]].ro, ingredient[i].toLowerCase())) // check if the current ingredient is in the list of options
            {
               // Color the element respective of the user's option
               if (userOptions[keys[j]].option === "reduced")
               {
                  ingredient[i] = "<span style=\"background-color: orange;\">" + ingredient[i] + "</span>";
               }
               else
               {
                  if (userOptions[keys[j]].option === "none")
                  {
                     ingredient[i] = "<span style=\"background-color: red;\">" + ingredient[i] + "</span>";
                  }
               }
            }
         text = text + " " + ingredient[i] + " ";
      }
      // update page content
      document.querySelector("#panel\\:r0\\:1 > div > div > div:nth-child(1) > div > div").innerHTML = text;

      let ingredientTable = document.querySelector("#panel\\:r0\\:1 > div > div > div:nth-child(2) > div.ProductTabs_sectionBody__3Z3aY > div > table > tbody");
      for (let i = 0; i < ingredientTable.children.length; i++)
      {
         element = ingredientTable.children[i];
         ingredient = element.children[0].innerHTML.split(" ");
         val = element.children[1].innerHTML; // quantity of the current ingredient
         let txt ="";
         ingredient.forEach(ingredient => {
            for (let j = 0; j < keys.length; j++)
            {
               if(check(userOptions[keys[j]].ro, ingredient.toLowerCase()))
               {
                  console.log(ingredient + " " + userOptions[keys[j]].ro + " " + userOptions[keys[j]].ro.indexOf(ingredient.toLowerCase()));
                  if (userOptions[keys[j]].option === "reduced")
                  {
                     ingredient = "<span style=\"background-color: orange;\">" + ingredient + "</span>";
                     val = "<span style=\"background-color: orange;\">" + val + "</span>";
                  }
                  else
                  {
                     if (userOptions[keys[j]].option === "none")
                     {
                        ingredient = "<span style=\"background-color: red;\">" + ingredient + "</span>";
                        val = "<span style=\"background-color: red;\">" + val + "</span>";
                     }
                  }
               }
               
            }
            txt = txt + " " + ingredient + " ";
         })
         // update the page
         element.children[0].innerHTML = txt;
         element.children[1].innerHTML = val;
      };
   }
};

// Execute script when the user selects the "Ingrediente" tab
document.getElementById("tab:r0:1").addEventListener("click", main);