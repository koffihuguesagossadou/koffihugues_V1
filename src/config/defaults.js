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
  projects: 'projects.json',
  routes: 'routes.json'
}



export const dbConfig = {
  path: "src/data/",
  dns: window.location.protocol+'//'+window.location.host+'/' 
}
  

