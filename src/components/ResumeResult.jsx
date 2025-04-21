import React, { useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResumeResult = ({ translations }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const previewUrl = queryParams.get('preview_html_url'); // 🔥 预览 HTML URL
  const htmlUrl = queryParams.get('html_url'); // 🔥 真实 HTML 文件 URL
  const jsonResume = queryParams.get('json_resume');
  const theme = queryParams.get('theme');
  console.log(previewUrl)
  console.log(htmlUrl)
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingWord, setLoadingWord] = useState(false);

  // **🔥 处理 PDF 下载**
  const handleDownloadPDF = async () => {
    try {
      setLoadingPDF(true);
      const formData = new FormData();
      formData.append('json_resume', JSON.stringify(jsonResume));
      formData.append('theme', theme);
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   alert('请先登录再下载简历');
      //   setLoadingPDF(false);
      //   return;
      // }
      const response = await axios.post('https://www.auto-resume.site/download_pdf/', formData, {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoadingPDF(false);

      if (response.data.pdf_url) {
        window.open(response.data.pdf_url, '_blank'); // 🔥 在新标签页打开 PDF 下载链接
      } else {
        alert('下载失败，请稍后重试');
      }
    } catch (err) {
      console.error('PDF 下载失败:', err);
      alert('PDF 生成失败，请检查网络');
      setLoadingPDF(false);
    }
  };

  // 处理 Word 下载
  const handleDownloadWord = async () => {
    try {
      setLoadingWord(true);
      const formData = new FormData();
      formData.append('json_resume', JSON.stringify(jsonResume));
      formData.append('theme', theme);
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   alert('请先登录再下载简历');
      //   setLoadingWord(false);
      //   return;
      // }
      console.log('开始下载 Word，发送数据:', {
        json_resume: jsonResume,
        theme: theme
      });
      
      const response = await axios.post('https://www.auto-resume.site/download_word/', formData, {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoadingWord(false);

      console.log('Word 下载响应:', response.data);

      if (response.data.word_url) {
        console.log('准备打开 Word 下载链接:', response.data.word_url);
        // 尝试使用 window.location.href 直接跳转
        window.location.href = response.data.word_url;
        // 如果上面的方法不行，尝试使用 window.open
        // window.open(response.data.word_url, '_blank');
        console.log("下载 Word 成功");
      } else {
        console.error('Word URL 不存在:', response.data);
        alert('下载失败，请稍后重试');
      }
    } catch (err) {
      console.error('Word 下载失败:', err);
      console.error('错误详情:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      alert('Word 生成失败，请检查网络');
      setLoadingWord(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#00fff2',
            textAlign: 'center',
            mb: 2,
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0, 255, 242, 0.3)',
          }}
        >
          {translations.resultTitle}
        </Typography>
      </Box>

      {/* 🔥 直接加载后端返回的 HTML 文件 */}
      <Box component="iframe" src={previewUrl} width="100%" height="800px" title="简历预览" sx={{ border: 'none' }} />

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Button component={Link} to="/editor" variant="contained" color="primary">
          {translations.returnToEdit}
        </Button>

        {/* PDF 下载按钮 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadPDF}
          disabled={loadingPDF}
          sx={{
            backgroundColor: '#00fff2',
            color: '#020816',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 242, 0.8)',
            },
          }}
        >
          {loadingPDF ? <CircularProgress size={24} /> : '下载 PDF'}
        </Button>

        {/* Word 下载按钮 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadWord}
          disabled={loadingWord}
          sx={{
            backgroundColor: '#00fff2',
            color: '#020816',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 242, 0.8)',
            },
          }}
        >
          {loadingWord ? <CircularProgress size={24} /> : '下载 Word'}
        </Button>
      </Box>
    </Container>
  );
};

export default ResumeResult;
