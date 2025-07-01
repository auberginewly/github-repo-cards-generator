import React, { useState, useRef } from 'react';

// Lucide React Icons (for a modern look)
// You would typically import these from 'lucide-react'
// For this self-contained example, we'll define a simple icon component.
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const GitForkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-fork">
    <circle cx="12" cy="18" r="3"/>
    <circle cx="6" cy="6" r="3"/>
    <circle cx="18" cy="6" r="3"/>
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/>
    <path d="M12 12v3"/>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.54 2.46c-.92.92-1.38 2.12-1.38 3.32Z"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71c.92-.92 1.38-2.12 1.38-3.32Z"/>
  </svg>
);


// GitHub API Fetcher
const fetchGitHubRepo = async (username, repoName) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    if (!response.ok) {
      // If response is not OK (e.g., 404 Not Found), throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || `GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GitHub repo:", error);
    throw error; // Re-throw to be caught by the component
  }
};

// Repository Card Component
const RepoCard = React.forwardRef(({ repo }, ref) => { // Use forwardRef to pass ref to DOM element
  if (!repo) return null;

  // Format date
  const lastUpdated = new Date(repo.updated_at).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      ref={ref} 
      data-card-element="true"
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-md mx-auto transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        width: '100%',
        maxWidth: '28rem',
        margin: '0 auto',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        fontFeatureSettings: '"liga" 1, "kern" 1',
        textRendering: 'optimizeLegibility',
        webkitFontSmoothing: 'antialiased',
        mozOsxFontSmoothing: 'grayscale'
      }}
    >
      <h2 
        className="text-2xl font-bold text-gray-900 mb-2 truncate"
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
          letterSpacing: '-0.025em',
          fontFeatureSettings: '"liga" 1, "kern" 1',
          textRendering: 'optimizeLegibility'
        }}
      >
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline text-blue-600 flex items-center gap-2"
          style={{
            color: '#2563eb',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <LinkIcon className="w-6 h-6 text-blue-500" />
          {repo.name}
        </a>
      </h2>
      <p 
        className="text-gray-700 text-sm mb-4 line-clamp-3"
        style={{
          color: '#374151',
          fontSize: '0.875rem',
          marginBottom: '1rem',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {repo.description || '暂无描述。'}
      </p>

      <div 
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 text-sm mb-4"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem 1rem',
          color: '#4b5563',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}
      >
        {repo.stargazers_count !== undefined && (
          <div 
            className="flex items-center gap-1"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span>{repo.stargazers_count} Stars</span>
          </div>
        )}
        {repo.forks_count !== undefined && (
          <div 
            className="flex items-center gap-1"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <GitForkIcon className="w-4 h-4 text-green-500" />
            <span>{repo.forks_count} Forks</span>
          </div>
        )}
        {repo.language && (
          <div 
            className="flex items-center gap-1"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <CodeIcon className="w-4 h-4 text-purple-500" />
            <span>{repo.language}</span>
          </div>
        )}
        {repo.updated_at && (
          <div 
            className="flex items-center gap-1"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            <span>更新于 {lastUpdated}</span>
          </div>
        )}
      </div>

      <div 
        className="flex justify-end mt-4"
        style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}
      >
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontWeight: '500',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          查看 GitHub
        </a>
      </div>
    </div>
  );
});

