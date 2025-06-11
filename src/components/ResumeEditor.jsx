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
  CircularProgress,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ResumeForm from './ResumeForm';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

  // 添加简历表单状态
  const [formData, setFormData] = useState({
    basicInfo: {
      name: '',
      phone: '',
      email: '',
      jobIntention: ''
    },
    education: [{ school: '', major: '', degree: '', startDate: null, endDate: null }],
    workExperience: [{ company: '', position: '', startDate: null, endDate: null, description: '' }],
    projectExperience: [{ name: '', role: '', startDate: null, endDate: null, description: '' }],
    skills: [{ skill: '', level: '' }]
  });

  // 处理表单输入变化
  const handleFormChange = (section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (Array.isArray(prev[section])) {
        newData[section] = [...prev[section]];
        newData[section][index] = { ...newData[section][index], [field]: value };
      } else {
        newData[section] = { ...prev[section], [field]: value };
      }
      return newData;
    });
  };

  // 添加新的表单项
  const addFormItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], getEmptyItem(section)]
    }));
  };

  // 删除表单项
  const removeFormItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // 获取空表单项
  const getEmptyItem = (section) => {
    switch (section) {
      case 'education':
        return { school: '', major: '', degree: '', startDate: null, endDate: null };
      case 'workExperience':
        return { company: '', position: '', startDate: null, endDate: null, description: '' };
      case 'projectExperience':
        return { name: '', role: '', startDate: null, endDate: null, description: '' };
      case 'skills':
        return { skill: '', level: '' };
      default:
        return {};
    }
  };

  // 处理表单提交
  const handleFormSubmit = () => {
    // 将表单数据转换为JSON格式
    const resumeJson = {
      basicInfo: formData.basicInfo,
      education: formData.education.map(edu => ({
        ...edu,
        startDate: edu.startDate ? edu.startDate.toISOString().split('T')[0] : null,
        endDate: edu.endDate ? edu.endDate.toISOString().split('T')[0] : null
      })),
      workExperience: formData.workExperience.map(work => ({
        ...work,
        startDate: work.startDate ? work.startDate.toISOString().split('T')[0] : null,
        endDate: work.endDate ? work.endDate.toISOString().split('T')[0] : null
      })),
      projectExperience: formData.projectExperience.map(proj => ({
        ...proj,
        startDate: proj.startDate ? proj.startDate.toISOString().split('T')[0] : null,
        endDate: proj.endDate ? proj.endDate.toISOString().split('T')[0] : null
      })),
      skills: formData.skills
    };

    // 将JSON对象转换为字符串
    const resumeTextJson = JSON.stringify(resumeJson);
    setResumeText(resumeTextJson);
    setShowResumeForm(false);
  };

  // 渲染简历表单
  const renderResumeForm = () => {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
          填写简历信息
        </Typography>
        
        {/* 基本信息 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#FF6B35' }}>
            基本信息
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="姓名"
                value={formData.basicInfo.name}
                onChange={(e) => handleFormChange('basicInfo', null, 'name', e.target.value)}
                sx={{ input: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="电话"
                value={formData.basicInfo.phone}
                onChange={(e) => handleFormChange('basicInfo', null, 'phone', e.target.value)}
                sx={{ input: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="邮箱"
                value={formData.basicInfo.email}
                onChange={(e) => handleFormChange('basicInfo', null, 'email', e.target.value)}
                sx={{ input: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="求职意向"
                value={formData.basicInfo.jobIntention}
                onChange={(e) => handleFormChange('basicInfo', null, 'jobIntention', e.target.value)}
                sx={{ input: { color: 'white' } }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* 教育经历 */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FF6B35' }}>
              教育经历
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => addFormItem('education')}
              sx={{ color: '#FF6B35' }}
            >
              添加
            </Button>
          </Box>
          {formData.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid rgba(255, 107, 53, 0.3)', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="学校"
                    value={edu.school}
                    onChange={(e) => handleFormChange('education', index, 'school', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="专业"
                    value={edu.major}
                    onChange={(e) => handleFormChange('education', index, 'major', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="学历"
                    value={edu.degree}
                    onChange={(e) => handleFormChange('education', index, 'degree', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="开始时间"
                      value={edu.startDate}
                      onChange={(newValue) => handleFormChange('education', index, 'startDate', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ input: { color: 'white' } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="结束时间"
                      value={edu.endDate}
                      onChange={(newValue) => handleFormChange('education', index, 'endDate', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ input: { color: 'white' } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeFormItem('education', index)}
                  sx={{ mt: 1, color: '#ff4444' }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* 工作经历 */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FF6B35' }}>
              工作经历
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => addFormItem('workExperience')}
              sx={{ color: '#FF6B35' }}
            >
              添加
            </Button>
          </Box>
          {formData.workExperience.map((work, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid rgba(255, 107, 53, 0.3)', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="公司"
                    value={work.company}
                    onChange={(e) => handleFormChange('workExperience', index, 'company', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="职位"
                    value={work.position}
                    onChange={(e) => handleFormChange('workExperience', index, 'position', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="开始时间"
                      value={work.startDate}
                      onChange={(newValue) => handleFormChange('workExperience', index, 'startDate', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ input: { color: 'white' } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="结束时间"
                      value={work.endDate}
                      onChange={(newValue) => handleFormChange('workExperience', index, 'endDate', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ input: { color: 'white' } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="工作描述"
                    value={work.description}
                    onChange={(e) => handleFormChange('workExperience', index, 'description', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeFormItem('workExperience', index)}
                  sx={{ mt: 1, color: '#ff4444' }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* 项目经历 */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FF6B35' }}>
              项目经历
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => addFormItem('projectExperience')}
              sx={{ color: '#FF6B35' }}
            >
              添加
            </Button>
          </Box>
          {formData.projectExperience.map((proj, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid rgba(255, 107, 53, 0.3)', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="项目名称"
                    value={proj.name}
                    onChange={(e) => handleFormChange('projectExperience', index, 'name', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="担任角色"
                    value={proj.role}
                    onChange={(e) => handleFormChange('projectExperience', index, 'role', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="开始时间"
                      value={proj.startDate}
                      onChange={(newValue) => handleFormChange('projectExperience', index, 'startDate', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ input: { color: 'white' } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="结束时间"
                      value={proj.endDate}
                      onChange={(newValue) => handleFormChange('projectExperience', index, 'endDate', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ input: { color: 'white' } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="项目描述"
                    value={proj.description}
                    onChange={(e) => handleFormChange('projectExperience', index, 'description', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeFormItem('projectExperience', index)}
                  sx={{ mt: 1, color: '#ff4444' }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* 技能特长 */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#FF6B35' }}>
              技能特长
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => addFormItem('skills')}
              sx={{ color: '#FF6B35' }}
            >
              添加
            </Button>
          </Box>
          {formData.skills.map((skill, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid rgba(255, 107, 53, 0.3)', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="技能名称"
                    value={skill.skill}
                    onChange={(e) => handleFormChange('skills', index, 'skill', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="熟练程度"
                    value={skill.level}
                    onChange={(e) => handleFormChange('skills', index, 'level', e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeFormItem('skills', index)}
                  sx={{ mt: 1, color: '#ff4444' }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{
              backgroundColor: '#00fff2',
              color: '#020816',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 242, 0.8)',
              }
            }}
          >
            生成简历
          </Button>
        </Box> */}
      </Box>
    );
  };

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
          const res = await axios.get(`https://www.auto-resume.site/celery-task-status/${taskId}/`, {
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

  const handleNext = () => {
    if (activeStep === 2) {
      // 在进入下一步之前，将表单数据转换为JSON格式
      if (!file && !resumeText) {
        // 将表单数据转换为JSON格式
        const resumeJson = {
          basicInfo: formData.basicInfo,
          education: formData.education.map(edu => ({
            ...edu,
            startDate: edu.startDate ? edu.startDate.toISOString().split('T')[0] : null,
            endDate: edu.endDate ? edu.endDate.toISOString().split('T')[0] : null
          })),
          workExperience: formData.workExperience.map(work => ({
            ...work,
            startDate: work.startDate ? work.startDate.toISOString().split('T')[0] : null,
            endDate: work.endDate ? work.endDate.toISOString().split('T')[0] : null
          })),
          projectExperience: formData.projectExperience.map(proj => ({
            ...proj,
            startDate: proj.startDate ? proj.startDate.toISOString().split('T')[0] : null,
            endDate: proj.endDate ? proj.endDate.toISOString().split('T')[0] : null
          })),
          skills: formData.skills
        };

        // 将JSON对象转换为字符串
        const resumeTextJson = JSON.stringify(resumeJson);
        setResumeText(resumeTextJson);
      }
    }
    
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // 生成一个 8-13 秒的随机等待时间
      const waitTime = Math.floor(Math.random() * 5000) + 8000; // 8000-13000 毫秒
      
      // 模拟加载进度
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 10) + 1;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
      }, waitTime / 10);
      
      // 注释掉原有的后端调用代码
      /*
      const formData = new FormData();
      
      if (file) {
        formData.append('resume_file', file);
        formData.append('input_type', 'file');
      } else if (resumeText) {
        formData.append('resume_text', resumeText);
        formData.append('input_type', 'text');
      }
      
      if (selectedCategory) {
        formData.append('job_category', selectedCategory);
      }
      if (selectedJob) {
        formData.append('job_position', selectedJob);
      }
      if (customText) {
        formData.append('customized_info', customText);
      }

      const response = await axios.post('https://www.auto-resume.site/result/', formData);
      if (response.data.task_id) {
        pollTaskStatus(response.data.task_id);
      }
      */
      
      // 使用 setTimeout 模拟后端处理时间
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setLoading(false);
        
        // 直接跳转到结果页面，使用固定的图片 URL
        const mockImageUrl = 'https://auto-resume-storage.s3.us-east-2.amazonaws.com/processed.png';
        navigate(`/result?preview_html_url=${encodeURIComponent(mockImageUrl)}`);
      }, waitTime);
      
    } catch (error) {
      setError('提交失败，请重试');
      setLoading(false);
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
                  border: '1px solid rgba(255, 107, 53, 0.3)',
                  boxShadow: '0 0 20px rgba(255, 107, 53, 0.1)',
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#FF6B35',
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
                        border: '1px solid rgba(255, 107, 53, 0.2)',
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  backgroundColor: 'rgba(2, 8, 22, 0.8)',
                  border: '1px solid rgba(255, 107, 53, 0.3)',
                  boxShadow: '0 0 20px rgba(255, 107, 53, 0.1)',
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#FF6B35',
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
                        border: '1px solid rgba(255, 107, 53, 0.2)',
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
                      border: selectedCategory === category.id ? '2px solid #FF6B35' : '1px solid rgba(255, 107, 53, 0.3)',
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
                      <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>{category.name}</Typography>
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
                            borderColor: 'rgba(255, 107, 53, 0.3)',
                            color: selectedJob === job.value ? '#020816' : '#FF6B35',
                            height: '48px',
                            '&:hover': {
                              borderColor: 'rgba(255, 107, 53, 0.5)',
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              上传简历
                  </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={8}>
                <Card sx={{ 
                  backgroundColor: 'rgba(2, 8, 22, 0.8)',
                        border: '2px dashed rgba(255, 107, 53, 0.3)',
                        borderRadius: 2,
                  p: 3,
                        textAlign: 'center',
                  mb: 3,
                        '&:hover': {
                    borderColor: 'rgba(255, 107, 53, 0.5)',
                          backgroundColor: 'rgba(255, 107, 53, 0.05)',
                        }
                }}>
                      <input
                        accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="resume-file-upload"
                    type="file"
                        onChange={handleFileUpload}
                      />
                  <label htmlFor="resume-file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        borderColor: 'rgba(255, 107, 53, 0.5)',
                        color: '#FF6B35',
                        mb: 2,
                        '&:hover': {
                          borderColor: '#FF6B35',
                          backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        }
                      }}
                    >
                      选择文件
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    支持 PDF、Word 格式，最大 10MB
                        </Typography>

                  {file && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" sx={{ color: '#FF6B35', mb: 1 }}>
                        已选择文件: {file.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={removeFile}
                  sx={{ 
                          borderColor: 'rgba(255, 0, 0, 0.5)',
                          color: '#ff4444',
                          '&:hover': {
                            borderColor: '#ff4444',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                          }
                        }}
                      >
                        移除文件
                      </Button>
                    </Box>
                  )}
                </Card>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                  或者填写简历信息
                  </Typography>
                <Box sx={{ mt: 2 }}>
                  {renderResumeForm()}
                </Box>
              </Grid>
            </Grid>
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
                  backgroundColor: 'rgba(255, 107, 53, 0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 107, 53, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 107, 53, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B35',
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
            color: '#FF6B35',
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            textShadow: '0 0 10px rgba(255, 107, 53, 0.3)',
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
            <CircularProgress sx={{ color: '#FF6B35', mb: 2 }} />
            <Typography sx={{ color: '#FF6B35' }}>
              {progress > 0 ? `处理进度: ${progress}%` : '正在处理中...'}
            </Typography>
          </Box>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            上一步
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 1 && !selectedJob) ||
              loading
            }
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            下一步
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
