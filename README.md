# Kraken-Worlds-Studio
​
## Tabla Endpoints
|Id|Method|Path|Description
|--|--|--|--|
|1|Get|/|Welcome page|
|2|Get|/home|Home Page and Register|
|3|Post|/home|Register (sign up)|
|4|Get|/profile|Profile page|
|5|Put|/profile/edit|Profile page edit (Modal)|
|6|Post|/logout|Logout|
|7|Deltele|Remove card from profile|
|8|Get|/project/new|Project view|
|9|Post|/project/new|Project creation|
|10|Put|/project/project_id|Project edit|
|11|Delete|/project/project_id/delete|Project delete|
|12|Post|/project/project_id/character/new|New Character page|
|13|Delete|/project/project_id/character_id/delete|Delete Character page|
|14|Put|/project/project_id/character_id/edit|Edit Character page|
|15|Get|/project/project_id/character_id|View Character page|
|16|Post|/project/project_id/folder/new|New Tentacle (folder) page|
|17|Delete|/project/project_id/folder_id/delete|Delete Tentacle (folder)page|
|18|Put|/project/project_id/folder_id/edit|Edit Tentacle (folder) page|
|19|Get|/project/project_id/folder_id|View Tentacle (folder Page|
|0|Post|/project/project_id/folder_id/archive/new|New Archive (folder) page|
|21|Delete|/project/project_id/folder_id/archive_id/delete|Delete Archive page|
|2|Put|/project/project_id/folder_id/archive_id/edit|Edit Archive Page|
|23|Get|/project/project_id/folder_id/archive_id|View Archive Page|
|24|Put|/project/project_id/timeline|Edit Timeline|
|25|Get|/project/project_id/timeline|View Timeline|
|26|Put|/project/project_id/glossary|Edit Glossary|
|2|Get|/project/project_id/glossary|View Glossary|
|27|Put|/project/project_id/story|Edit Story|
|29|Get|/project/project_id/story|View Story|
|30|Get|/public/project_id/wiki-elements|View the selected wiki elements|
|31|Get|/public/all-projects|View all the projects|
|32|Get|/public/all-projects/?query|Query selector projects|
​
​
​
**Proceso hasta ahora.**
 
**Pendientes.**
 
## Folder Structure 


**Documentation files**

 ```
.
├── ...                  	
├── src                 	
├── ├── components              
│   ├── index.js              	
|   └── ...
|__
 ```
​
**Components**

 ```
.
├── ...
├── components              
│   ├── Layout             
│   ├── Pages               
│   ├── Shared                          
│   ├── App
|   └── ...               
└── ...
 ```

**Layout**

 ```
.
├── ...
├── Layout                  
│   ├── NavBar              
│   ├── |__ Search Bar                                  
│   ├── Footer
|   |__ ...            
└── ...
 ```
​
**Pages**

 ```
.
├── ...
├── Pages                  			
│   ├── Profile             		
│   ├── └── Vista Perfil      
│   ├── └── Formulario edición perfil (modal)                			            
│   └── └── Vista de carrusel de cards 
|   └── Welcome 
|   └── Home 
|	└── Hero
|	└── About
|	└── Section 3 
|   └── Espacio trabajo (proyecto y creación proyecto)  
|	└── Formularios (hay que repensarlos
|	    └── Formulario creación personaje
|	    └── Formulario creación archivo
|	    └── Formulario creación proyecto
|	    └── Formulario creación herramientas
|	    └── Formulario edición personaje
|	    └── Formulario edición archivo
|	    └── Formulario edición de proyecto
|	    └── Formulario edición de las herramientas
|	    └── Formulario edición glosario
|	└── Vistas
|	    └── Vista de ficha de personaje
|	    └── Vista de archivo
|	    └── Vista de proyecto
|	    └── Vista de las herramientas
|	    └── Vista glosario
|	└── SideBar con árbol de organización
|	└── Editor de texto
|	└── Editor escaleta
|   └── Wiki pública
|	└── Distribución de cards
|	└── Carrusel de proyectos
|   └── Página de búsqueda
|	└── Distribución de cards
|	└── Barra de filtrado y búsqueda
└── ... 

 ```
​
**Shared**

 ```
.
├── ...
├── Shared                 
│   ├── Cards 1(proyectos similares perfil)           
│   ├── Cards 2(proyectos similares wiki pública y perfil)     
│   ├── Botones                            
│   └── Spinner            
└── ...
 ```

 ## Models

 **User model **

 ```
 {
     model: "User",
    username: "username",
    password: "password",
    email: "example@mailito.com",
    bio: "A bio with maximum 200 characters",
    image: "URL image,
    role: ["ADMIN", "AUTHOR", "READER"],
    favProjects: {
        type: [Schema.Types.ObjectId],
        ref: "Project"
    },

 }
 ```
 **Project Model**
 ```
 {
     model: "Project",
    title: "A title",
    Genre: ["Fantasy", "Horror", "Science-Fiction", "Space Opera", "Romance", "Adventure", "Erotic", "FanFiction", "Historical", "Mistery", "Religious/Spiritual", "Satire/Humour", "Thriller/Suspense", "Others (Tell us more in the synopsis)"],
    tagLines: [String],
    type: ["World-Building", "Novel", "Tabletop RPG", "Video Game Script", "Movie/Series Script", "Comic Script", "Short-Stories"],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: false,

 }
 ```
 **Character model**
 ```
 {
     model: "Character",
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    name: "Name1",
    surname: "Surname1 Surname2",
    genre: "Female",
    age: 50,
    background: "A long paragraph",
    rolHistory: "Protagonist",
    occupation: "Writer",
    physicalDescription: [String],
    personality: [String],
    habits: [String],
    notes: "More information",
    isPublic: false
 }
 ```
 **Folder Model**
 ```
 {
  model: "Folder",
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    name: "Folder Name,
    folders: {
        type: [Schema.Types.ObjectId],
        ref: "Folder",
    },
    archives: {
        type: [Schema.Types.ObjectId],
        ref: "Archive",
    },
    isPublic: false,
 }
 ```

 **Archive Model**
 ```
 {
    model:  "Archive",
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    name: "Archive Name",
    relatedArchives: {
        type: [Schema.Types.ObjectId],
        ref: "Archive",
        required: true,
    },
    description: "A lot of paragraphs",
    isPublic:  false
 }