# Spreadsheets-are-all-you-need Notebooks

Spreadsheets-are-all-you-need Notebooks are what happens when a spreadsheet and a python notebook have an AI powered baby in browser land. 

Learn more at https://spreadsheets-are-all-you-need.ai/one-file-infinite-possibilities-introducing-spreadsheets-are-all-you-need-notebooks/

- [blank.saayn.html](https://github.com/ianand/spreadsheets-are-all-you-need/blob/main/blank.saayn.html): A blank notebook
- [basic-example.saayn.html](https://github.com/ianand/spreadsheets-are-all-you-need/blob/main/examples/basic-example.saayn.html): A simple example of a notebook in action for summarizing a list of orders.
- [more-orders.csv](https://github.com/ianand/spreadsheets-are-all-you-need/blob/main/examples/more-orders.csv): Sample CSV file to use with `basic-example.saayn.html`.
- [interactive.saayn.html](https://github.com/ianand/spreadsheets-are-all-you-need/blob/main/examples/interactive.saayn.html): A simple example of extending a notebook with HTML.
- [fetch-api-example.saayn.html](https://github.com/ianand/spreadsheets-are-all-you-need/blob/main/examples/basic-example.saayn.html): A simple example of a notebook fetching data from a CORS compatible API.

# Spreadsheets-are-all-you-need Excel

Spreadsheets-are-all-you-need Excel implements the forward pass of GPT2 (an ancestor of ChatGPT) entirely in Excel using standard spreadsheet functions.

By using a spreadsheet anyone (even non-developers) can explore and play directly with how a “real” transformer works under the hood with minimal abstractions to get in the way.

Visit [spreadsheets-are-all-you-need.ai](https://spreadsheets-are-all-you-need.ai) for more info

## Download the sheet

The sheet is available as an xlsb (Excel binary) file in the [Releases section](https://github.com/ianand/spreadsheets-are-all-you-need/releases/tag/v0.7.0) of this repo. You should be able to download and run this file in Excel for Mac or PC. 

The file does not use VBA or Macros. However, if you are concerned about safely opening untrusted Excel files you can [disable macros in the Excel Trust Center](https://support.microsoft.com/en-us/office/enable-or-disable-macros-in-microsoft-365-files-12b036fd-d140-4e74-b45e-16fed1a7e5c6) and open the file in [Excel Protected View](https://support.microsoft.com/en-us/office/what-is-protected-view-d6f09ac7-e6b9-4495-8e43-2bbcdbcb6653).
