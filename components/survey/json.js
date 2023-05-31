export const json = {
    "title": "Case Information",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "CaseName",
        "title": "Case Name",
        "hideNumber": true,
        "placeholder": "Enter Case Name"
       },
       {
        "type": "text",
        "name": "[[CAUSE NUMBER]]",
        "title": "Case Number",
        "hideNumber": true
       },
       {
        "type": "tagbox",
        "name": "CaseType",
        "title": "Case Type",
        "hideNumber": true,
        "choices": [
         {
          "value": "Item 1",
          "text": "Type 1"
         },
         {
          "value": "Item 2",
          "text": "Type 2"
         },
         {
          "value": "Item 3",
          "text": "Type 3"
         }
        ]
       },
       {
         "type": "text",
         "name": "[[STATE]]",
         "title": "State",
         "hideNumber": true
       },
       {
         "type": "text",
         "name": "[[COUNTY]]",
         "title": "County",
         "hideNumber": true
       },
       {
        "type": "dropdown",
        "name": "StateStatute",
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
        "name": "[[CASE AGENT NAME]]",
        "title": "Officer Full Legal Name",
        "hideNumber": true
       },
       {
        "type": "text",
        "name": "OfficerTitle",
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
        "name": "question8",
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
        "type": "panel",
        "name": "panel1",
        "elements": [
         {
            "type": "datepicker",
            "name": "SearchFrom",
            "inputType": "date",
            "title": "From:",
            "dateFormat": "mm/dd/yy",
            "hideNumber": true
         },
         {
          "type": "datepicker",
          "name": "SearchTo",
          "inputType": "date",
          "title": "To",
          "dateFormat": "mm/dd/yy",
          "startWithNewLine": false,
          "hideNumber": true
         }
        ],
        "title": "Search Time Period"
       },
       {
        "type": "paneldynamic",
        "name": "question12",
        "title": "Case Attachments",
        "hideNumber": true,
        "templateElements": [
         {
          "type": "file",
          "name": "question13",
          "title": "Attach File"
         },
         {
          "type": "dropdown",
          "name": "AttachmentType",
          "startWithNewLine": false,
          "title": "Type",
          "choices": [
           "Item 1",
           "Item 2",
           "Item 3"
          ]
         }
        ]
       },
       {
        "type": "paneldynamic",
        "name": "question10",
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
        "name": "question18",
        "title": "Exact Search Queries",
        "hideNumber": true,
        "templateElements": [
         {
          "type": "text",
          "name": "Query",
          "title": "Search Query"
         }
        ]
       }
      ],
      "title": "Search Warrant Information"
     }
    ],
    "showCompletedPage": false,
    "showTOC": true
   }