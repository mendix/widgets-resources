# Content data

The purpose of this package is to generate and visualize an overview of a broad set of platform-supported content within the widgets-resources repo.
Each piece of content is described by descriptive fields, such as the name, supported platform(s), and latest version, as well as a set of quality criteria.

This package consists of three parts:

## Generator

The generator crawls the repository's packages and collects the aforementioned data.
The output is written in the form of a json file into the `data` folder in the root of the repository.

It can be invoked by either of the following two commands:
- From the root of the repository: `npm run content-overview:data`
- From the current directory: `npm run generate-data`

## Visualizer

A Next.js app that takes the json file as input, and produces a static site with a visual overview of the data.

During development, the project can be run with the following command:
`npm run dev`
This will start a development server that automatically updates on changes.

During publication, two commands need to be invoked:
- From the root of the repository: `npm run content-overview:site:build` and `npm run content-overview:site:export`
- From the current directory: `npm run build` and `npm run export`

## Workflow

The `UpdateContentOverview` workflow (in `.github/workflows`) runs for every PR and for every merge/push to `master`.
It does two things:
- Generate a new data file, and create a new PR if the contents of the data file have changed.
  If a PR already exists (and hasn't been merged yet), it is updated with the new contents.
- Export the static site using the generated data file.
  The results are uploaded to S3 (except for PRs originating from forked PRs), to a folder based on the git ref (i.e. the PR ref or `master`.
