# SSO(Single Sign On) Implementation using JsonWebToken
* Single Sign On Authentication provides users with a seamless authentication experience when they navigate either through the applications. Once  users log in to one of these applications, they won’t have to enter their credentials again when accessing another one. 
* Single Sign On works by having a central server, which all the applications trust. 
* When you log in for the first time, a cookie gets created on this central server. Then, whenever you try to access a second application, you get redirected to the central server. 
* If you already have a cookie there, you will get redirected directly to the app with a token without login prompts. Which means you’re already logged in.
## Installation
To run this project,
1. Clone the repository
```bash
https://github.com/priyankajainmodi/sso_practice.git
```
2. See 'env_sample' file to view all the parameters which one needs to initialize in '.env' file (add in both the folders i.e 'sso_auth' and 'sso_app')
3. To install all the dependencies, run
```bash
npm install
```
4. Start the server where 'sso_auth' would listen to requests
```bash
cd sso_auth
nodemon index.js
```
5. Open another terminal and start the server for 'sso_app' to listen requests
```bash
cd sso_app
nodemon index.js
```
## Usage
Once the servers start listening on respective ports, hit <http://localhost:{SSO_APP_PORT_NO}/> on browser.

--> logging to 'sso_app' creates a local session

-->logging to 'sso_auth' creates a global session

* If Local session exists, global session must exist i.e if we are logged in to 'sso_app', then we must be necessarily logged in to central service 'sso_auth' (Trying to log in or sign up on 'sso_app' would redirect us on 'sso_auth' for the same.
Once we get authenticated by central service i.e 'sso_auth', we automatically get authenticated to 'sso_app' and also get authorized to resources at 'sso_app')

* If Global session exists, local session does not necessarily exist i.e if we  log out from 'sso_app' , it is not necessary that we would be logged out from central service 'sso_app'

* Global session is destroyed, local session must be destroyed i.e if we log out from central service 'sso_auth', we may automatically get logged out from 'sso_app'

