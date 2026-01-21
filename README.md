# True Opinion - Medical Second Opinion Platform

A medical consultation portal for connecting patients with medical specialists for second opinions. Built with React, Vite, Tailwind CSS and ready for Spring Boot backend integration.

## 🚀 Features

- **User Authentication**: Secure login/registration for patients, doctors, and admins
- **Role-based Access**: Different dashboards and permissions for each user type
- **Medical Consultations**: Upload medical reports and get expert opinions
- **Payment Integration**: Ready for Razorpay and Stripe integration
- **Real-time Notifications**: In-app notification system
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance Optimized**: Code splitting and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: React Query for server state
- **Routing**: React Router DOM
- **Forms**: Formik with Yup validation
- **UI Components**: Heroicons, React Toastify
- **File Handling**: React Dropzone, React PDF
- **Security**: DOMPurify for XSS prevention

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd true-opinion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Payment Gateway Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_MOCK_API=true
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Common/         # Shared components (Button, Modal, etc.)
│   ├── Layout/         # Layout components (Header, Sidebar)
│   └── Patient/        # Patient-specific components
├── pages/              # Page components
│   ├── Admin/          # Admin dashboard pages
│   ├── Doctor/         # Doctor dashboard pages
│   ├── Patient/        # Patient dashboard pages
│   └── Public/         # Public pages (Landing, About, etc.)
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── contexts/           # React contexts (Auth, etc.)
├── utils/              # Utility functions
├── data/               # Mock data for development
└── config/             # Configuration constants
```

## 🔌 API Integration

The application is designed for easy integration with a Spring Boot backend:

### Current State
- Mock API services with realistic data
- Centralized API routing in `src/services/api.js`
- Error handling and retry logic
- Authentication token management

### Backend Integration Steps

1. **Update API Configuration**
   ```javascript
   // In src/config/constants.js
   export const API_CONFIG = {
     baseURL: 'http://localhost:8080/api',
     timeout: 10000,
   };
   ```

2. **Replace Mock Services**
   ```javascript
   // In src/services/api.js, uncomment real API calls:
   const response = await axios({
     method,
     url: `${this.baseURL}${url}`,
     data,
     headers: this.getAuthHeaders(),
   });
   ```

3. **Update Authentication**
   ```javascript
   // Real JWT token handling in AuthContext
   const login = async (email, password) => {
     const response = await authService.login(email, password);
     localStorage.setItem('token', response.token);
     setUser(response.user);
   };
   ```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🔒 Security Features

- **Input Sanitization**: DOMPurify for XSS prevention
- **Authentication**: JWT token-based auth
- **Authorization**: Role-based access control
- **Error Handling**: Comprehensive error management
- **File Upload**: Secure file handling with size/type validation

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Loading States**: Comprehensive loading indicators
- **Error Boundaries**: Graceful error handling
- **Toast Notifications**: User feedback system
- **Accessibility**: ARIA labels and keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@trueopinion.com or create an issue in the repository.
