
  //apply the language values to the content
  document.addEventListener('DOMContentLoaded', () => {
    //skip the lang value in the HTML tag for this example
    let zones = document.querySelectorAll('html [lang]');
    applyStrings(zones);

    let lang = findLocaleMatch();
    const containers = document.querySelectorAll(`html [lang*=${lang}]`);
    containers.forEach( container => {
    container.className = 'lang-match';
})
});

function applyStrings(containers) {
    containers.forEach(container => {
        //find all the elements that have data-key
        let locale = container.getAttribute('lang');
        //console.log('looking inside of ', locale);
        container.querySelectorAll(`[data-key]`).forEach(element => {
            let key = element.getAttribute('data-key');
            // console.log(element);
            // console.log(key);
            let lang = locale.substr(0, 2); //first 2 characters
            if (key) {
                element.textContent = langdata.languages[lang].strings[key];
            }
        });
    })
}

function findLocaleMatch() {
    let keys = Object.keys(langdata.languages); //from our data
    let locales = Intl.getCanonicalLocales(keys); //from our data validated

    let lang = navigator.language; //from browser 
    let locale = Intl.getCanonicalLocales(lang); //from browser validated
    console.log('browser language', lang);
    console.log('locales from data file', locale);

    //find the match for locale inside locales (en-US or nb-NO)
    let langMatch = document.documentElement.getAttribute('lang'); //default
    locales = locales.filter(l => locale == l);
    langMatch = (locales.length > 0) ? locales[0] : langMatch;
    return langMatch;
}

let langdata = {
    "languages": {
        "en": {
            "strings": {
                "discription": "Who writes clean, elegent and efficient code",
                "firstBtn": "View my work",
                "firstLabel": "About me",
                "firstDiscription":"Lorem ipsum dolor sit amet consectetur adipisicing elit Recusandae voluptatibus quia minima inventore Minima quia nihil adipisci vero. Dolorum odio iste vero debitis id, obcaecati aliquam, deleniti natus numquam ipsum delectus vel molestiae similique dicta modi",
                "secondLabel": "Project Category",
                "micProjectsDis":"Projects that i have been working on with .Net Platform",
                "jsProjectsDis":"Websites that i have been making with JS",
                "phpProjectsDis":"Projects that i have been making with PHP",
            
            }
        },
        "nb": {
            "strings": {
                "discription": "Som skriver ren, elegant og effektiv kode",
                "firstBtn": "Se prosjektene mine",
                "firstLabel": "Om meg",
                "firstDiscription":"Lorem ipsum dolor sit amet consectetur adipisicing elit Recusandae voluptatibus quia minima inventore Minima quia nihil adipisci vero. Dolorum odio iste vero debitis id, obcaecati aliquam, deleniti natus numquam ipsum delectus vel molestiae similique dicta modi",
                "secondLabel": "Prosjekt Kategori",
                "micProjectsDis":"Prosjekter som jeg har jobbet på med .Net Platform",
                "jsProjectsDis":"Nettsider som jeg har laget med JS",
                "phpProjectsDis":"Prosjekter som jeg har laget med PHP",

            }
        }
    }
}