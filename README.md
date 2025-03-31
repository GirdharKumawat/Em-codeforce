# ExpertMatch

ExpertMatch is a web application designed to streamline the process of finding the perfect expert for interview boards. It leverages AI-powered relevance scores to match candidates with experts based on their skills, experience, and other attributes.

## Features
- **Candidate and Expert Management**: Add, view, and manage candidates and experts.
- **AI-Powered Matching**: Automatically match candidates with experts based on relevance scores.
- **Dashboard**: View statistics like total candidates, experts, and matches.
- **Authentication**: Secure login and signup functionality.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Git (optional)

### Steps to Run Locally
1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd expertmatch
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the following:
      ```
      VITE_API_URL=https://3.110.168.144
      ```

4. **Run the Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
    ```bash
    npm run build
    ```

6. **Preview Production Build**:
    ```bash
    npm run preview
    ```

---

## Project Structure
```
expertmatch/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable components (e.g., Sidebar)
│   ├── config/             # Configuration files (e.g., API URL)
│   ├── pages/              # Page components (e.g., Login, Dashboard)
│   ├── utils/              # Utility functions (e.g., PrivateRoute)
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .gitignore              # Files to ignore in Git
├── package.json            # Project metadata and dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## Setting Up Pages
1. **Landing Page**:
    - File: `src/pages/Landing.jsx`
    - Description: The homepage with a brief introduction and navigation links.

2. **Authentication Pages**:
    - **Login**: `src/pages/Login.jsx`
    - **Signup**: `src/pages/Signup.jsx`
    - **Thanks**: `src/pages/Thanks.jsx`

3. **Dashboard**:
    - File: `src/pages/DashBord.jsx`
    - Description: The main dashboard with a sidebar and nested routes.

4. **Candidate Management**:
    - **Candidate List**: `src/pages/CandidateList.jsx`
    - **Add Candidate**: `src/pages/AddUser.jsx`

5. **Expert Management**:
    - **Expert List**: `src/pages/Expertist.jsx`
    - **Add Expert**: `src/pages/AddUser.jsx`

6. **Profile and Matching**:
    - **Profile**: `src/pages/Profile.jsx`
    - **Score**: `src/pages/Score.jsx`

---

## Key Components
- **Sidebar**: `src/components/Sidebar.jsx`
  - Provides navigation links for the dashboard.
- **PrivateRoute**: `src/utils/PrivateRoute.jsx`
  - Protects routes that require authentication.

---

## API Configuration
- File: `src/config/api.js`
- Update the `API_URL` constant to point to your backend server.

---

## Tailwind CSS
This project uses Tailwind CSS for styling. To customize styles:
1. Modify `src/index.css`.
2. Refer to the [Tailwind CSS Documentation](https://tailwindcss.com/docs).

---

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality.

 

Feel free to contribute or raise issues for improvements!  