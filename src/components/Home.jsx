import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Proof from './Proof';
import Flow from './Flow.jsx';

const Home = ({ translations }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // 对于移动设备，在组件加载后自动触发动画
  useEffect(() => {
    if (isMobile) {
      // 移动设备上自动轮播
      const interval = setInterval(() => {
        setIsHovered(prev => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);
  
  // 处理触摸事件
  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(prev => !prev);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          pt: 8,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: '#FF6B35',
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '2.5rem', md: '3.75rem' },
            textShadow: '0 0 10px rgba(255, 107, 53, 0.5)',
          }}
        >
          {translations.homeTitle}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 6,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            maxWidth: '800px',
          }}
        >
          {translations.homeDescription}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/editor')}
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            py: 2,
            px: 6,
            backgroundColor: '#FF6B35',
            color: '#020816',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 53, 0.8)',
            }
          }}
        >
          {translations.startButton}
        </Button>
      </Box>

      <Box sx={{ mt: 12 }}>
        <Proof />
      </Box>

      {/* 简历对比展示部分 */}
      <Box
        sx={{
          mt: 15,
          mb: 15,
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '400px', sm: '500px', md: '600px' },
          px: { xs: 2, sm: 4, md: 0 }, // 在小屏幕设备上添加内边距
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleTouchStart} // 点击切换，对移动端友好
        onTouchStart={handleTouchStart} // 触摸切换
      >

        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            color: '#FF6B35',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' },
          }}
        >
          简历优化
        </Typography>
        
        {isMobile && (
          <Typography
            variant="body2"
            align="center"
            sx={{
              mb: 2,
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.8rem',
            }}
          >
            点击图片查看优化效果
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: { xs: '500px', sm: '600px', md: '800px' },
            width: '100%',
          }}
        >
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: isHovered ? '25%' : 0,
              opacity: isHovered ? 0 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'absolute',
            }}
          >
            <Box
              sx={{
                width: { xs: '280px', sm: '350px', md: '500px' },
                height: { xs: '400px', sm: '500px', md: '700px' },
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
                p: 2,
              }}
            >
              <img
                src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/cover/origin.jpg"
                alt="原始简历"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  mt: 2,
                  color: '#FF6B35',
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                }}
              >
                原始简历
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ x: '-25%', opacity: 0 }}
            animate={{
              x: isHovered ? 0 : '-25%',
              opacity: isHovered ? 1 : 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.8
            }}
            style={{
              position: 'absolute',
            }}
          >
            <Box
              sx={{
                width: { xs: '280px', sm: '350px', md: '500px' },
                height: { xs: '400px', sm: '500px', md: '700px' },
                backgroundColor: 'rgba(2, 8, 22, 0.95)',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
                p: 2,
              }}
            >
              <img
                src="https://auto-resume-storage.s3.us-east-2.amazonaws.com/cover/modified.jpg"
                alt="优化后的简历"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  mt: 2,
                  color: '#FF6B35',
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                }}
              >
                优化后的简历
              </Typography>
            </Box>
          </motion.div>
        </Box>

        <Typography
          variant="body1"
          align="center"
          sx={{
            mt: 4,
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem',
          }}
        >
          将鼠标移入查看优化效果
        </Typography>
      </Box>

      {/* 校招信息表模块 */}
      <Box
        sx={{
          mt: 15, 
          mb: 15,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            color: '#FF6B35',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem' },
          }}
        >
          校招信息表
        </Typography>
        
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 4,
            color: 'rgba(255, 107, 53, 0.8)',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          汇总各大企业校招信息，助你高效备战秋招
        </Typography>
        
        {/* Material-UI 表格实现 */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            maxHeight: 400,
            background: 'rgba(2, 8, 22, 0.95)',
            border: '1px solid rgba(255, 107, 53, 0.3)',
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
            borderRadius: '8px',
            mb: 4,
            '&::-webkit-scrollbar': {
              height: '8px',
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 107, 53, 0.5)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '4px',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 107, 53, 0.5) rgba(255, 107, 53, 0.1)',
          }}
        >
          <Table stickyHeader aria-label="校招信息表">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 120
                  }}
                >
                  名称
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 100
                  }}
                >
                  行业
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 70
                  }}
                >
                  性质
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 100
                  }}
                >
                  录入时间
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 100
                  }}
                >
                  截止时间
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 200
                  }}
                >
                  岗位
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 100
                  }}
                >
                  地点
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 100
                  }}
                >
                  应届生
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 120
                  }}
                >
                  学历要求
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 100
                  }}
                >
                  公告链接
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: 'rgba(255, 107, 53, 0.2)', 
                    color: '#FF6B35',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255, 107, 53, 0.3)',
                    minWidth: 120
                  }}
                >
                  网申链接/邮箱
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {
                  name: '鑫钰科学习生招聘',
                  industry: '商务服务业',
                  type: '民企',
                  enterTime: '2025-06-11',
                  deadline: '尽快投递',
                  position: 'ESG业务助理/双碳业务助理/硬系统开发助理/新媒体运营助理',
                  location: '深圳',
                  fresh: '26/27/28届',
                  education: '本科/硕士/博士',
                  announcement: 'https://mp.weixin.qq.com/s/yj5oe7-v6XkZvYzSxY',
                  apply: 'annielin@syntekinno.com'
                },
                {
                  name: '新能源科技公司实习',
                  industry: '能源矿产电力化工',
                  type: '外企',
                  enterTime: '2025-06-11',
                  deadline: '尽快投递',
                  position: '维修工程师实习生/油气工程师实习生/地质工程实习生/海上工程实习生',
                  location: '天津/北京/成都/上海',
                  fresh: '26/27/28届',
                  education: '本科/硕士/博士',
                  announcement: 'https://mp.weixin.qq.com/s/BbpLur503jxA',
                  apply: 'https://www.slb.com/zh-cn/about/careers'
                },
                {
                  name: '学大教育暑期招聘',
                  industry: '教育培训科研',
                  type: '民企',
                  enterTime: '2025-06-11',
                  deadline: '尽快投递',
                  position: '中学授课教师 - 理工科类/中学授课教师 - 文科类/教育咨询师/学习管理师',
                  location: '北京',
                  fresh: '25/26届',
                  education: '大专/本科/硕士/博士',
                  announcement: 'https://edu.cn/frontpage/bit/html/recruitmentinfo',
                  apply: 'wei.cao2@xueda.com'
                },
                {
                  name: '中山康方生物医药',
                  industry: '医疗医药生物',
                  type: '民企',
                  enterTime: '2025-06-11',
                  deadline: '尽快投递',
                  position: '助理数据管理员/助理临床统计程序师/CTA 电话专员',
                  location: '广州/中山',
                  fresh: '25届',
                  education: '本科/硕士/博士',
                  announcement: 'https://job.dlut.edu.cn/frontpage/dlut/html/recruitmentinfo',
                  apply: 'hr@akesobio.com'
                },
                {
                  name: '大众集团战略咨询',
                  industry: '财税法律咨询事务所',
                  type: '外企',
                  enterTime: '2025-06-11',
                  deadline: '尽快投递',
                  position: '管理咨询团队暑期实习岗位',
                  location: '北京',
                  fresh: '26届',
                  education: '硕士及以上',
                  announcement: 'https://mp.weixin.qq.com/s/bL_ZpNoGZuPYfYcnRWpFqw',
                  apply: 'https://mp.weixin.qq.com/s/bL_ZpNoGZuPYfYcnRWpFqw'
                },
                {
                  name: '广船国际有限公司',
                  industry: '交运物流仓储',
                  type: '国企',
                  enterTime: '2025-06-11',
                  deadline: '2025-07-31',
                  position: '信息安全岗/智能制造岗/软件开发岗/能源管理岗/质量分析师/船舶管理岗/船舶设计发动/安全管理岗',
                  location: '广州',
                  fresh: '26届',
                  education: '硕士及以上',
                  announcement: 'https://www.iguopin.com/company/jobs',
                  apply: 'https://www.iguopin.com/company/jobs?id=106853862684362971'
                }
              ].map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      backgroundColor: 'rgba(255, 107, 53, 0.03)' 
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    },
                    color: 'white',
                  }}
                >
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.industry}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.type}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.enterTime}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.deadline}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.position}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.location}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.fresh}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    {row.education}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Box component="a" href="#" sx={{ color: '#FF6B35', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>查看</Box>
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'white', 
                      borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Box component="a" href="#" sx={{ color: '#FF6B35', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>查看</Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 107, 53, 0.5)',
              color: '#FF6B35',
              '&:hover': {
                borderColor: '#FF6B35',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
              },
              fontSize: { xs: '0.9rem', md: '1rem' },
              py: 1,
              px: 3
            }}
          >
            查看更多校招信息
          </Button>
        </Box>
      </Box>

      <Box>
        <Flow />
      </Box>
    </Container>
  );
};

export default Home;
