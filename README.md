# QA_Engineer_Assesment
# QA_Assesment

Cypress Configuration

1. Make new directory for parabank automation
- mkdir parabank-automation

2.Change the directory to parabank automation
- cd parabank-automation

3. Download the dependency
- npm init -y

4.Run the cypress
- npx cypress run

Jenkins Configuration

1. Download the Java SDK 21 on Google https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html

2.Copy the SDK Java 21 Path and add it environment variable (Path)

3. Donwload Jenkins.msi file on official jenkins website
https://www.jenkins.io/download/

4. Install and choose the Java SDK 21
5. Enter "Localhost : 8080" on browser to run
6. Retrieve the admin password by copy the path (given on browser) and paste it on file explorer.

Jenkins Internal Configuration

1. Make sure the downlod the browser ( chrome,edge and firebox) for testing platform
2. Add msedge.exe (Microsot Edge File) and chrome.exe(Google Chrome) path to environment variable
3. Download the cypress 
- npx cypress install
