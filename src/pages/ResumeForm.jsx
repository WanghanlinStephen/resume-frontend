import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ResumeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    basicInfo: {
      name: '',
      phone: '',
      email: '',
      linkedin: ''
    },
    education: [{
      school: '',
      major: '',
      degree: '',
      gpa: '',
      startDate: '',
      endDate: ''
    }],
    skills: '',
    workExperience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    projects: [{
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    awards: [{
      name: '',
      date: '',
      description: ''
    }],
    publications: [{
      title: '',
      date: '',
      description: ''
    }]
  });

  const handleBasicInfoChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: event.target.value
      }
    }));
  };

  const handleArrayFieldChange = (field, index, subField) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [subField]: event.target.value } : item
      )
    }));
  };

  const addArrayFieldItem = (field) => () => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], {}]
    }));
  };

  const removeArrayFieldItem = (field, index) => () => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // 将表单数据转换为JSON字符串
    const resumeText = JSON.stringify(formData);
    // 导航回简历编辑器页面，并传递数据
    navigate('/resume-editor', { state: { resumeText } });
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
          填写简历信息
        </Typography>

        <Paper sx={{ p: 4, backgroundColor: 'rgba(2, 8, 22, 0.8)' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            基础信息 *
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="姓名"
                value={formData.basicInfo.name}
                onChange={handleBasicInfoChange('name')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="电话"
                value={formData.basicInfo.phone}
                onChange={handleBasicInfoChange('phone')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="邮箱"
                value={formData.basicInfo.email}
                onChange={handleBasicInfoChange('email')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="LinkedIn"
                value={formData.basicInfo.linkedin}
                onChange={handleBasicInfoChange('linkedin')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'rgba(255, 255, 255, 0.9)',
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
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 53, 0.3)' }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            教育信息 *
          </Typography>
          {formData.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="学校"
                    value={edu.school}
                    onChange={handleArrayFieldChange('education', index, 'school')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="专业"
                    value={edu.major}
                    onChange={handleArrayFieldChange('education', index, 'major')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="学位"
                    value={edu.degree}
                    onChange={handleArrayFieldChange('education', index, 'degree')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="GPA"
                    value={edu.gpa}
                    onChange={handleArrayFieldChange('education', index, 'gpa')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    label="时间"
                    value={edu.startDate}
                    onChange={handleArrayFieldChange('education', index, 'startDate')}
                    placeholder="YYYY-MM - YYYY-MM"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={removeArrayFieldItem('education', index)}
                  sx={{ 
                    mt: 1,
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addArrayFieldItem('education')}
            sx={{ 
              mt: 1,
              color: '#FF6B35',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            添加教育经历
          </Button>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 53, 0.3)' }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            专业技能 *
          </Typography>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="专业技能"
            value={formData.skills}
            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                color: 'rgba(255, 255, 255, 0.9)',
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

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 53, 0.3)' }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            工作经历 *
          </Typography>
          {formData.workExperience.map((work, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="公司"
                    value={work.company}
                    onChange={handleArrayFieldChange('workExperience', index, 'company')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="职位"
                    value={work.position}
                    onChange={handleArrayFieldChange('workExperience', index, 'position')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="时间"
                    value={work.startDate}
                    onChange={handleArrayFieldChange('workExperience', index, 'startDate')}
                    placeholder="YYYY-MM - YYYY-MM"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={3}
                    label="工作描述"
                    value={work.description}
                    onChange={handleArrayFieldChange('workExperience', index, 'description')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={removeArrayFieldItem('workExperience', index)}
                  sx={{ 
                    mt: 1,
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addArrayFieldItem('workExperience')}
            sx={{ 
              mt: 1,
              color: '#FF6B35',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            添加工作经历
          </Button>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 53, 0.3)' }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            项目经历
          </Typography>
          {formData.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="项目名称"
                    value={project.name}
                    onChange={handleArrayFieldChange('projects', index, 'name')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="角色"
                    value={project.role}
                    onChange={handleArrayFieldChange('projects', index, 'role')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="时间"
                    value={project.startDate}
                    onChange={handleArrayFieldChange('projects', index, 'startDate')}
                    placeholder="YYYY-MM - YYYY-MM"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="项目描述"
                    value={project.description}
                    onChange={handleArrayFieldChange('projects', index, 'description')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={removeArrayFieldItem('projects', index)}
                  sx={{ 
                    mt: 1,
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addArrayFieldItem('projects')}
            sx={{ 
              mt: 1,
              color: '#FF6B35',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            添加项目经历
          </Button>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 53, 0.3)' }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            奖项
          </Typography>
          {formData.awards.map((award, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="奖项名称"
                    value={award.name}
                    onChange={handleArrayFieldChange('awards', index, 'name')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="日期"
                    value={award.date}
                    onChange={handleArrayFieldChange('awards', index, 'date')}
                    placeholder="YYYY-MM"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="描述"
                    value={award.description}
                    onChange={handleArrayFieldChange('awards', index, 'description')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={removeArrayFieldItem('awards', index)}
                  sx={{ 
                    mt: 1,
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addArrayFieldItem('awards')}
            sx={{ 
              mt: 1,
              color: '#FF6B35',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            添加奖项
          </Button>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 107, 53, 0.3)' }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#FF6B35' }}>
            发表文章
          </Typography>
          {formData.publications.map((pub, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="文章标题"
                    value={pub.title}
                    onChange={handleArrayFieldChange('publications', index, 'title')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="日期"
                    value={pub.date}
                    onChange={handleArrayFieldChange('publications', index, 'date')}
                    placeholder="YYYY-MM"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="描述"
                    value={pub.description}
                    onChange={handleArrayFieldChange('publications', index, 'description')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'rgba(255, 255, 255, 0.9)',
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
                </Grid>
              </Grid>
              {index > 0 && (
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={removeArrayFieldItem('publications', index)}
                  sx={{ 
                    mt: 1,
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  删除
                </Button>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addArrayFieldItem('publications')}
            sx={{ 
              mt: 1,
              color: '#FF6B35',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              }
            }}
          >
            添加发表文章
          </Button>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={() => navigate('/resume-editor')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              取消
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#FF6B35',
                color: '#020816',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.8)',
                }
              }}
            >
              提交
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResumeForm; 