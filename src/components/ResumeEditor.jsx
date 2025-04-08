import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import ResumeForm from './ResumeForm';

// 岗位类别列表
const jobCategories = [
  {
    id: 'tech',
    name: '技术研发',
    description: '包含各类技术开发、研究岗位',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/tech.jpg',
    subCategories: [
      { value: 'frontend', name: '前端开发' },
      { value: 'backend', name: '后端开发' },
      { value: 'fullstack', name: '全栈开发' },
      { value: 'android', name: 'Android开发' },
      { value: 'ios', name: 'iOS开发' },
      { value: 'algorithm', name: '算法工程师' },
      { value: 'ai', name: 'AI工程师' },
      { value: 'data', name: '数据工程师' },
      { value: 'devops', name: 'DevOps工程师' },
      { value: 'security', name: '安全工程师' },
      { value: 'test', name: '测试工程师' },
      { value: 'arch', name: '架构师' },
    ]
  },
  {
    id: 'product',
    name: '产品设计',
    description: '包含产品管理、用户研究、交互设计等岗位',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/design.jpg',
    subCategories: [
      { value: 'pm', name: '产品经理' },
      { value: 'po', name: '产品运营' },
      { value: 'ue', name: '用户体验设计师' },
      { value: 'ui', name: 'UI设计师' },
      { value: 'interaction', name: '交互设计师' },
      { value: 'visual', name: '视觉设计师' },
      { value: 'game', name: '游戏策划' },
    ]
  },
  {
    id: 'data',
    name: '数据分析',
    description: '包含数据分析、商业智能、市场研究等岗位',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/data.jpg',
    subCategories: [
      { value: 'data_analysis', name: '数据分析师' },
      { value: 'bi', name: '商业智能分析师' },
      { value: 'market_research', name: '市场研究' },
      { value: 'operation_analysis', name: '运营分析师' },
      { value: 'quant', name: '量化分析师' },
    ]
  },
  {
    id: 'operation',
    name: '运营市场',
    description: '包含各类运营、市场、销售岗位',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/marketing.jpg',
    subCategories: [
      { value: 'content_op', name: '内容运营' },
      { value: 'user_op', name: '用户运营' },
      { value: 'activity_op', name: '活动运营' },
      { value: 'community_op', name: '社区运营' },
      { value: 'marketing', name: '市场营销' },
      { value: 'bd', name: '商务拓展' },
      { value: 'sales', name: '销售' },
    ]
  },
  {
    id: 'management',
    name: '管理岗位',
    description: '包含项目管理、团队管理等岗位',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/managment.jpg',
    subCategories: [
      { value: 'project_manager', name: '项目经理' },
      { value: 'tech_manager', name: '技术经理' },
      { value: 'product_director', name: '产品总监' },
      { value: 'operation_director', name: '运营总监' },
      { value: 'hr', name: 'HR' },
    ]
  },
  {
    id: 'others',
    name: '其他岗位',
    description: '其他专业岗位',
    imageUrl: 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/jobs/other.jpg',
    subCategories: [
      { value: 'finance', name: '财务' },
      { value: 'legal', name: '法务' },
      { value: 'admin', name: '行政' },
      { value: 'customer_service', name: '客服' },
      { value: 'custom', name: '自定义岗位' },
    ]
  }
];

const steps = ['修改示范', '选择职位', '上传简历', '上传职位描述'];

