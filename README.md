# GISTs Browser

The GISTs Browser can be used to browse the gists of a github user.

It allows you to see what kind of files a certain gist contains, to see the contents of the files contained by the gist,
and to see the last people who have forked the gist.

## Running the application

This is an Angular application, and as such, there are a few prerequisites needed in order to run the project, namely:

- nodejs, npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- angular cli: https://angular.io/cli

Now that you have these tools, you're almost ready to rock! There's just a few steps left from browsing gists:

1. Run the command 'npm install' in the root of the project
2. After npm install finished, run 'ng serve'.

You will soon be able to access the application at http://localhost:4200 (by default).

## Detailed functionalities

- Search:
  - This is the main functionality of the browser. It allows its users to search for the gists of a certain github user.
  - The data is represented in a paginated table, which allows browsing through the pages of the numerous gists of the
    user.
  - There is some basic validation done, such as not allowing for empty usernames or going to an invalid page number.
  - In order to fetch the gists for the currently selected user, you can either click the search icon or press the enter
    key.
  - By default, the application will show the gists for the user 'afeld' - chosen randomly, just to display some
    content.
  - If you're up for a good time, I dare you to search for 'rick'.


- Filetypes
  - This one is pretty much eye-candy, but it's also really useful to quickly identify file types.
  - In the table, for each gist, there's a number of tags representing the types of the files contained by the
    respective gist.
  - In the future, these tags could be replaced by badges, or something more visually appealing.


- Forks
  - Maybe, for some people, it's important to see who made the latest forks, and see what cool things they've added to a
    gist! Well, we've got you covered.
  - For each displayed gist, you have the option to see the last three people who have forked the gist.
  - The avatar and the name of the respective user will be shown, and you will be able to click on them and go to their
    fork and see what contribution they brought!
  - An API limitation is that it allows for at most 100 forks to be fetched at a time, since pagination is done on their
    side. For now, only the first page containing those 100 forks will be fetched, but in the future some logic should
    be implemented to fetch all forks.


- Gist contents
  - Of course, what use would this application have if it only allowed us to see the descriptions of the gists?
  - The application will allow its users to click on the description, and it will forward them to the respective gist page.
  - As a nice addition, the users can see directly in the application what files a certain gist contains.
  - As such, one can select a gist and see the name of the files along with their respective tag in a dialog.
  - And since viewing the names of the files is pretty useless, the users can also see the file contents by clicking on the name of the file!

## Important mentions

### Non-functional features

- The application uses OAUTH when making requests to the github API, since by default, with no authorization, the API allows for at most 50-60 requests per hour.
  - With authorization in place, the limit is raised to around 5000 requests per hour, which should be good enough for most users.
  - In order for authorization to work, the users will have to use their own OAUTH token from github.
      - https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token
  - Basic authentication can be used, as well, instead of OAUTH.


- All requests are cached to the disk by default, so that subsequent requests for the same resources will be taken from disk instead of wasting API calls.

### Future enhancements, improvements and optimizations

- restructure the project to use a higher scalable folder structure
- extract business logic from components and templates to services
- improve type safety by creating models for the entities received by the API: Gist, File, etc.
- add a safety feature to deal with very large file contents and not crash the application when displaying the file
- lazy load the forks for a certain gist when it is required by the user instead of loading all of them when a new page of gists is fetched
  - this one is still debatable, since fetching forks when loading a page will result in a better user experience for the users when they reach for the forks, but will waste API calls for forks that may not be viewed
- split the main component into a few smaller ones, for example: search bar component, table component, pagination component
- split the main service into few smaller services, each dealing with its own component
