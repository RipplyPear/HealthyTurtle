// Object to store the user's options
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

// keys of userOptions
let keys = Object.keys(userOptions);

// Save options to chrome.storage
const saveOptions = () => {
   // For each object inside userOptions the user's choice gets memorised based on 
   // the value of the dropdowns from popup.html
   for (let i = 0; i < keys.length; i++)
      userOptions[keys[i]].option = document.getElementById(userOptions[keys[i]].label).value;
   
   chrome.storage.sync.set(
      userOptions,
      () => {
         // Update status to let user know options were saved
         const status = document.getElementById('status');
         status.textContent = 'Options saved.';
         setTimeout(() => {
            // Delete the notification
            status.textContent = '';
         }, 750);
      }
   );
};

// Restores select box state using the options
// stored in chrome.storage.
const restoreOptions = () => {
   chrome.storage.sync.get(
      // Default values for the userOptions object
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

         // for each item in the object, restore the option in popup.html
         for (let i = 0; i < keys.length; i++)
            document.getElementById(items[itemsKeys[i]].label).value = items[itemsKeys[i]].option;
      }
   );
};

// Restore options as soon as the page has loaded
document.addEventListener('DOMContentLoaded', restoreOptions);

// Save options when the "Save" button is pressed by the user
document.getElementById('save').addEventListener('click', saveOptions);