# ShikshaSaarthi - AI Copilot for Teachers

**Your intelligent teaching assistant powered by AI**

ShikshaSaarthi is a comprehensive web application that empowers educators with AI-driven tools to create engaging educational content, streamline lesson planning, and enhance teaching productivity.

## 🚀 Features

### 🧠 **Quiz Generator**
- Generate MCQ quizzes instantly with AI
- Customizable difficulty levels and question counts
- Automatic answer explanations
- Export to PDF/DOCX formats

### 📚 **Lesson Planner**  
- Create structured lesson plans with learning objectives
- Include materials, activities, and assessment strategies
- AI-powered content generation for any subject/grade
- Professional formatting ready for classroom use

### 🎤 **Voice to Notes**
- Record voice notes or upload audio files
- AI transcription using Whisper technology
- Convert transcripts to structured lesson materials
- Perfect for capturing teaching ideas on-the-go

### 🎨 **Visual Generator**
- Create educational diagrams and illustrations
- DALL-E powered image generation
- Multiple artistic styles (educational, realistic, cartoon)
- Perfect for visual learners and presentations

### 🤝 **Student Support**
- AI-powered Q&A assistance
- Personalized explanations for student questions
- Adaptive responses based on grade level
- Teaching strategy recommendations

### 📊 **Content Management**
- Save and organize all generated content
- Search and filter your teaching materials
- Export and share resources
- Track teaching productivity metrics

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **UI Components**: Shadcn/ui component library
- **Backend**: Supabase (Database + Edge Functions)
- **AI Integration**: OpenAI GPT, Whisper, DALL-E APIs
- **Styling**: Custom design system with educational theme
- **Routing**: React Router DOM
- **State Management**: TanStack Query

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (optional - fallback modes available)
- Modern web browser with microphone access (for voice features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shiksha-saarthi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Navigate to Settings in the app
   - Add your OpenAI API key securely
   - Configure optional Hugging Face token for fallbacks

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔑 API Key Configuration

### OpenAI API Key (Recommended)
- Enables GPT-powered text generation
- Whisper audio transcription  
- DALL-E image creation
- Add via Settings → API Configuration

### Fallback Options
- **No API Key**: Mock responses demonstrate all features
- **Hugging Face**: Alternative models for text generation
- **Local Transcription**: Browser-based speech recognition

## 📱 Usage Guide

### Creating Your First Quiz
1. Navigate to "Create Quiz" 
2. Enter subject, grade level, and topic
3. Select difficulty and number of questions
4. Click "Generate Quiz" and wait for AI processing
5. Review, edit, and export your quiz

### Building a Lesson Plan
1. Go to "Create Lesson"
2. Specify subject, grade, and lesson topic
3. Set lesson duration (30-90 minutes)
4. Generate comprehensive lesson plan with objectives
5. Download formatted lesson plan

### Voice Notes to Lessons
1. Open "Voice Notes" 
2. Record live audio or upload file
3. AI transcribes speech to text
4. Refine transcription into structured lesson notes
5. Export refined content

### Generating Educational Visuals
1. Access "Generate Visuals"
2. Describe the educational diagram needed
3. Choose visual style and dimensions
4. Generate and download high-quality images
5. Use in presentations and materials

## 🎨 Design System

ShikshaSaarthi features a professional educational design system:

- **Colors**: Deep educational blues, learning greens, warm orange accents
- **Typography**: Clear, readable fonts optimized for educational content
- **Components**: Consistent, accessible UI components
- **Animations**: Subtle, purposeful transitions
- **Responsive**: Mobile-first design for all devices

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel/Netlify
1. Push code to GitHub repository
2. Connect to your deployment platform
3. Set environment variables in platform settings
4. Deploy from main branch

## 📊 Demo Script (2-3 Minutes)

### **Slide 1: Title & Problem**
"ShikshaSaarthi - AI Copilot for Teachers. The problem: Teachers spend 60% of their time on content creation instead of actual teaching."

### **Slide 2: Solution Overview** 
"Our AI-powered platform automates quiz generation, lesson planning, voice transcription, and visual creation - giving teachers their time back."

### **Slide 3: Live Demo**
1. **Generate Quiz** (30 sec): "Science, Grade 8, Photosynthesis" → Show instant MCQ generation
2. **Create Visual** (30 sec): "Solar system diagram" → Display AI-generated educational image  
3. **Voice to Lesson** (45 sec): Record voice note → Show transcription → Refined lesson plan

### **Slide 4: Impact**
"Result: 70% reduction in prep time, engaging AI-generated content, and more time for what matters - teaching students."

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Complete guides in `/docs` folder
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Community support via GitHub Discussions
- **Email**: support@shiksha-saarthi.com

## 🎯 Roadmap

- [ ] Multi-language support for international educators
- [ ] Advanced analytics and learning insights
- [ ] Collaborative lesson planning features  
- [ ] Integration with popular LMS platforms
- [ ] Mobile apps for iOS and Android
- [ ] Offline mode capabilities

---

**Built with ❤️ for educators worldwide**

*Empowering teachers with AI to create better learning experiences for every student.*