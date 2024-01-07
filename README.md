
# AI Based Video Proctoring

This is a comprehensive video proctoring system designed to enhance the integrity of online exams. This web application combines the power of ReactJS for a dynamic and interactive user interface, Django for robust backend functionality, and PostgreSQL as the database solution. The entire project is containerized using Docker for easy deployment and scalability.

## Prerequisites

Since this repository contains files (ML models) >100MB, you may have to install git lfs to correctly clone the large files. For more information on installing and setting up git lfs, check out the [official website](https://git-lfs.com/)

If you want to run the code using Docker, then the only prerequisite required is **Docker**.

In case you want to set up and run the code **manually** without using Docker, ensure you have the following prerequisites installed:

- Node.js and npm
- Python and pip
- PostgreSQL

**Note:** Python 3.8 was used in developing the code. The dependencies may or may not install with other versions of python.



## Setup

### Docker Installation

Install Docker following the instructions on the official [Docker website](https://docs.docker.com/get-docker/).

### Running the Project

- Clone the repository: `git clone https://github.com/BMSCE-Video-Proctoring/Fullstack.git`
- Navigate to the project directory: `cd Fullstack`
- Build Docker containers: `docker-compose build`
- Start the containers: `docker-compose up`
- Access the website in your browser at `http://localhost:3000`

