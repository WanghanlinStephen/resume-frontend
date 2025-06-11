import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DownloadIcon from '@mui/icons-material/Download';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const steps = [
  {
    label: '选择目标岗位',
    description: '从多个职业领域中选择你的目标岗位，我们会根据不同岗位的要求来优化你的简历。',
    tips: [
      '选择最匹配的职业大类',
      '选择具体的细分岗位',
      '如果找不到完全匹配的岗位，可以选择"自定义岗位"'
    ],
    icon: <WorkIcon />
  },
  {
    label: '输入简历内容',
    description: '你可以直接粘贴简历文本，或上传已有的简历文件。',
    tips: [
      '支持文本直接粘贴',
      '支持PDF、Word格式上传',
      '建议包含完整的工作经历和项目经验'
    ],
    icon: <DescriptionIcon />
  },
  {
    label: '添加定制信息',
    description: '添加特定的职位要求或你想强调的技能点，帮助AI更好地理解你的需求。',
    tips: [
      '可以添加目标公司的具体要求',
      '突出你想强调的技能和经验',
      '描述你期望的职业发展方向'
    ],
    icon: <EditIcon />
  },
  {
    label: 'AI优化生成',
    description: 'AI助手会根据岗位要求和行业标准，优化你的简历内容和排版。',
    tips: [
      '智能优化语言表达',
      '突出与岗位相关的关键词',
      '优化项目经验的展示方式'
    ],
    icon: <AutoFixHighIcon />
  },
  {
    label: '下载成品',
    description: '预览优化后的简历，可以下载PDF或Word格式。',
    tips: [
      '支持在线预览',
      '可选择多种导出格式',
      '支持多次修改和重新生成'
    ],
    icon: <DownloadIcon />
  }
];

const UserGuide = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', textAlign: 'center', mb: 4 }}>
        使用指南
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          5分钟生成一份专业简历
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          按照以下步骤，轻松获得AI优化后的简历
        </Typography>
      </Box>

      <Stepper orientation="vertical" sx={{ 
        '& .MuiStepLabel-label': { color: 'rgba(255, 255, 255, 0.9)' },
        '& .MuiStepLabel-label.Mui-active': { color: '#FF6B35' },
        '& .MuiStepIcon-root': { color: 'rgba(255, 255, 255, 0.4)' },
        '& .MuiStepIcon-root.Mui-active': { color: '#FF6B35' },
        '& .MuiStepConnector-line': { borderColor: 'rgba(255, 255, 255, 0.2)' }
      }}>
        {steps.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel icon={step.icon}>
              <Typography variant="h6" sx={{ color: '#FF6B35' }}>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                  {step.description}
                </Typography>
                <Paper sx={{ 
                  p: 2, 
                  background: 'rgba(2, 8, 22, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}>
                  <List dense>
                    {step.tips.map((tip, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem>
                          <ListItemIcon>
                            <TipsAndUpdatesIcon sx={{ color: '#FF6B35' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={tip} 
                            sx={{ 
                              '& .MuiListItemText-primary': { 
                                color: 'rgba(255, 255, 255, 0.9)' 
                              } 
                            }} 
                          />
                        </ListItem>
                        {idx < step.tips.length - 1 && (
                          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default UserGuide; 