# Lendi Technical Assignment - Future Improvements

## Typescript / NestJS

Typescript would be a great improvement to this application. By enforcing types across the application we could reduce
errors by ensuring predictability across our variables and function parameters. Using typescript can also speed up
development as having types provides type-hinting reducing the need to look up what variable values and function
calls might be and improving developer experience.

As this was a new application I would also have recommended before development started that we consider NestJS as our
framework over Express. Although they both run on Express (or Fastify) under the hood, NestJS provides a lot of
abstraction enabling cleaner, modular and testable code which would be useful if this application grew larger and 
more complex.

## Migrations

In order to keep this application simple I used the sync method from Sequelise to ensure the database had the correct
schema. Before this application went to production this would need to be swapped out to use migrations so that the
database schema could be updated and maintained without causing data loss.

## Authentication

As this API is storing personal and sensitive information about loan applicants it would almost certainly require
an authentication layer to ensure it cannot be retrieved by users who are not authorized to access it. Alternatively if
this was deployed as a microservice and was only available from within the internal network of a larger system you 
may be able to provide authentication and authorization instead at the API gateway level and leave the application as is. 

## Pagination + Filtering

We currently have no pagination or filtering on our GET requests (specifically the findAll endpoint). This would cause
slow load times as our database grew as it would be attempting to return all applications on every request. In order to
implement pagination we would likely need to change the response type for the GET /applications request too to provide
useable next / previous information to render out pagination elements on the page.

The ability to filter applications could have a big benefit depending on the usage of our API too by allowing end-users
to search specifically for certain types of applications.

## Validation

Currently our API is returning JSON responses however our validation is returning HTML error messages. Depending on
how our API would be used converting the error messages into JSON too would help a front-end developer use those errors
to display the correct feedback to the end users.

Our validation is also currently limited by only displaying the first error and not all errors from the request. This
could result in a frustrating user experience where the user has to continually submit their application fixing issues
individually until they have resolved all their issues.

## More testing

Currently we only have high level integration tests for the application. This is probably okay for this application as
it stands as the API is just performing very simple CRUD operations. However is the logic became more complicated it
would be beneficial to drop down a level and add unit tests to the individual functions at the service or database layer.

Would also be good to add more edge-case tests to cover the various validation errors to ensure that changes to our 
swagger specification don't introduce bugs further down the road.

## .env & configuration

In order to give you a working codebase I have removed .env from the .gitignore file. In a real repository I wouldn't 
commit and env or configuration files to ensure any secrets aren't potentially leaked out.
