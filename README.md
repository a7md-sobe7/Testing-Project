# MedAi Testing Project

A structured end-to-end (E2E) QA testing suite for the **MedAi Medical Appointment System**, built with **Cypress** and **Mochawesome**. The project contains a target web application (Express.js backend + HTML frontend) and a fully configured Cypress test suite with documentation artifacts.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Target Application](#target-application)
- [Test Suite](#test-suite)
- [Test Cases](#test-cases)
- [Requirements Traceability](#requirements-traceability)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running the Tests](#running-the-tests)
- [Test Reports](#test-reports)
- [Test Results](#test-results)
- [Known Issues](#known-issues)

---

## Project Overview

| Property       | Details                              |
|----------------|--------------------------------------|
| Application    | MedAi Medical Appointment System     |
| Test Framework | Cypress 13                           |
| Reporter       | Mochawesome                          |
| Base URL       | `http://127.0.0.1:3000`              |
| Test Scope     | Registration Form, Contact Us Form   |
| Test Type      | E2E (End-to-End) Automated Testing   |

---

## Project Structure

```
testing project/
├── docs/                          # QA documentation
│   ├── Test_Plan.md               # Testing strategy and scope
│   ├── Test_Cases.md              # Detailed test case definitions
│   └── Traceability_Matrix.md     # Requirements-to-test-case mapping
│
├── target-app/                    # The application under test
│   ├── public/
│   │   ├── index.html             # Login page
│   │   └── dashboard.html         # Dashboard page (post-login)
│   ├── server.js                  # Express.js backend server
│   └── package.json
│
└── tests/                         # Cypress test suite
    ├── cypress/
    │   ├── e2e/
    │   │   ├── medai_registration.cy.js   # Registration form tests
    │   │   └── medai_contact.cy.js        # Contact form tests
    │   ├── fixtures/                      # Test data (static files)
    │   ├── support/
    │   │   ├── commands.js                # Custom Cypress commands
    │   │   └── e2e.js                     # Support file entry point
    │   ├── results/                       # Mochawesome JSON reports
    │   │   ├── mochawesome.json
    │   │   ├── mochawesome_001.json
    │   │   ├── mochawesome_002.json
    │   │   └── mochawesome_003.json
    │   └── screenshots/                   # Auto-captured failure screenshots
    ├── cypress.config.js                  # Cypress configuration
    ├── setup-cypress.js                   # Directory scaffolding script
    └── package.json
```

---

## Target Application

The target application is a Node.js/Express web server that serves the MedAi frontend and exposes a REST API.

### Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Middleware:** body-parser, cors
- **Data Storage:** In-memory (no database)

### API Endpoints

| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| POST   | `/api/login`     | Authenticate user             |
| GET    | `/api/rooms`     | Retrieve all rooms            |
| POST   | `/api/rooms`     | Create a new room             |
| PUT    | `/api/rooms/:id` | Update an existing room       |
| DELETE | `/api/rooms/:id` | Delete a room                 |
| GET    | `/api/guests`    | Search/list guest bookings    |

### Default Credentials

| Username | Password        | Role  |
|----------|-----------------|-------|
| admin    | password123     | admin |
| staff    | staffpassword   | staff |

> ⚠️ These are hardcoded in-memory credentials intended **for local testing only**. Do not use in any production environment.

### Default Seed Data

**Rooms:**
| ID  | Type   | Price | Status    |
|-----|--------|-------|-----------|
| 101 | Single | $100  | Available |
| 102 | Double | $150  | Occupied  |
| 201 | Suite  | $300  | Available |

**Bookings:**
| ID | Guest Name  | Room | Check-In   |
|----|-------------|------|------------|
| 1  | John Doe    | 102  | 2025-12-20 |
| 2  | Jane Smith  | 201  | 2025-12-25 |

---

## Test Suite

The Cypress test suite is located in the `tests/` directory and covers two main user-facing flows:

### Test Files

| File                          | Description                             | Test Cases |
|-------------------------------|-----------------------------------------|------------|
| `medai_registration.cy.js`    | Tests for the patient registration form | TC01, TC02 |
| `medai_contact.cy.js`         | Tests for the contact us form           | TC03       |

### Cypress Configuration (`cypress.config.js`)

```js
{
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true
    }
  }
}
```

Reports are output as JSON files in `cypress/results/` and can be merged and converted to HTML using Mochawesome utilities.

---

## Test Cases

### TC01 — Submit Valid Personal Information

| Field         | Value                     |
|---------------|---------------------------|
| **Module**    | Registration              |
| **Priority**  | High                      |
| **Pre-condition** | Application is running |

**Steps:**
1. Navigate to the home page (`/`)
2. Fill in `#name` with a valid full name
3. Select a gender from `#gender`
4. Enter a phone number in `#phone`
5. Enter a date of birth in `#dob`
6. Enter a valid email in `#email`
7. Enter an address in `#address`
8. Click the **Next** button

**Expected Result:** Inputs are accepted and the form advances to the next step (or retains values).

---

### TC02 — Validation: Empty Name Field

| Field         | Value                     |
|---------------|---------------------------|
| **Module**    | Registration              |
| **Priority**  | Medium                    |
| **Pre-condition** | Application is running |

**Steps:**
1. Navigate to the home page (`/`)
2. Leave the `#name` field empty
3. Enter a phone number in `#phone`
4. Click the **Next** button

**Expected Result:** Browser HTML5 validation fires and the `validationMessage` on `#name` is non-empty.

---

### TC03 — Submit Contact Inquiry

| Field         | Value                     |
|---------------|---------------------------|
| **Module**    | Contact Us                |
| **Priority**  | High                      |
| **Pre-condition** | Application is running |

**Steps:**
1. Navigate to the home page (`/`)
2. Scroll to the Contact Us section
3. Fill in `#name` (second occurrence) with a name
4. Enter a phone number in `#Phone`
5. Enter an email in `#mail`
6. Enter a message in `#massege`
7. Click the **Submit** button

**Expected Result:** The form is submitted successfully (button is clickable and no JS errors occur).

> **Note:** The contact form fields use non-standard IDs in the source HTML: `#Phone` (capital P) and `#massege` (typo for "message"). The Cypress tests account for these exactly as they appear in the DOM.

---

## Requirements Traceability

| Requirement ID | Description                              | Test Case(s)             | Status  |
|----------------|------------------------------------------|--------------------------|---------|
| REQ-01         | System shall allow users to register     | TC01, TC02               | Covered |
| REQ-02         | System shall allow submitting inquiries  | TC03                     | Covered |
| REQ-03         | System shall validate form inputs        | TC03 (verification step) | Covered |
| REQ-04         | System shall allow deleting rooms        | TC04                     | Covered |
| REQ-05         | System shall allow searching for guests  | TC05, TC06               | Covered |

> TC04, TC05, and TC06 are documented in the traceability matrix but not yet implemented as Cypress scripts.

---

## Prerequisites

Ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v16 or higher
- npm v8 or higher

---

## Installation

### 1. Install Target App Dependencies

```bash
cd "testing project/target-app"
npm install
```

### 2. Install Test Suite Dependencies

```bash
cd "testing project/tests"
npm install
```

### 3. (Optional) Scaffold Cypress Directories

If the `cypress/` directory structure is missing, run:

```bash
cd "testing project/tests"
node setup-cypress.js
```

---

## Running the Application

The target app must be running before executing any tests.

```bash
cd "testing project/target-app"
node server.js
```

The server will start at: **`http://localhost:3000`**

You should see:
```
Hotel Management System running on http://localhost:3000
```

---

## Running the Tests

With the target application running, open a new terminal and run:

### Headless Mode (CI/CD)

```bash
cd "testing project/tests"
npx cypress run
```

### Interactive Mode (Cypress GUI)

```bash
cd "testing project/tests"
npx cypress open
```

Then select **E2E Testing** and choose a browser to run individual spec files.

---

## Test Reports

Cypress is configured to generate **Mochawesome JSON** reports after each run. Reports are saved to:

```
tests/cypress/results/
```

### Merging Reports

To merge all JSON reports into one:

```bash
cd "testing project/tests"
npx mochawesome-merge cypress/results/*.json > cypress/results/combined.json
```

### Generating HTML Report

```bash
npx marge cypress/results/combined.json --reportDir cypress/results --inline
```

This produces a single `combined.html` file you can open in any browser.


## Documentation

| Document               | Location                          | Description                              |
|------------------------|-----------------------------------|------------------------------------------|
| Test Plan              | `docs/Test_Plan.md`               | Scope, strategy, tools, and deliverables |
| Test Cases             | `docs/Test_Cases.md`              | Step-by-step test case definitions       |
| Traceability Matrix    | `docs/Traceability_Matrix.md`     | Requirements mapped to test cases        |

Author
Ahmad sobeh
ahmadaymansobeh@gmail.com
