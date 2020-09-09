# LA Project

Javascript project for my Linear Algebra class - rendering matrix transformations and vector addition.

## Usage

### Prerequisites

Make sure you have the [Nodejs runtime](nodejs.org) installed.

Alternatively, you can modify `frontend/index.html` and remove the `../`s found in the file, then just open it on your web browser.

### Setup

Clone the GitHub repository.

```
git clone https://github.com/priime0/laproject.git
```

Enter the directory where you cloned it to.

```
cd laproject
```

Run the web server.

```
node server/app.js
```

You can now visit `localhost:3000` on your browser to view the site!

### The Webapp

This visualisation application used Vue for rendering all the non-visualisation elements; essentially all the buttons and tools. For the actual visualisation, the THREEjs library was used.