// Main App Component
const App = () => {
  const [username, setUsername] = useState('');
  const [repoName, setRepoName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [inputMode, setInputMode] = useState('manual'); // 'manual' or 'url'
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingImage, setSavingImage] = useState(false);
  const repoCardRef = useRef(null); // Create a ref for the RepoCard component

  // Function to show a temporary message box
  const showMessage = (message, type = 'info') => {
    const messageBox = document.createElement('div');
    messageBox.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 3000); // Message disappears after 3 seconds
  };

  // Function to parse GitHub URL and extract username and repo name
  const parseGitHubUrl = (url) => {
    try {
      // Remove trailing slash and normalize URL
      const normalizedUrl = url.trim().replace(/\/$/, '');
      
      // Support various GitHub URL formats
      const patterns = [
        // https://github.com/username/repo
        /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)$/,
        // github.com/username/repo
        /^github\.com\/([^\/]+)\/([^\/]+)$/,
        // username/repo
        /^([^\/]+)\/([^\/]+)$/
      ];

      for (const pattern of patterns) {
        const match = normalizedUrl.match(pattern);
        if (match) {
          return {
            username: match[1],
            repoName: match[2]
          };
        }
      }
      
      throw new Error('无效的 GitHub 链接格式');
    } catch (error) {
      throw new Error('无法解析 GitHub 链接，请检查格式是否正确');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setRepoData(null); // Clear previous data
    
    let finalUsername = username;
    let finalRepoName = repoName;

    // If using URL mode, parse the GitHub URL
    if (inputMode === 'url') {
      if (!githubUrl.trim()) {
        setError('请输入 GitHub 仓库链接。');
        return;
      }
      
      try {
        const parsed = parseGitHubUrl(githubUrl);
        finalUsername = parsed.username;
        finalRepoName = parsed.repoName;
        
        // Update the manual input fields for display
        setUsername(finalUsername);
        setRepoName(finalRepoName);
      } catch (err) {
        setError(err.message);
        return;
      }
    } else {
      // Manual mode validation
      if (!finalUsername || !finalRepoName) {
        setError('请输入 GitHub 用户名和仓库名。');
        return;
      }
    }

    setLoading(true);
    try {
      const data = await fetchGitHubRepo(finalUsername, finalRepoName);
      setRepoData(data);
      showMessage('仓库信息获取成功！', 'success');
    } catch (err) {
      setError(`获取仓库信息失败: ${err.message}. 请检查用户名和仓库名是否正确。`);
      showMessage(`获取仓库信息失败: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsImage = async () => {
    if (!repoData) {
      showMessage('没有可保存的卡片。请先生成卡片。', 'error');
      return;
    }

    setSavingImage(true);
    try {
      // Ensure html2canvas is loaded
      if (typeof window.html2canvas === 'undefined') {
        showMessage('html2canvas 库未加载。请稍后再试。', 'error');
        setSavingImage(false);
        return;
      }

      console.log('开始创建截图专用卡片...', repoData);
      
      // 更彻底的字体加载等待
      await document.fonts.ready;
      
      // 额外等待，确保所有字体完全加载
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 强制加载 Inter 字体
      const interFont = new FontFace('Inter', 'url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)');
      try {
        await interFont.load();
        document.fonts.add(interFont);
      } catch (fontErr) {
        console.warn('Inter 字体加载失败，使用系统字体:', fontErr);
      }
      
      // 格式化日期
      const lastUpdated = new Date(repoData.updated_at).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // 创建一个临时的截图容器，使用更精确的字体配置
      const screenshotContainer = document.createElement('div');
      screenshotContainer.style.position = 'absolute';
      screenshotContainer.style.left = '-9999px';
      screenshotContainer.style.top = '0px';
      screenshotContainer.style.zIndex = '9999';
      screenshotContainer.style.background = '#ffffff';
      screenshotContainer.style.padding = '40px';
      screenshotContainer.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
      screenshotContainer.style.fontSize = '16px';
      screenshotContainer.style.lineHeight = '1.5';
      screenshotContainer.style.fontFeatureSettings = '"liga" 1, "kern" 1';
      screenshotContainer.style.fontVariantLigatures = 'common-ligatures';
      screenshotContainer.style.textRendering = 'optimizeLegibility';
      screenshotContainer.style.webkitFontSmoothing = 'antialiased';
      screenshotContainer.style.mozOsxFontSmoothing = 'grayscale';

      // 创建卡片 HTML，使用更精确的字体设置
      screenshotContainer.innerHTML = `
        <div style="
          background-color: #ffffff;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          width: 400px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          position: relative;
          font-feature-settings: 'liga' 1, 'kern' 1;
          font-variant-ligatures: common-ligatures;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        ">
          <!-- 标题区域 -->
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" style="flex-shrink: 0;">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.54 2.46c-.92.92-1.38 2.12-1.38 3.32Z"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71c.92-.92 1.38-2.12 1.38-3.32Z"/>
            </svg>
            <h2 style="
              font-size: 24px;
              font-weight: 700;
              color: #2563eb;
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: 1;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
              font-feature-settings: 'liga' 1, 'kern' 1;
              font-variant-ligatures: common-ligatures;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              letter-spacing: -0.025em;
            ">${repoData.name}</h2>
          </div>
          
          <!-- 描述 -->
          <p style="
            color: #374151;
            font-size: 14px;
            margin: 0 0 16px 0;
            line-height: 1.5;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-feature-settings: 'liga' 1, 'kern' 1;
            text-rendering: optimizeLegibility;
          ">${repoData.description || '暂无描述。'}</p>

          <!-- 统计信息 -->
          <div style="
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            color: #4b5563;
            font-size: 14px;
            margin-bottom: 16px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-feature-settings: 'liga' 1, 'kern' 1;
          ">
            ${repoData.stargazers_count !== undefined ? `
            <div style="display: flex; align-items: center; gap: 4px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span style="font-family: 'Inter', sans-serif;">${repoData.stargazers_count} Stars</span>
            </div>` : ''}
            
            ${repoData.forks_count !== undefined ? `
            <div style="display: flex; align-items: center; gap: 4px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                <circle cx="12" cy="18" r="3"/>
                <circle cx="6" cy="6" r="3"/>
                <circle cx="18" cy="6" r="3"/>
                <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/>
                <path d="M12 12v3"/>
              </svg>
              <span style="font-family: 'Inter', sans-serif;">${repoData.forks_count} Forks</span>
            </div>` : ''}
            
            ${repoData.language ? `
            <div style="display: flex; align-items: center; gap: 4px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <span style="font-family: 'Inter', sans-serif;">${repoData.language}</span>
            </div>` : ''}
          </div>

          ${repoData.updated_at ? `
          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
            color: #4b5563;
            font-size: 14px;
            margin-bottom: 16px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-feature-settings: 'liga' 1, 'kern' 1;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            <span style="font-family: 'Inter', sans-serif;">更新于 ${lastUpdated}</span>
          </div>` : ''}

          <!-- 按钮 -->
          <div style="display: flex; justify-content: flex-end;">
            <div style="
              display: inline-flex;
              align-items: center;
              padding: 8px 16px;
              background-color: #2563eb;
              color: #ffffff;
              font-weight: 500;
              border-radius: 8px;
              text-decoration: none;
              font-size: 14px;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
              font-feature-settings: 'liga' 1, 'kern' 1;
            ">查看 GitHub</div>
          </div>
        </div>
      `;

      // 将容器添加到页面
      document.body.appendChild(screenshotContainer);

      // 强制重排和重绘，确保字体完全加载
      void screenshotContainer.offsetHeight;
      void screenshotContainer.offsetWidth;
      
      // 等待更长时间，确保字体完全渲染
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 再次检查字体状态
      await document.fonts.ready;
      
      // 强制重新计算样式
      const titleElement = screenshotContainer.querySelector('h2');
      if (titleElement) {
        titleElement.style.display = 'none';
        void titleElement.offsetHeight;
        titleElement.style.display = 'block';
        void titleElement.offsetHeight;
      }

      console.log('开始截图...');

      // 截图配置 - 优化字体渲染
      const canvas = await window.html2canvas(screenshotContainer, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        removeContainer: true,
        width: 480, // 400 + 40*2 padding
        height: screenshotContainer.scrollHeight,
        windowWidth: 480,
        windowHeight: screenshotContainer.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        letterRendering: true,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        onclone: (clonedDoc) => {
          // 在克隆的文档中确保字体样式
          const clonedContainer = clonedDoc.querySelector('div');
          if (clonedContainer) {
            clonedContainer.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
            clonedContainer.style.fontFeatureSettings = '"liga" 1, "kern" 1';
            clonedContainer.style.textRendering = 'optimizeLegibility';
            clonedContainer.style.webkitFontSmoothing = 'antialiased';
            clonedContainer.style.mozOsxFontSmoothing = 'grayscale';
            
            // 特别处理标题元素
            const titleEl = clonedContainer.querySelector('h2');
            if (titleEl) {
              titleEl.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
              titleEl.style.fontWeight = '700';
              titleEl.style.fontSize = '24px';
              titleEl.style.letterSpacing = '-0.025em';
              titleEl.style.fontFeatureSettings = '"liga" 1, "kern" 1';
              titleEl.style.textRendering = 'optimizeLegibility';
            }
          }
        },
        scrollY: 0
      });

      // 清理临时容器
      document.body.removeChild(screenshotContainer);

      console.log('截图完成，画布尺寸:', {
        width: canvas.width,
        height: canvas.height
      });

      // 检查画布是否有效
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('生成的画布无效');
      }

      // 创建并下载图片
      const image = canvas.toDataURL('image/png', 1.0);
      
      // 验证图片数据
      if (image === 'data:,' || image.length < 100) {
        throw new Error('生成的图片数据无效');
      }

      const link = document.createElement('a');
      link.href = image;
      link.download = `${username}-${repoName}-github-card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showMessage('卡片已成功保存为图片！', 'success');
    } catch (err) {
      console.error("保存图片时出错:", err);
      showMessage(`保存图片失败: ${err.message}`, 'error');
    } finally {
      setSavingImage(false);
    }
  };

  // 简单的备用保存方法 - 优化字体加载
  const handleSimpleSave = async () => {
    if (!repoCardRef.current || !repoData) {
      showMessage('没有可保存的卡片。请先生成卡片。', 'error');
      return;
    }

    setSavingImage(true);
    try {
      if (typeof window.html2canvas === 'undefined') {
        showMessage('html2canvas 库未加载。请稍后再试。', 'error');
        setSavingImage(false);
        return;
      }

      console.log('开始简单模式截图...', repoCardRef.current);
      
      // 确保字体完全加载
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 强制加载 Inter 字体
      try {
        const interFont = new FontFace('Inter', 'url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap)');
        await interFont.load();
        document.fonts.add(interFont);
      } catch (fontErr) {
        console.warn('Inter 字体加载失败，使用系统字体:', fontErr);
      }
      
      // Get the card element
      const cardElement = repoCardRef.current;
      
      // 强制重排，确保字体完全渲染
      void cardElement.offsetHeight;
      void cardElement.offsetWidth;
      
      // 再等待一会确保渲染完成
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 优化的截图配置
      const canvas = await window.html2canvas(cardElement, {
        backgroundColor: '#ffffff',
        scale: 2, // 提高分辨率
        logging: false,
        useCORS: true,
        allowTaint: false,
        letterRendering: true,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        onclone: (clonedDoc) => {
          // 在克隆的文档中确保字体样式
          const clonedCard = clonedDoc.querySelector('[data-card-element]') || clonedDoc.querySelector('div');
          if (clonedCard) {
            clonedCard.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
            clonedCard.style.fontFeatureSettings = '"liga" 1, "kern" 1';
            clonedCard.style.textRendering = 'optimizeLegibility';
            clonedCard.style.webkitFontSmoothing = 'antialiased';
            clonedCard.style.mozOsxFontSmoothing = 'grayscale';
            
            // 特别处理标题元素
            const titleEl = clonedCard.querySelector('h2');
            if (titleEl) {
              titleEl.style.fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif';
              titleEl.style.fontWeight = '700';
              titleEl.style.fontSize = '24px';
              titleEl.style.letterSpacing = '-0.025em';
              titleEl.style.fontFeatureSettings = '"liga" 1, "kern" 1';
              titleEl.style.textRendering = 'optimizeLegibility';
            }
          }
        }
      });
      
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `${username}-${repoName}-simple.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showMessage('使用简单模式保存成功！', 'success');
    } catch (err) {
      console.error("简单保存失败:", err);
      showMessage(`简单保存失败: ${err.message}`, 'error');
    } finally {
      setSavingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 font-inter">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          GitHub 仓库介绍卡片生成器
        </h1>
        
        {/* 输入模式切换 */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => setInputMode('manual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'manual'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              手动输入
            </button>
            <button
              type="button"
              onClick={() => setInputMode('url')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'url'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              GitHub 链接
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          {inputMode === 'url' ? (
            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub 仓库链接:
              </label>
              <input
                type="text"
                id="githubUrl"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="例如: https://github.com/octocat/Hello-World 或 octocat/Hello-World"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                支持完整链接、简短链接或用户名/仓库名格式
              </p>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub 用户名:
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="例如: octocat"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="repoName" className="block text-sm font-medium text-gray-700 mb-1">
                  仓库名:
                </label>
                <input
                  type="text"
                  id="repoName"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="例如: Spoon-Knife"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? '加载中...' : '生成卡片'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
            <p className="font-bold">错误！</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {repoData && (
        <div className="w-full max-w-md flex flex-col items-center">
          <RepoCard repo={repoData} ref={repoCardRef} /> {/* Pass the ref to RepoCard */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveAsImage}
              className="flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={savingImage}
            >
              {savingImage ? '保存中...' : '保存为图片'}
            </button>
            <button
              onClick={handleSimpleSave}
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={savingImage}
            >
              {savingImage ? '保存中...' : '简单模式'}
            </button>
          </div>
        </div>
      )}

      {!repoData && !loading && !error && (
        <p className="text-gray-600 text-lg mt-8">
          输入 GitHub 用户名和仓库名，生成你的项目介绍卡片。
        </p>
      )}
    </div>
  );
};

export default App;
