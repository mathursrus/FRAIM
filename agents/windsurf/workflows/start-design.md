---
description: Start working on the issue
auto_execution_mode: 3
---

Step 1: Ask for {issue_number} (and optional {slug})

Step 2: Label the issue 'phase:design' (GitHub Action will automatically create a branch, label the issue `status:wip`, create a draft PR)

Step 3: Using GitHub MCP, wait for the branch to get created, then do a checkout to start your work.

*** IMPORTANT IF YOU ARE WORKING LOCALLY **** switch into your branch and ensure you work in your own folder. 

Step 4: Do your work either remotely or locally as defined by the user. If unsure, ask the user. Once sure, let the user know.

Step 5: Your work entails the following

 - Create docs/rfcs/{issue_number}-{slug}.md.  

 - If the issue requires a small fix or bug fix, use this template - docs/rfcs/BUG-TEMPLATE.md 

 - If the issue requires major changes, use this template - docs/rfcs/RFC-TEMPLATE.md 

 - When ready for review, flip issue to 'status:needs-review' and remove 'status:wip'

Step 6: If workflow actions or reviewer feedback indicates more work is needed, ensure the issue is set back to `status:wip` and continue working as above.