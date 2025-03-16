# svelte-resume

Love showing off your skills but hate Microsoft Word/Google Docs/LaTeX/*other
document processor here*?

`svelte-resume` let's you write it once in `json` or `yaml`, then format it
automatically using Svelte! Use one of ready-made resume layouts or write your
own using the full power of Svelte and TailwindCSS.

`svelte-resume` proudly uses the [JSON Resume](https://jsonresume.org/schema)
specification, so you only need to write your resume once and then gain access
to the full set of tools built on top of the open schema.

## Usage

Clone the project locally and install dependencies:

```bash
git clone <URL>
cd svelte-resume
npm i
```

You should write your resume to conform to the
[JSON Resume](https://jsonresume.org/schema) specification. You are free to do
so in YAML or JSON format.

You will need to point the project at the location of your resume via the
environment variable `"RESUME_HOME"`. Note this should *not* have a trailing
slash.

.env.local:

```env
`RESUME_HOME="/path/to/your/resume/dir"`
```

Now run the project:

`npm build && npm run preview`

Navigate to the resulting webapp and go the path `/resume` to see all discovered
resumes in the `"RESUME_HOME"` directory.

Click on your entry of choice to see the rendered HTML resume. To convert it to
a pdf, simply print to pdf using `CTRL + p`. On Firefox, be sure to toggle
`Margins` to `None` and toggle off `Print headers and footers`

## Development Setup

Follow the steps described in [Usage](#usage) to install dependencies and setup
the project.

Then, run the dev server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

To write a custom layout, simply write it as a new Svelte component in
`src/lib/resume/layouts/{your-layout}.svelte` and add it to
`src/lib/resume/layouts/index.ts`.
