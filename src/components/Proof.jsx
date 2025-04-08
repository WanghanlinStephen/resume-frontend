import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Proof = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        {/* 为什么选择我们 */}
        <Box sx={{ mb: 15 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#00fff2',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(0, 255, 242, 0.3)',
            }}
          >
            为什么选择我们
          </Typography>

          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              mb: 6,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            数千名求职者的共同选择，AI驱动的简历优化专家
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 8,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}
          >
            我们的AI模型经过大量真实简历数据训练，深入理解各个岗位的要求，能够精准提炼您的专业优势，让简历脱颖而出。
          </Typography>

          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#00fff2',
              fontWeight: 600,
            }}
          >
            我们的服务
          </Typography>

          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                width: '300px',
                p: 3,
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                border: '1px solid rgba(0, 255, 242, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  mb: 2,
                  color: '#00fff2',
                }}
              >
                智能简历生成
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                智能生成，一键打造高质量简历
              </Typography>
            </Box>

            <Box
              sx={{
                width: '300px',
                p: 3,
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                border: '1px solid rgba(0, 255, 242, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  mb: 2,
                  color: '#00fff2',
                }}
              >
                一岗一简
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                每一个岗位都有不同需求，通过智能解析JD，自动生成与之高度匹配的简历。
                每一投，都是精准命中。
              </Typography>
            </Box>

            <Box
              sx={{
                width: '300px',
                p: 3,
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                border: '1px solid rgba(0, 255, 242, 0.3)',
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
              }}
            >
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  mb: 2,
                  color: '#00fff2',
                }}
              >
                深度优化分析
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                亮点提炼，专业优化建议助你脱颖而出
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Proof; 