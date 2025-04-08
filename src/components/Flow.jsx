import React from 'react';
import { Box, Typography, Container, Tabs, Tab } from '@mui/material';

const Flow = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 15, mb: 10, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            color: '#00fff2',
            mb: 4,
            fontWeight: 700,
            textShadow: '0 0 10px rgba(0, 255, 242, 0.3)',
          }}
        >
          使用演示
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': {
              backgroundColor: '#00fff2',
            },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#00fff2',
              },
            },
          }}
        >
          <Tab label="简历优化" />
          <Tab label="智能分析" />
          <Tab label="导出预览" />
        </Tabs>

        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>  {/* 16:9 宽高比 */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '2px dashed rgba(0, 255, 242, 0.3)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(2, 8, 22, 0.6)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {value === 0 && (
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                简历优化演示视频
              </Typography>
            )}
            {value === 1 && (
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                智能分析演示视频
              </Typography>
            )}
            {value === 2 && (
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                导出预览演示视频
              </Typography>
            )}
          </Box>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            mt: 4,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          {value === 0 && "通过AI技术，智能优化您的简历内容，突出核心优势，提升简历质量。"}
          {value === 1 && "深度分析简历各个部分，提供专业的改进建议，帮助您打造完美简历。"}
          {value === 2 && "支持多种格式导出，随时预览效果，确保简历展示效果。"}
        </Typography>
      </Box>
    </Container>
  );
};

export default Flow; 