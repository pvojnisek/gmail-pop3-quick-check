---
name: Bug report
about: Create a report to help us improve
title: "[BUG]"
labels: bug
assignees: ''

---

name: Bug Report
description: Create a report to help us improve
labels: [bug]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    attributes:
      label: Describe the bug
      description: A clear description of what the bug is
    validations:
      required: true
  - type: input
    attributes:
      label: Browser
      description: Which browser are you using?
    validations:
      required: true
  - type: input
    attributes:
      label: Script Manager
      description: Greasemonkey or Tampermonkey?
    validations:
      required: true
