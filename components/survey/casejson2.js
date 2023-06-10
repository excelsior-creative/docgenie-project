export const json = {
  "title": "Case Information",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "text",
      "name": "name",
      "title": "Case Name",
      "hideNumber": true,
      "placeholder": "Enter Case Name"
     },
     {
      "type": "text",
      "name": "Case Number",
      "title": "Case Number",
      "hideNumber": true
     },
     {
      "type": "tagbox",
      "name": "Case Type",
      "title": "Case Type",
      "hideNumber": true,
      "choices": [
       {
        "value": "Theft",
        "text": "Theft"
       },
       {
        "value": "Assault",
        "text": "Assault"
       },
       {
        "value": "Fraud",
        "text": "Fraud"
       }
      ]
     },
     {
      "type": "dropdown",
      "name": "Case Status",
      "title": "Case Status",
      "hideNumber": true,
      "choices": [
       {
        "value": "Open",
        "text": "Open"
       },
       {
        "value": "Closed",
        "text": "Closed"
       },
       {
        "value": "Under Investigation",
        "text": "Under Investigation"
       }
      ]
     },
     {
      "type": "comment",
      "name": "Case Description",
      "title": "Case Description",
      "hideNumber": true
     },
     {
      "type": "text",
      "name": "State",
      "title": "State",
      "hideNumber": true
     },
     {
      "type": "text",
      "name": "County",
      "title": "County",
      "hideNumber": true
     },
     {
      "type": "text",
      "name": "Location",
      "title": "Location",
      "hideNumber": true
     },
     {
      "type": "dropdown",
      "name": "State Statute",
      "title": "State Statute",
      "hideNumber": true,
      "choices": [
       {
        "value": "Item 1",
        "text": "State Statute 1"
       },
       {
        "value": "Item 2",
        "text": "State Statute 2"
       },
       {
        "value": "Item 3",
        "text": "State Statute 3"
       }
      ]
     }
    ],
    "title": "Case Information"
   },
   {
    "name": "page2",
    "elements": [
     {
      "type": "text",
      "name": "Officer Name",
      "title": "Officer Full Legal Name",
      "hideNumber": true
     },
     {
      "type": "text",
      "name": "Officer Title",
      "title": "Title",
      "hideNumber": true
     },
     {
      "type": "text",
      "name": "Agency",
      "title": "Agency",
      "hideNumber": true
     },
     {
      "type": "paneldynamic",
      "name": "Category of Experience",
      "title": "Category of Experience",
      "hideNumber": true,
      "templateElements": [
       {
        "type": "text",
        "name": "Experience",
        "title": "Experience"
       },
       {
        "type": "text",
        "name": "ExperienceYears",
        "startWithNewLine": false,
        "title": "Number of Years",
        "inputType": "number"
       }
      ]
     }
    ],
    "title": "Officer Information"
   },
   {
    "name": "page3",
    "elements": [
     {
      "type": "text",
      "name": "Office Name",
      "title": "Name",
      "hideNumber": true
     },
     {
      "type": "text",
      "name": "Contact",
      "title": "Contact",
      "hideNumber": true,
      "inputType": "tel"
     },
     {
      "type": "paneldynamic",
      "name": "question9",
      "title": "Additional Information",
      "hideNumber": true,
      "templateElements": [
       {
        "type": "text",
        "name": "Information",
        "title": "Information"
       }
      ]
     }
    ],
    "title": "Plantiff Information"
   },
   {
    "name": "page4",
    "elements": [
     {
      "type": "paneldynamic",
      "name": "Case Attachments",
      "title": "Case Attachments",
      "hideNumber": true,
      "templateElements": [
       {
        "type": "file",
        "name": "Attachment",
        "title": "Attach File"
       }
      ]
     },
     {
      "type": "paneldynamic",
      "name": "Statement of Facts",
      "title": "Statement of Facts",
      "hideNumber": true,
      "templateElements": [
       {
        "type": "text",
        "name": "Facts",
        "title": "Facts"
       }
      ]
     },
     {
      "type": "paneldynamic",
      "name": "Exact Search Queries",
      "title": "Exact Search Queries",
      "hideNumber": true,
      "templateElements": [
       {
        "type": "text",
        "name": "Query",
        "title": "Search Query"
       }
      ]
     },
     {
      "type": "paneldynamic",
      "name": "Evidence",
      "title": "Evidence",
      "hideNumber": true,
      "templateElements": [
       {
        "type": "text",
        "name": "Evidence",
        "title": "Evidence"
       }
      ]
     }
    ],
    "title": "Search Warrant Information"
   }
  ],
  "showCompletedPage": false,
  "showTOC": true,
  "textUpdateMode": "onTyping",
  "completeText": "Done"
 }