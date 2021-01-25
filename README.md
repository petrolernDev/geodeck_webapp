# About GeoDeck

![Alt text](logo_light.png?raw=true "GeoDeck")

The goal of the GoDeck project is to eliminate the rigorous setup, the time and the dollar cost, and the complexity of visualizations for scientific Geo Data. Hence, GeoDeck makes the visualization process more productive, scalable and accessible to wider audience. The software is designed for people that do not necessarily have the time or the skill to use conventional software to extract insights from the physics-based analytical workflows which are notoriously time consuming and complicated. To offer maximum simplicity and accessibility, GeoDeck uses web, i.e., it is available as a regular website that users can load in their browsers. To create fast and seamless user experience on the web modern graphics, API exposed in the browser environments are employed. Moreover, since geo data are often much larger than browsers (or even user’s machines) can handle, GeoDeck intelligently and dynamically loads the data which is currently in the view. Our team undertook extensive design effort to make the interaction between scientific variables, spatial and temporal dimensions straightforward and intuitive if not effortless.  

We believe style and simplicity matters every bit as much as the mechanistic rationales. GeoDeck, through its smart sampling mechanism, let users seamlessly perform uncertainty studies on static and dynamic subsurface properties under different operational or computational scenarios. Often, users are one click away to generate many of the popular graphs used in scientific papers and reports e.g., heat maps, isosurfaces, scatterplots, statistics, and etc.  

GeoDeck software is designed to be agnostic to technology on the server-side, i.e., the database and pipeline of streaming the data to the software could be any technology of choice (bring your own backend). This design paradigm (dubbed JAMStack), let GeoDeck to support wide array of data management workflows. It accelerates writing integration to any application programming interface provider such as SMART planned python Flask API.
Finally, GeoDeck has a longer-term vision for scientific data visualization made thorough ever-increasing VR and AR technologies such as Oculus, Google VR and other popular AR/VR Headsets. At GeoDeck, we believe the ultimate immersive experience is only possible by VR and AR and our software is designed and pushed forward to accommodate future XR integration on the web.

## Installation

To get started follow this steps:

1. Install [Node](https://nodejs.org/en/) v12.3.1, [npm](https://www.npmjs.com/get-npm) 6.9.0.
2. Download and open project.
3. Install packages: ```npm i```.
4. Start project locally: ```npm start```. Depending on your system, it may take 15 minutes for the server to start the application.
5. Navigate to http://localhost:3000/ on your browser.
6. Login using `demo` username and `demo` password.

**Note 1: this is just a prototype and not a final software!**
**Note 2: The current version has only been tested on Chrome browser for Screen size of 15"**

## Hardware Requirements

To run GeoDeck, we require the minimum requirements for WebGL which are quite low. Your computer hardware needs to have a minimum of 2 GB system memory and a video graphics card that supports WebGL. It is recommended that you have at least 4 GB of system memory. Your hardware should have a nonmobile graphics card with at least 512 MB of video memory.
