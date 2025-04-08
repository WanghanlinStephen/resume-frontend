import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import StarCursor from './components/StarCursor';

import Home from './components/Home';
import ResumeEditor from './components/ResumeEditor';
import ResumeResult from './components/ResumeResult';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Vip from './components/Vip'
import PaymentMethod from './components/PaymentMethod';
import SuccessStories from './components/SuccessStories';
import UserGuide from './components/UserGuide';

const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#00fff2', // 霓虹蓝色
      },
      secondary: {
        main: '#08f', // 明亮的蓝色
      },
      background: {
        default: '#020816',
        paper: '#041033',
      },
    },
    typography: {
      fontFamily: '"Orbitron", "Roboto", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            padding: '10px 20px',
            fontSize: '1rem',
            textTransform: 'none',
            background: 'linear-gradient(45deg, rgba(0, 255, 242, 0.1) 30%, rgba(0, 136, 255, 0.1) 90%)',
            border: '1px solid rgba(0, 255, 242, 0.3)',
            color: '#00fff2',
            boxShadow: '0 0 5px rgba(0, 255, 242, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(0, 255, 242, 0.2) 30%, rgba(0, 136, 255, 0.2) 90%)',
              boxShadow: '0 0 10px rgba(0, 255, 242, 0.5)',
              border: '1px solid rgba(0, 255, 242, 0.5)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, rgba(2, 8, 22, 0.95) 0%, rgba(4, 16, 51, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 242, 0.1)',
            boxShadow: '0 0 20px rgba(0, 255, 242, 0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'rgba(2, 8, 22, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 255, 242, 0.1)',
            boxShadow: '0 0 20px rgba(0, 255, 242, 0.1)',
          },
        },
      },
    },
  });

const translations = {
  zh: {
    homeTitle: 'AI驱动的智能简历助手',
    homeDescription: '一键生成针对性简历，让每次投递都是量身定制',
    startButton: '立即优化简历',
    switchLanguage: '切换到 English',
    editorTitle: '简历智能优化',
    resumeTextLabel: '简历内容',
    uploadFile: '上传已有简历',
    selectTheme: '选择目标岗位',
    resumeStepOne: '选择目标岗位',
    resumeStepTwo: '上传或编写简历',
    resumeStepThree: '个性化定制',
    customization: '目标岗位和个性化需求（推荐填写）',
    themeFlat: '软件开发工程师',
    themeProfessional: '算法工程师',
    themeData: '数据分析师',
    themeProduct: '产品经理',
    themeDesign: 'UI/UX设计师',
    themeMarketing: '市场营销',
    submitButton: '开始智能优化',
    resultTitle: '优化后的简历',
    returnToEdit: '继续优化',
    downloadPDF: '导出 PDF',
    downloadWord: '导出 Word',
    pageNotFound: '页面未找到',
    pageNotFoundDescription: '抱歉，您访问的页面不存在',
    backToHome: '返回首页',
    barProof: '成功案例',
    barHelp: '使用指南',
    barSignin: '登录',
    barSignup: '注册',
    signIn: '登录',
    signUp: '注册',
  },
  en: {
    homeTitle: 'AI-Powered Resume Builder',
    homeDescription: 'Create tailored resumes for every job application with AI assistance',
    startButton: 'Optimize My Resume',
    switchLanguage: 'Switch to 中文',
    editorTitle: 'Smart Resume Editor',
    resumeTextLabel: 'Resume Content',
    uploadFile: 'Upload Existing Resume',
    selectTheme: 'Select Target Position',
    resumeStepOne: 'Select Target Position',
    resumeStepTwo: 'Upload or Write Resume',
    resumeStepThree: 'Personalization',
    customization: 'Target Position & Special Requirements (Recommended)',
    themeFlat: 'Software Engineer',
    themeProfessional: 'Algorithm Engineer',
    themeData: 'Data Analyst',
    themeProduct: 'Product Manager',
    themeDesign: 'UI/UX Designer',
    themeMarketing: 'Marketing',
    submitButton: 'Start AI Optimization',
    resultTitle: 'Optimized Resume',
    returnToEdit: 'Continue Editing',
    downloadPDF: 'Export PDF',
    downloadWord: 'Export Word',
    pageNotFound: 'Page Not Found',
    pageNotFoundDescription: 'Sorry, the page you are looking for does not exist',
    backToHome: 'Back to Home',
    barProof: 'Success Stories',
    barHelp: 'User Guide',
    barSignin: 'Sign in',
    barSignup: 'Sign up',
    signIn: 'Sign in',
    signUp: 'Sign up'
  },
};

function App() {
  const [themeMode] = useState('dark');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'zh');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const theme = createAppTheme(themeMode);

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          background: 'url(images/resume-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <StarCursor />
          <Navbar 
            translations={translations[language]} 
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home translations={translations[language]} />} />
              <Route path="/editor" element={<ResumeEditor translations={translations[language]} />} />
              <Route path="/result" element={<ResumeResult translations={translations[language]} />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/user-guide" element={<UserGuide />} />
              <Route path="/signin" element={<SignIn translations={translations[language]} setIsAuthenticated={setIsAuthenticated}/>} />
              <Route path="/signup" element={<SignUp translations={translations[language]} setIsAuthenticated={setIsAuthenticated}/>} />
              <Route path="/profile" element={<Profile translations={translations[language]} />} />
              <Route path="/vip" element={<Vip translations={translations[language]} />} />
              <Route path="/payment_options" element={<PaymentMethod translations={translations[language]} />} />
              <Route path="*" element={<NotFound translations={translations[language]} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;