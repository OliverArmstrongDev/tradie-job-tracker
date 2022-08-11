# Coding Test

## Requirements
You are required to provide an application that allows a tradie to see their jobs. Jobs have the following information associated with them:
* Unique job identifier.
* Status: one of **"scheduled", "active", "invoicing", “to priced” or “completed”.**
* Creation date and time.
* General information like name and contact details of the client.

The tradie can also make notes for each job. A job can have any number of notes associated with them.

The tradie should be able to:

* Filter and sort the list of jobs.
* Click on a job in the list to view their details and add/edit notes for that job.
* Change the status of a job.

### Notes
1. Construct one part of the application (either font-end or back-end)
2. You may use any programming languages, data store and frameworks you want.
3. Think about all of the supporting code you may need for a professionally built application.

-----

## About my solution:

The application is built using React and Mantine https://mantine.dev (my favourite component library) for the frontend.
And (Firebase) Cloud Firestore for the backend.

### Backend design


![Firestore](https://user-images.githubusercontent.com/99773634/184110657-bd0615a2-0761-42b6-a8d6-ffd299c8ea26.png)

The clients table (document) contains unique ID's (in this case referring to a Tradie's UID e.g. from an Auth provider).
Under that Tradies' UID is a Collection of Clients with identifiers such as 'CUID-100'.
Within the client collection item there is a document containing related contact information and job information (far right section of image).

### Frontend Usage

The application can be viewed here: https://tjt.oliverarmstrongdev.com


![TJT](https://user-images.githubusercontent.com/99773634/184112000-6e0cd3ad-45fc-432b-9e76-6747689d39b3.png)

### Starting with the left sidebar titled "Job List:"
This contains Filter and Sort buttons and the list of jobs for the current Tradie.

The Filter button (funnel) allows you to filter by status type.


![statuses](https://user-images.githubusercontent.com/99773634/184115472-421dee75-bec1-44d9-9899-811a27af6ec1.png)


The Sort button (arrows) allows you to move the new jobs to the top of the list (or not).


![sort](https://user-images.githubusercontent.com/99773634/184115568-c03cdb70-f058-40c5-b987-e333780b471b.png)


Each Job has a single Letter and is also colour coded to help quickly identify the Job Status of each job in the list.
It also contains the job title and Unique job identifier.

![jobitem](https://user-images.githubusercontent.com/99773634/184115846-7da4c860-5ef5-4925-b268-52ea2fea38ad.png)


When you click on a job in the list it loads the job details in the main job card section...

---

### The main job card section: (starting at the top)

![jobcard](https://user-images.githubusercontent.com/99773634/184116226-10af7495-1828-46b9-b6de-c4dbfd3529c7.png)


Has a "Job Status" label and a button with the Job Status and colour correspoding to the status colour.

When you click the button it displays all selectable statuses. When you Click on a different status it changes the status of the job immediately.
The Button text changes to the status name and the colour also changes accordingly.

![jobstatbutton](https://user-images.githubusercontent.com/99773634/184116497-d7b9a7d7-01a6-4fc0-a9e5-50268a8adc10.png)


* Next there is the **unique job identifier** with job title.
* The created date and time.
* The client details with clickable email address and mobile number.

![title](https://user-images.githubusercontent.com/99773634/184116781-33858a61-b839-4eac-abdf-e38751aaabea.png)

-----

The final section is the **notes section**.

![notes2](https://user-images.githubusercontent.com/99773634/184117343-b0dc9698-0a59-401a-9030-9ff6c09e18e8.png)


You can add a new note and it will open a new Richtext editing area (you can also cancel creating the new note).

A note with no text will not save but once you save a new note with text, it saves immediately and is displayed at the bottom of the note trail.

Each note is read-only unless you click on the Edit button - once you click save again the note becomes read-only again.

The delete button... deletes a note from the database.

### Final Comments

The application uses mainly local state with minimal database calls.
For state management I used React Context and a Reducer to manage 99% of the state, with the exception of a one or two of the components for which it didn't make sense to have in global state.

The app subscribes to the firestore database, on load, for realtime data updates - this was mainly so that the notes were added and deleted without having to refresh the page or do some funky re-rendering.





## There are no API keys stored in the config for Firebase, so I'm not sure if this app will run if you clone or download the repo - that's why I made the site live here - https://tjt.oliverarmstrongdev.com




