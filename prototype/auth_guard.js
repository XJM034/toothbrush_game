/**
 * 认证守卫 - 检查用户是否已登录
 * 在受保护的页面中引入此脚本，未登录用户将被重定向到登录页
 */
(function() {
    'use strict';
    
    // 检查登录状态
    const user = localStorage.getItem('brushing_user');
    
    if (!user) {
        // 未登录，跳转到登录页
        window.location.replace('login.html');
        return;
    }
    
    // 可选：验证用户数据格式
    try {
        const userData = JSON.parse(user);
        if (!userData.id || !userData.account) {
            throw new Error('Invalid user data');
        }
    } catch (e) {
        // 用户数据无效，清除并跳转登录
        localStorage.removeItem('brushing_user');
        window.location.replace('login.html');
        return;
    }
    
    // 登录验证通过，继续加载页面
    console.log('Auth guard: User authenticated');
})();
