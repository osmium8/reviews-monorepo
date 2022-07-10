### Live at: https://osmium8.github.io/reviews-monorepo/
###### (Admin panel is not deployed, screenshots are attached)
###### Backend is deployed on heroku so it may take upto 3 seconds to load products.

###### Backend: [Go to Backend Repository](https://github.com/osmium8/reviews-backend)
<img width="703" alt="one" src="https://user-images.githubusercontent.com/18210415/178135519-1d742cf7-6298-40d6-8fcc-f5dc7ddbb237.png">

###### Frontend:
<img width="799" alt="two" src="https://user-images.githubusercontent.com/18210415/178135518-b5fb6953-b30f-48d7-8a53-9939b4c6a66b.png">

###### NX Dependency graph:
<img width="344" alt="dep" src="https://user-images.githubusercontent.com/18210415/178135523-5904e955-2585-4396-83e3-21ebbcc57a09.png">

###### Database design:
<img width="556" alt="db" src="https://user-images.githubusercontent.com/18210415/178135520-7d7854c0-1c4f-4265-bc5d-45cc372a088c.png">

###### AUTH & ADMIN RIGHT:
<img width="916" alt="auth" src="https://user-images.githubusercontent.com/18210415/178135522-7c4449c5-d455-4483-90be-f735205dbea6.png">

### Screenshots:
| description | screenshot |
| ----------- | ---------- |
| Login       |![screely-1657433988629](https://user-images.githubusercontent.com/18210415/178133811-78657a24-3e01-4de6-a691-7546dbf9205e.png)|
| Home        |![screely-1657433871705](https://user-images.githubusercontent.com/18210415/178133742-7de948cd-79e8-47ee-8afe-ab94b0feabb4.png)|
| Product     |![screely-1657434043009](https://user-images.githubusercontent.com/18210415/178133807-edde7e11-646a-4825-a4b1-0b41fdd05bb5.png)|
| All Products |![screely-1657434797273](https://user-images.githubusercontent.com/18210415/178134084-2433983d-92ec-4974-9438-4987b183c9b0.png)|

### Screenshots (Admin panel):
| description | screenshot |
| ----------- | ---------- |
| Review |![screely-1657435621630](https://user-images.githubusercontent.com/18210415/178134578-d9bba650-9ffa-497d-a46b-351826001dd9.png)|
| Users |![screely-1657435948300](https://user-images.githubusercontent.com/18210415/178134494-f8cc27a2-aa20-40b0-ad45-6ba7c2b4bbac.png)|
| Categories |![screely-1657435847824](https://user-images.githubusercontent.com/18210415/178134506-f06b7927-264c-48b5-91df-0a211327f695.png)|
| Products |![screely-1657435710266](https://user-images.githubusercontent.com/18210415/178134515-78d915df-a993-4a40-bcdc-6fb038fa5d30.png)|


### Structure
```
nx-workspace
|
+---apps
|   +---admin
|   +---reviews
|                   
+---backend
|   +---helpers      
|   +---models  
|   +---public\uploads
|   \---routes
|       
+---libs
|   |
|   +---products                  
|   +---reviewslib                 
|   +---ui                    
|   \---users
|                       
+---styles    
```