const ResumeEditor = ({ translations }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState(null);
  const [customText, setCustomText] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [progress, setProgress] = useState(0);

  // 处理岗位选择
  const handleJobSelect = (categoryId, jobValue) => {
    setSelectedCategory(categoryId);
    setSelectedJob(jobValue);
    if (jobValue === 'custom') {
      setCustomJob('');
    }
  };

  // 处理文件上传
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // 检查文件类型
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(uploadedFile.type)) {
        setSnackbar({
          open: true,
          message: '请上传 PDF 或 Word 格式的文件',
          severity: 'error'
        });
        return;
      }
      // 检查文件大小（限制为 10MB）
      if (uploadedFile.size > 10 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: '文件大小不能超过 10MB',
          severity: 'error'
        });
        return;
      }
      setFile(uploadedFile);
      setShowResumeForm(false);
      setSnackbar({
        open: true,
        message: '文件上传成功',
        severity: 'success'
      });
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const pollTaskStatus = async (taskId) => {
    try {
      const interval = setInterval(async () => {
        try {
          console.log(`正在查询任务状态，Task ID: ${taskId}`);
          const res = await axios.get(`http://localhost:8000/celery-task-status/${taskId}/`, {
            headers: { 
              'Accept': 'application/json'
            },
            timeout: 10000 // 设置10秒超时
          });

          console.log(`🔍 任务状态: ${res.data.status}`);

          if (res.data.status === "SUCCESS") {
            clearInterval(interval);
            setLoading(false);
            console.log('Task result:', res.data);
            navigate(`/result?html_url=${encodeURIComponent(res.data.result.html_url)}&preview_html_url=${encodeURIComponent(res.data.result.preview_html_url)}&json_resume=${encodeURIComponent(res.data.result.json_resume)}&theme=${encodeURIComponent(res.data.result.theme)}`);
          } else if (res.data.status === "FAILURE") {
            clearInterval(interval);
            setError(`任务失败: ${res.data.error}`);
            setLoading(false);
          } else if (res.data.status === "PROGRESS") {
            setProgress(res.data.progress);
          }
        } catch (error) {
          console.error('轮询请求失败:', error);
          // 不要立即清除 interval，继续尝试
        }
      }, 3000);

      // 设置最大轮询时间（5分钟）
      setTimeout(() => {
        clearInterval(interval);
        if (loading) {
          setError('任务处理超时，请刷新页面重试');
          setLoading(false);
        }
      }, 300000);
    } catch (error) {
      console.error("任务状态查询失败:", error);
      setError("无法获取任务状态");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      const formData = new FormData();
      
      // 添加输入类型标识
      if (file) {
        formData.append('input_type', 'file');
        formData.append('resume_file', file);
      } else {
        formData.append('input_type', 'text');
        formData.append('resume_text', resumeText.trim());
      }
      
      // 添加职位信息
      formData.append('job_category', selectedCategory);
      formData.append('job_position', selectedJob === 'custom' ? customJob : selectedJob);
      formData.append('customized_info', customText.trim());

      console.log('准备发送请求到后端...');
      console.log('请求数据:', {
        input_type: file ? 'file' : 'text',
        job_category: selectedCategory,
        job_position: selectedJob === 'custom' ? customJob : selectedJob,
        customized_info: customText.trim()
      });

      const response = await axios.post('http://localhost:8000/result/', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || status === 202;
        },
        timeout: 30000 // 设置30秒超时
      });

      console.log('收到后端响应:', response);

      if (response.data && response.data.task_id) {
        console.log(`✅ 任务已提交，Task ID: ${response.data.task_id}`);
        // 开始轮询任务状态
        pollTaskStatus(response.data.task_id);
      } else {
        console.error('No task_id in response:', response.data);
        setError('任务提交失败：未获取到任务ID');
        setLoading(false);
      }
    } catch (err) {
      console.error('上传失败，详细错误:', {
        message: err.message,
        code: err.code,
        response: err.response,
        request: err.request
      });
      
      if (err.code === 'ECONNABORTED') {
        setError('请求超时，请检查网络连接');
      } else if (err.response) {
        // 服务器返回了错误状态码
        const errorMessage = err.response.data?.error || err.response.data?.message || '服务器错误';
        setError(`提交失败：${errorMessage}`);
      } else if (err.request) {
        // 请求已发出，但没有收到响应
        console.error('请求已发出但未收到响应，可能是CORS问题或后端服务未启动');
        setError('无法连接到服务器，请确保后端服务已启动且正常运行');
      } else {
        // 请求配置出错
        setError(`提交失败：${err.message}`);
      }
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/');
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  // 渲染不同步骤的内容
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  backgroundColor: 'rgba(2, 8, 22, 0.8)',
                  border: '1px solid rgba(0, 255, 242, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 255, 242, 0.1)',
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#00fff2',
                        mb: 2,
                        fontWeight: 500
                      }}
                    >
                      原始简历
                    </Typography>
                    <Box
                      component="img"
                      src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/cover/origin.jpg"
                      alt="原始简历"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 1,
                        border: '1px solid rgba(0, 255, 242, 0.2)',
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  backgroundColor: 'rgba(2, 8, 22, 0.8)',
                  border: '1px solid rgba(0, 255, 242, 0.3)',
                  boxShadow: '0 0 20px rgba(0, 255, 242, 0.1)',
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#00fff2',
                        mb: 2,
                        fontWeight: 500
                      }}
                    >
                      优化后的简历
                    </Typography>
                    <Box
                      component="img"
                      src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/cover/modified.jpg"
                      alt="优化后的简历"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 1,
                        border: '1px solid rgba(0, 255, 242, 0.2)',
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>选择目标岗位简历模版</Typography>
            <Grid container spacing={2}>
              {jobCategories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      border: selectedCategory === category.id ? '2px solid #00fff2' : '1px solid rgba(0, 255, 242, 0.3)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(2, 8, 22, 0.95)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardMedia 
                      component="img" 
                      image={category.imageUrl} 
                      alt={category.name} 
                      sx={{ 
                        height: 120, 
                        objectFit: 'cover',
                        filter: 'brightness(0.9) contrast(1.1)'
                      }} 
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#00fff2' }}>{category.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {selectedCategory && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>选择具体职位模版</Typography>
                <Grid container spacing={2}>
                  {jobCategories
                  .find(c => c.id === selectedCategory)
                  ?.subCategories.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.value}>
                      <Button
                        fullWidth
                        variant={selectedJob === job.value ? "contained" : "outlined"}
                        onClick={() => handleJobSelect(selectedCategory, job.value)}
                        sx={{
                          borderColor: 'rgba(0, 255, 242, 0.3)',
                          color: selectedJob === job.value ? '#020816' : '#00fff2',
                          height: '48px',
                          '&:hover': {
                            borderColor: 'rgba(0, 255, 242, 0.5)',
                          }
                        }}
                      >
                        {job.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>上传职位JD</Typography>
            <TextField
              label="请粘贴目标职位JD"
              multiline
              rows={8}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: 'rgba(0, 255, 242, 0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(0, 255, 242, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 255, 242, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00fff2',
                  },
                },
              }}
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>上传职位JD</Typography>
            <TextField
              label="请粘贴目标职位JD"
              multiline
              rows={8}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: 'rgba(0, 255, 242, 0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(0, 255, 242, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 255, 242, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00fff2',
                  },
                },
              }}
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#00fff2',
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0, 255, 242, 0.3)',
          }}
        >
          简历智能优化
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" my={4}>
            <CircularProgress sx={{ color: '#00fff2', mb: 2 }} />
            <Typography sx={{ color: '#00fff2' }}>
              {progress > 0 ? `处理进度: ${progress}%` : '正在处理中...'}
            </Typography>
          </Box>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              borderColor: 'rgba(0, 255, 242, 0.5)',
              color: '#00fff2',
              '&:hover': {
                borderColor: '#00fff2',
                backgroundColor: 'rgba(0, 255, 242, 0.1)',
              }
            }}
          >
            上一步
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading || (activeStep === 1 && !selectedJob) || (activeStep === 2 && !file && !resumeText.trim())}
            sx={{
              backgroundColor: '#00fff2',
              color: '#020816',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 242, 0.8)',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(0, 255, 242, 0.3)',
                color: 'rgba(2, 8, 22, 0.5)',
              }
            }}
          >
            {activeStep === steps.length - 1 ? '提交' : '下一步'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResumeEditor;
