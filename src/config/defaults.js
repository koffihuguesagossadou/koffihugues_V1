import { retrieveData } from "../funcs/app"

export const gsapConfig = {
    delay: 1.3,
    duration : 2,
    ease: 'power4.out',
    staggerAmount: .5
}


export const dbFiles = {
  me: 'me.json',
  archives: 'archives.json',
  projects: 'projects.json'
}



export const dbConfig = {
  path: "src/data/",
  dns: import.meta.env.MODE === 'development' ? import.meta.env.VITE_URL : import.meta.env.VITE_PROD_URL
}
  

