// TODO: Create base object of objects with name, option, color
// Use object for the storage methods
let userOptions = {
   salt: {
      label: "salt", option: "indifferent"
   },
   sugar: {
      label: "sugar", option: "indifferent"
   },
   gluten: {
      label: "gluten", option: "indifferent"
   },
   lactose: {
      label: "lactose", option: "indifferent"
   },
   eggs: {
      label: "eggs", option: "indifferent"
   },
   fish: {
      label: "fish", option: "indifferent"
   },
   soy: {
      label: "soy", option: "indifferent"
   },
   nuts: {
      label: "nuts", option: "indifferent"
   }
};

let keys = Object.keys(userOptions);
// console.log(userOptions[keys[2]].option);

// Saves options to chrome.storage
const saveOptions = () => {
   for (let i = 0; i < keys.length; i++)
      userOptions[keys[i]].option = document.getElementById(userOptions[keys[i]].label).value;
   
   chrome.storage.sync.set(
      //{ favoriteColor: color, likesColor: likesColor },
      userOptions,
      () => {
         // Update status to let user know options were saved.
         const status = document.getElementById('status');
         status.textContent = 'Options saved.';
         setTimeout(() => {
            status.textContent = '';
         }, 750);
      }
   );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
   chrome.storage.sync.get(
      // { favoriteColor: 'red', likesColor: true },
      {
         salt: {label: "salt", option: "indifferent"}, 
         sugar: {label: "sugar", option: "indifferent"}, 
         gluten: {label: "gluten", option: "indifferent"},
         lactose: {label: "lactose", option: "indifferent"},
         eggs: {label: "eggs", option: "indifferent"},
         fish: {label: "fish", option: "indifferent"},
         soy: {label: "soy", option: "indifferent"},
         nuts: {label: "nuts", option: "indifferent"}
      },
      (items) => {
         let itemsKeys = Object.keys(items);
         userOptions = items;
         // console.log(items);
         for (let i = 0; i < keys.length; i++)
            document.getElementById(items[itemsKeys[i]].label).value = items[itemsKeys[i]].option;
      }
   );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);