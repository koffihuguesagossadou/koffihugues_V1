import ligneBisCover from '../assets/images/lignebis/main.webp';
import tnaCover from '../assets/images/tna/main.webp';
import cookincipeCover from '../assets/images/cookincipe/main.webp';
import vmsSmsCover from '../assets/images/vms-sms/main.webp';
import mtvCover from '../assets/images/mtv/main.webp';
import folioV1Cover from '../assets/images/folio-v1/main.webp';

export const projects = [
    
    
    {
        "id": 1,
        "name": "ligne bis",
        "slug": "lignebis",
        "description": [
            "LigneBis, a website directed by even media allowing users to get virtual french number.",
            "very pratical to separate your private life from your professional life",
            "The LigneBis virtual phone number is available without registration, commitment or subscription."
        ],
        "awards": [],
        "link": "https://www.lignebis.fr/",
        "year": 2023,
        "src": "/lignebis",
        "imgs": [0,1,2,3,4,5,6,7],
        "cover" : ligneBisCover,
        "client": "even media",
        "role": "fullstack dev",
        "stacks": ["php", "laravel"]
        
    },

    {
        "id": 2,
        "name": "tna collection",
        "slug": "tna-collection",
        "description": [
            "Discover Tna Collection, shop providing curated gift and event boxes, along with a selection of stylish watches and trendy t-shirts. Elevate every occasion, from Christmas to Ramadan and beyond, with our carefully crafted offerings"
        ],
        "awards": [],
        "link": "",
        "year": 'On going',
        "src": "/tna",
        "cover" : tnaCover,
        "imgs": [0,1,2,3,4,5,6,7,8,9,10,11],
        "client": "tna collection",
        "role": "UI/UX design",
        "stacks": ["figma"]
        
    },

    {
        "id": 3,
        "name": "cookin'cipe",
        "slug": "cookincipe",
        "description": [
            "App listing many african and caribbean food and drinks.",
            "For food-lovers and eaters, you can learn you favorite dish in few minutes."
        ],
        "awards": [],
        "link": "https://www.figma.com/proto/kcl0MPttDcI9nGq3lsflSa?node-id=0-1&mode=design&t=1dxlM8nSVt39xVek-6",
        "year": 2023,
        "src": "/cookincipe",
        "cover" : cookincipeCover,
        "imgs": [0,1,2,3,4,5,6,7],
        "client": "self",
        "role": "ui design",
        "stacks": [ "figma"]
    },

    {
        "id": 4,
        "name": "vms sms",
        "slug": "vms-sms",
        "description": [
            "website directed by even media offering a direct marketing solution in just a few clicks.",
            "No subscription - No commitment."
        ],
        "awards": [],
        "link": "https://www.vms-sms.fr",
        "year": 2023,
        "src": "/vms-sms",
        "cover" : vmsSmsCover,
        "imgs": [0,1,2,3,4,5,6,7],
        "client": "even media",
        "role": "fullstack dev",
        "stacks": ["php", "javascript", "laravel", "git"]
        
    },
    
    {
        "id": 5,
        "name": "mon tchat voyance",
        "slug": "mon-tchat-voyance",
        "description": [
            "An online chat-based psychic provides users to connect with psychics.",
            "users can seek personalized insights and answers to their questions",
            "The chat format allows for real-time interaction between the user and the psychic."
        ],
        "awards": [],
        "link": "https://www.mon-tchat-voyance.fr",
        "year": 2023,
        "src": "/mtv",
        "cover" : mtvCover,
        "imgs": [0,1,2,3,4,5,6,7],
        "client": "even media",
        "role": "fullstack dev",
        "stacks": [ "javascript", "symfony", "bitbucket"]
        
    },

    {
        "id": 6,
        "name": "folio v1",
        "slug": "folio-v1",
        "description": [
            "First version of my portfolio."
        ],
        "awards": [],
        "link": "https://hugueskoffi.vercel.app",
        "year": 2022,
        "src": "/folio-v1",
        "cover" : folioV1Cover,
        "imgs": [0,1,2,3,4,5,6,7],
        "client": "self",
        "role": "frontend dev & motion",
        "stacks": ["react", "js", "vercel"]
        
    }
    
]