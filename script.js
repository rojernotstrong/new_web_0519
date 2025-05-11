document.addEventListener('DOMContentLoaded', () => {
    // 导航栏滚动效果
    let navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // 平滑滚动 - 只处理当前页面内的锚点链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.href.startsWith(window.location.href.split('#')[0])) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (document.querySelector(targetId)) {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
});