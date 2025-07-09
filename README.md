
# 🤖 AI Text Humanizer

A powerful web application that transforms AI-generated content into natural, human-sounding text that bypasses AI detection tools while preserving the original meaning and intent.

## ✨ Features

- **Advanced AI Detection Bypass**: Sophisticated algorithms that transform AI-generated content to pass detection tools
- **Preserve Original Meaning**: Core message remains intact while enhancing naturalness
- **User Authentication**: Secure login/signup with Supabase Auth
- **Usage Tracking**: Monitor monthly usage with limits for different user types
- **Premium Tiers**: Standard (5 uses/month) and Premium (unlimited) plans
- **Dark/Light Theme**: Beautiful UI with theme switching
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Processing**: Fast text humanization with loading states

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Backend**: Supabase (Auth, Database, RLS)
- **State Management**: React Query, Context API
- **Icons**: Lucide React
- **Deployment**: Lovable Platform

## 📱 User Types

- **Standard Users**: 5 free humanizations per month, 10,000 character limit
- **Premium Users**: Unlimited humanizations, no character limits
- **Admin Users**: Full access with admin privileges

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-text-humanizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see Database Schema section)
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

The application uses the following Supabase tables:

### Profiles Table
```sql
- id: UUID (Primary Key, references auth.users)
- email: TEXT (User's email)
- full_name: TEXT (User's display name)
- user_type: TEXT (standard/premium/admin)
- monthly_usage_count: INTEGER (Current month usage)
- usage_reset_date: TIMESTAMP (Next reset date)
- avatar_url: TEXT (Profile picture URL)
- website: TEXT (User's website)
```

### Usage Logs Table
```sql
- id: UUID (Primary Key)
- user_id: UUID (References profiles.id)
- characters_used: INTEGER (Characters processed)
- created_at: TIMESTAMP (Usage timestamp)
```

### Payment Proofs Table
```sql
- id: UUID (Primary Key)
- user_id: UUID (References profiles.id)
- transaction_hash: TEXT (Crypto transaction hash)
- amount: DECIMAL (Payment amount)
- currency: TEXT (Payment currency)
- proof_image_url: TEXT (Payment proof image)
- status: TEXT (pending/approved/rejected)
- admin_notes: TEXT (Admin review notes)
```

## 🔐 Authentication Flow

1. **Sign Up**: Users create accounts with email/password
2. **Email Verification**: Optional email confirmation
3. **Profile Creation**: Automatic profile creation via database triggers
4. **Session Management**: Persistent sessions with automatic token refresh
5. **Usage Tracking**: Real-time usage monitoring and limits

## 🎨 UI/UX Features

- **Responsive Navigation**: Clean header with user info and actions
- **Theme Toggle**: Seamless dark/light mode switching
- **Usage Limiter**: Visual progress bars for usage limits
- **Modal System**: Authentication and upgrade modals
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Smooth loading animations and spinners

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Configuration
- **RLS Policies**: Secure row-level security for all tables
- **Auth Triggers**: Automatic profile creation on user signup
- **Storage Policies**: Secure file upload for payment proofs

## 📊 Usage Limits

- **Standard Users**: 5 humanizations/month, 10,000 characters max
- **Premium Users**: Unlimited usage, no character limits
- **Monthly Reset**: Usage counts reset automatically each month

## 🛡️ Security Features

- **Row Level Security**: Database-level access control
- **Authentication Required**: All features require user authentication
- **Input Validation**: Comprehensive client and server-side validation
- **CSRF Protection**: Built-in protection against cross-site attacks

## 🚀 Deployment

The application is deployed on the Lovable platform with:
- **Automatic Builds**: CI/CD pipeline for seamless deployments
- **SSL/HTTPS**: Secure connections with automatic SSL certificates
- **CDN**: Global content delivery for optimal performance
- **Monitoring**: Built-in analytics and error tracking

## 📝 API Integration

The text humanization feature uses advanced AI algorithms to:
- Analyze input text patterns
- Apply natural language transformations
- Preserve original meaning and context
- Generate human-like output text

## 🎯 Future Enhancements

- **Bulk Processing**: Handle multiple texts simultaneously
- **API Access**: RESTful API for developers
- **Export Options**: PDF, Word, and other format exports
- **Team Collaboration**: Shared workspaces and projects
- **Advanced Analytics**: Detailed usage statistics and insights

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README for comprehensive setup instructions
- **Issues**: Report bugs via GitHub Issues
- **Community**: Join our Discord community for support
- **Email**: Contact us at support@aitexthumanizer.com

## 🔗 Links

- [Live Demo](https://your-app-url.lovable.app)
- [Documentation](https://docs.aitexthumanizer.com)
- [Supabase Dashboard](https://app.supabase.com)
- [Lovable Platform](https://lovable.dev)

---

**Built with ❤️ using Lovable - The AI Editor for Web Development**
