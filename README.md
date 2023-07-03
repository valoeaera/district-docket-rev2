# District Docket Rev2

District Docket rev2 is a project which builds and improves upon my college senior capstone project. That project was created for the Chamber Partnership in Dekalb County, Indiana. There will be a couple main focuses of this improvement effort:

1. Set-up a proper dev & build process
    - Dev Server:
        - In rev 1, a PHP Server VS Code extension was used for development
        - Rev 2 will use a Vite development server and NPM-managed dependencies
    - Build Process:
        - In rev 1, we had no build process because we were still learning
        - Rev 2 is currently undetermined
    - Release Process:
        - In rev 1, we handed the Git repository over to the Partnership when we were done
        - Rev 2 is currently undetermined
1. Migrate frontend from "Pure" JS to REACT + TS
    - In rev1, the frontend was largely built by one of my groupmates and myself
        - I had much less experience with REACT than I do now and no other members knew REACT
        - We utilized `if (screenWidth < 700px) {}` logic to change between mobile and desktop view
    - Rev 2 will have:
        - Easier UI development
        - More comprehensive and consistent state management & user experience
        - Possible use of existing NPM packages for creating mobile / reactive views
1. Create a backend to interact with the database directly, this is hit by the frontend through GET and POST requests.
    - In rev1, the "backend" was just a different JS file that still ran in the browser.
        - This leaks secrets
        - Bad for performance
        - Means that dependencies cannot be managed with NPM and must be static-URL-imported
   - Rev 2 will use a separate Express server to handle requests from the frontend and interface with the database. This means:
        - Authentication
        - CRUD functions
        - Admin functions like Approval

## Frontend

### Views

Currently, there are five "views" that the user can interact with:

Looking at events:

- [ ] Views display events tagged as approved in the database
- [ ] Events will display in "cards" or "chips" that contain cursory information about them
- [ ] Clicking on an event card or chip (for month view) beings up a modal with all of the event's information.
- [ ] From the modal, a the event organizer can choose to edit the event and submit the changes for admin approval
- [ ] Event organizers can also cancel their events from this view without admin approval
- [ ] Responsive/mobile design

1. Event List: This view will display all of the *approved* events in the database in chronological order by default
    - Features:
        - [ ] Filtering by tags, name, host organization, city, under some price, etc.
        - [ ] Filter by events that the current user created
        - [ ] Events are color-coded based on tags
        - [ ] Sort by other factors such as alphabetical by name, lowest -> highest price, etc.
        - [ ] Event cards display with thumbnail images uploaded by the event organizer
1. Month View: This view will display the *approved* events on a typical calendar month
    - Features:
        - [ ] User can use arrow buttons to navigate between months
        - [ ] User can also "Jump to" current month or an inputted month
1. Week View: same as Month, but for a calendar week
    - Features:
        - [ ] See above
        - [ ] See above

Submitting an event:

1. Event Input: This view will also a user to fill out an event's information and submit it for approval by an admin
    - Features:
        - [x] Section for general event information such as name, time, and cost
        - [ ] Ability to create recurring events
        - [x] Section for location information such as Venue Address and name options
        - [ ] State is a dropdown from all 50 states that will autocomplete as the user types
        - [ ] Section for contact information with a dropdown that populates with organizations in the database
        - [ ] Once an organization is selected from the dropdown, a second dropdown showing the names of people at the organization will appear. These are tied to contact information.
        - [x] Section for an event description.
        - [ ] Section to select tags (maybe replace with a multiselect)
        - [ ] Section to upload a thumbnail image
        - [ ] Submit button that adds the event to the database as an "Unapproved event"

Administrators:

1. Admin: This view will contain all of the administrative functions of the site
    - Event Approval
        - [ ] The Administrator will see a list of pending events that have been submitted by users
        - [ ] The admin can open the same event modal as from other pages, but they will see "Approve Event", "Decline Event", and "Request Changes" buttons
    - Managing Organizations
        - [ ] Admin can CRUD an organization and its information, including people and their info
    -  Non-admin users will instead see
        - [ ] a list of all of their pending events, along with any events an Admin has denied or requested changes on
        - [ ] An ability to open, modify and resubmit event which an admin has requested changes on

### Components

WIP

- Input components like
    - Dropdowns
    - Checkboxes
    - Text inputs
    - buttons
    - etc.
- UI components like
    - event cards
    - event chips
    - navbar
    - event modal
    - etc

## Backend

### Endpoints

WIP

### Database

WIP

## Development Setup

1. `git clone`
1. `cd district-docket-rev2`
1. `npm ci`

Lerna has been configured in this project in the following way (if no configuration has been changed).

| NPM script | Frontend                                      | Backend                                          |
| ---------- | --------------------------------------------- | ------------------------------------------------ |
| `dev`      | Local Vite server started at `localhost:5173` | Local Express server started at `localhost:3005` |
| `build`    | Compile with `tsc` and `vite build`           | Not yet configured                               |
