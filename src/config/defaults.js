export const gsapConfig = {
    delay: 1.3,
    duration : 2,
    ease: 'power4.out',
    staggerAmount: .5
}

export const routes = [
    { 
      path: '/',
      label: 'index',
    }, 
    {
      path: '/about',
      label: 'about page',
    }, 
    {
      path: '/archives',
      label: 'archives page',
    }, 
    {
      path: '/project/:projectName',
      label: 'project page',
    }
  ]
