// Select Ingredients tab

let changed = 0;

function fetchOptions()
{
   return new Promise((resolve) => {
   chrome.storage.sync.get(
      // { favoriteColor: 'red', likesColor: true },
      {
         salt: {label: "salt", option: "indifferent", ro: "sare săruri saruri"}, 
         sugar: {label: "sugar", option: "indifferent", ro: "zahar zahăr zaharat zaharuri"}, 
         gluten: {label: "gluten", option: "indifferent", ro: "gluten"},
         lactose: {label: "lactose", option: "indifferent", ro: "lapte lactat lactoza lactoză"},
         eggs: {label: "eggs", option: "indifferent", ro: "ou oua ouă"},
         fish: {label: "fish", option: "indifferent", ro: "peste pește pești pesti"},
         soy: {label: "soy", option: "indifferent", ro: "soia"},
         nuts: {label: "nuts", option: "indifferent", ro: "nuci arahide oleic"}
      },
      (items) => {
         userOpts = JSON.stringify(items);
         resolve(userOpts);
      }
   )
   })
};

async function getOptions()
{
   if (!changed)
   { 
      changed = 1;
      let userOptions = await fetchOptions();
      userOptions = JSON.parse(userOptions);
      console.log(userOptions);

      ingredients = document.querySelector("#panel\\:r0\\:1 > div > div > div:nth-child(1) > div > div");
      console.log(ingredients);

      text = "";
      //ingredientsText = ingredients.textContent;
      ingredientsText = ingredients.innerHTML;

      ingredient = ingredientsText.split(" ");
      let keys = Object.keys(userOptions);
      for (let i = 0; i < ingredient.length; i++)
      {
         ingredient[i] = ingredient[i].replace(/[^a-z0-9șăâîț]/gi, '');
         for (let j = 0; j < keys.length; j++)
            if(userOptions[keys[j]].ro.includes(ingredient[i].toLowerCase()))
            {
               console.log(ingredient[i] + " " + userOptions[keys[j]].ro + " " + userOptions[keys[j]].ro.indexOf(ingredient[i].toLowerCase()));
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
      console.log(ingredient);
      document.querySelector("#panel\\:r0\\:1 > div > div > div:nth-child(1) > div > div").innerHTML = text;

      let table = document.querySelector("#panel\\:r0\\:1 > div > div > div:nth-child(2) > div.ProductTabs_sectionBody__3Z3aY > div > table");
   }
};

document.getElementById("tab:r0:1").addEventListener("click", getOptions);