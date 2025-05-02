# Aquila Cyber Blog 🚀

A cutting-edge cybersecurity community platform built with modern web technologies, fostering knowledge sharing and collaboration in the cybersecurity space.

## 🌟 About the Developer

Hey there! I'm **King Jethro**, a passionate full-stack developer with expertise in:
- Python Data Science
- JavaScript Development
- PHP Development

### 🏆 Notable Projects

1. **[FireUp PHP Framework](https://github.com/kingjethro999/FireUp-Php-Framework)**
   - A revolutionary PHP framework that simplifies web development
   - Features instant API mode, built-in WebSocket support, and AI-powered development
   - Designed to be more efficient than traditional frameworks like Laravel and CodeIgniter

2. **[BEST DeepSeek Chatbot](https://github.com/kingjethro999/BEST)**
   - Advanced AI-powered chatbot built on DeepSeek technology
   - State-of-the-art natural language processing capabilities
   - Customizable and scalable solution for various applications

Check out my portfolio at [jethroportfolio.vercel.app](https://jethroportfolio.vercel.app) to see more of my work!

## 🛡️ About Aquila Cyber Blog

Aquila Cyber Blog is more than just a blogging platform - it's a thriving cybersecurity community where professionals and enthusiasts come together to:

- Share knowledge and insights
- Discuss the latest security trends
- Collaborate on security solutions
- Build a positive, supportive community

### ✨ Key Features

- **Modern Tech Stack**
  - Next.js frontend for blazing-fast performance
  - Node.js backend with Express
  - TypeScript for type safety
  - Styled-components for beautiful UI

- **Community Features**
  - User authentication and authorization
  - Blog post creation and management
  - Comment system for discussions
  - User profiles and customization

- **Security First**
  - JWT-based authentication
  - Secure password handling
  - Protected API endpoints
  - Input validation and sanitization

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- PostgreSQL database

###Installation
Aquilla Cyber Blog is a Community blog where everyone can express themselves and their common interest

##Prerequisites#
You'll need to have Node >=12.20.0, Yarn, and MongoDB installed and running on your machine.

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aquilablog.git
cd aquilablog
```

This command will clone the repo inside the current folder. In that directory, it will generate an initial project and install dependencies.

Once the installation is done, you can run the app locally.

###RUN IT 
```bash
cd my-app
yarn dev
```

Then open 
``` bash 
http://localhost:3000 
``` 
to see your app.

###Next steps #
Although these steps are enough to create an Orca app and run it locally, you'll need to create an admin user, configure CDN, and an Email service to use all the Orca's features. The next Configuration section will walk you through all of it.

###Configuration
In this section, we'll create an admin user that has privileges for managing community channels, community branding, users, and more.

Plus, integrating Cloudinary CDN for hosting images, Gmail for sending emails, and configuring Google Analytics for tracking key metrics.

Creating a Super Admin user#
You can create a super admin user by running the following command from the root of the project.

``` bash
yarn create-super-admin your@email.com
```
Replace your@email.com with your real email address because, on that address, you'll receive notifications when someone follows you, sends you a message, etc.

By default, the newly created user's password is orcaorca. So you can log in to the app by providing the email address you've used for creating an admin user and password orcaorca.

###CDN Integration#
All user-uploaded files: profile and cover pictures, post images, and community logo are uploaded to Cloudinary CDN for faster content delivery.

info 
Cloudinary does not require credit card information and provides a reasonably good free plan.

After creating an account on Cloudinary, grab the Cloud name, API Key, and API Secret from its dashboard and fill in the corresponding environment variables in the packages/api/.env file

```
API_PORT=4000
API_URL=http://localhost:4000
NODE_ENV=development

SECRET=WriteYourSecret

FRONTEND_URL=http://localhost:3000

MONGO_URL=mongodb://localhost/orca

CLOUDINARY_CLOUD_NAME=cloudinary_name
CLOUDINARY_API_KEY=clodinary_api_key
CLOUDINARY_SECRET=cloudinary_secret

GMAIL_SMTP_USER=your_personal_gmail
GMAIL_APP_PASSWORD=app_password_from_google_account_2fa_security_settings

GITHUB_CLIENT_ID=your_google_client_id
GITHUB_CLIENT_SECRET=your_google_client_secret

FACEBOOK_APP_ID=facebooke_app_id
FACEBOOK_APP_SECRET=facebook_app_secret

# GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
# GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

###Google Analytics#
Google Analytics is already configured in Aquila blog. You just need to update the GOOGLE_ANALYTICS_ID in the Frontend's config file.

packages/frontend/utils/config.ts
```
GOOGLE_ANALYTICS_ID: 'YOUR TRACKING OR MEASUREMENT ID IN HERE',
```

## 🏗️ Project Structure

```
aquilablog/
├── .husky/                    # Git hooks for pre-commit checks
├── .prettierrc               # Prettier configuration for code formatting
├── lerna.json                # Lerna configuration for monorepo management
├── package.json              # Root package.json with shared dependencies
├── pm2.config.js             # PM2 process manager configuration
└── packages/                 # Main packages directory
    ├── api/                  # Backend API package
    │   ├── .env             # API environment variables
    │   ├── .eslintrc        # ESLint configuration
    │   ├── createSuperAdmin.js  # Script for creating super admin
    │   ├── package.json     # API dependencies
    │   ├── tsconfig.json    # TypeScript configuration
    │   └── src/             # Source code
    │       ├── constants/   # Shared constants
    │       ├── controllers/ # API controllers
    │       ├── db/          # Database related code
    │       ├── models/      # Database models
    │       ├── utils/       # Utility functions
    │       ├── authentication.ts  # Auth configuration
    │       ├── index.ts     # API entry point
    │       ├── routes.ts    # API routes
    │       └── socket.ts    # Socket.io configuration
    └── frontend/            # Frontend Next.js application
        ├── components/      # React components
        ├── constants/       # Frontend constants
        ├── pages/          # Next.js pages
        ├── public/         # Static assets
        ├── store/          # Redux store
        ├── utils/          # Utility functions
        ├── .eslintrc.json  # ESLint configuration
        ├── package.json    # Frontend dependencies
        ├── theme.ts        # Styled-components theme
        └── tsconfig.json   # TypeScript configuration
```

### Key Files and Their Purposes

- **.husky/** - Git hooks for checking TypeScript and ESLint errors before committing
- **.prettierrc** - Prettier configuration for consistent code formatting
- **lerna.json** - Lerna configuration for managing multiple packages
- **package.json** - Root package.json with shared development dependencies
- **pm2.config.js** - PM2 configuration for production deployment
- **packages/api/** - Express backend API
  - **.env** - API environment variables
  - **src/authentication.ts** - Passport.js authentication setup
  - **src/controllers/** - API route handlers
  - **src/models/** - Mongoose models
  - **src/routes.ts** - API route definitions
- **packages/frontend/** - Next.js frontend application
  - **components/** - Reusable React components
  - **pages/** - Next.js page components
  - **store/** - Redux store implementation
  - **theme.ts** - Styled-components theme configuration

## 🔧 Built With

- [Next.js](https://nextjs.org/) - React framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Styled-components](https://styled-components.com/) - CSS-in-JS
- [PostgreSQL](https://www.postgresql.org/) - Database
- [JWT](https://jwt.io/) - Authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

King Jethro
- Portfolio: [jethroportfolio.vercel.app](https://jethroportfolio.vercel.app)
- GitHub: [@kingjethro999](https://github.com/kingjethro999)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the cybersecurity community for their valuable insights
- Inspired by the need for a positive, collaborative space in cybersecurity
