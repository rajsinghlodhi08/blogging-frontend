# Blogging Platform - Angular

This is a blogging platform built using **Angular**. The application allows users (authors and admins) to create, edit, and delete blog posts. Visitors can view and read posts. The platform includes various features for user authentication, content management, and responsive design.

## Features

### Frontend (Angular)

#### Task 1: Blog Listing Page
- **Responsive Design**: A Blog Listing Page that displays all blog posts in a user-friendly format.
- **Post Previews**: Each post shows a brief preview including the title, author, and a snippet of the content.
- **Pagination**: Implements pagination to fetch and display a limited number of posts per page (e.g., 10 posts).
- **Search Functionality**: Allows users to filter blog posts by title or tags for easy navigation.

#### Task 2: Blog Details Page
- **Full Content Display**: A Blog Details Page that presents the complete content of a blog post, including the author, tags, and number of views.
- **View Count**: Functionality to increment the view count each time a blog post is viewed, allowing authors to see how many times their posts have been accessed.

#### Task 3: Create & Edit Blog Post
- **Create Blog Post**: Authenticated users (authors) can write and publish new blog posts.
- **Edit Blog Post**: Authors or admins can update existing blog posts to ensure content accuracy.
- **Restricted Editing Options**: Only the author of a post or an admin can see the options to edit or delete a post.

#### Task 4: User Authentication
- **Login Page**: A dedicated Login Page where users can authenticate themselves using a JWT (JSON Web Token).
- **Conditional UI Elements**: The "Create Blog Post" button is displayed only for logged-in users.
- **Access Control**: Non-authenticated users can only view blog posts; they are restricted from creating, editing, or deleting content.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` for various parts of the project.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `--prod` flag for a production build.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute end-to-end tests via a platform of your choice. Make sure to add a package that implements end-to-end testing capabilities.

## Form Validation

The project includes form validation on blog post creation and editing:
- Title: Required field.
- Content: Minimum character requirement (adjust based on your needs).
- Validation feedback is displayed in real-time as users type.

## Role-Based Access Control

- **Admins**: Full access to create, edit, and delete any blog post.
- **Authors**: Can create and edit their own posts.
- **Visitors**: Can only view and read blog posts.

## Further Help

To get more help on Angular CLI, use `ng help` or refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

### Contact

For any queries or support, please reach out:

- Email: your-email@example.com
- GitHub: [yourusername](https://github.com/yourusername)
