// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            // 向下滚动且不在顶部附近
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动或在顶部附近
            navbar.style.transform = 'translateY(0)';
            
            if (scrollTop > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // 服务卡片动画
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // 为所有服务卡片添加鼠标移动光效
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 套餐项目悬停效果增强
    const packageItems = document.querySelectorAll('.package-item');
    
    packageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            packageItems.forEach(other => {
                if (other !== item) {
                    other.classList.add('dimmed');
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            packageItems.forEach(other => {
                other.classList.remove('dimmed');
            });
        });
    });

    // 获取所有二维码图片并增强模态框
    const qrImages = document.querySelectorAll('.qr-code-area img');
    const modal = document.getElementById('qrModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    // 添加脉冲动画到二维码图片
    qrImages.forEach(img => {
        const pulseElement = document.createElement('div');
        pulseElement.classList.add('qr-pulse');
        img.parentNode.appendChild(pulseElement);
        pulseElement.style.position = 'absolute';
        pulseElement.style.width = '100%';
        pulseElement.style.height = '100%';
        pulseElement.style.top = '0';
        pulseElement.style.left = '0';
        pulseElement.style.zIndex = '-1';
        
        // 为每个二维码图片添加点击事件
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            
            // 添加额外的描述
            const imgDescription = this.nextElementSibling.textContent;
            const descriptionElement = document.getElementById('modalDescription');
            if (descriptionElement) {
                descriptionElement.textContent = imgDescription;
            }
            
            // 为模态框添加动画类
            setTimeout(() => {
                modal.classList.add('modal-open');
            }, 10);
        });
    });

    // 点击关闭按钮关闭模态框
    closeModal.addEventListener('click', function() {
        modal.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('modal-open');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    // 为高亮的价格添加脉冲动画
    const prices = document.querySelectorAll('.price, .price-tag');
    prices.forEach(price => {
        price.innerHTML = price.innerHTML.replace(/¥(\d+)/g, '<span class="price-value">¥$1</span>');
        
        const priceValues = price.querySelectorAll('.price-value');
        priceValues.forEach(value => {
            value.classList.add('price-pulse');
        });
    });
    
    // 价格显示动画
    const animatePrices = () => {
        const priceElements = document.querySelectorAll('.price, .price-tag');
        
        const priceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('price-revealed');
                }
            });
        }, {
            threshold: 0.5
        });
        
        priceElements.forEach(price => {
            priceObserver.observe(price);
        });
    };
    
    animatePrices();
    
    // 帮助类 - 将元素添加到类动画
    const addAnimatedClass = (selector, className, threshold = 0.2) => {
        const elements = document.querySelectorAll(selector);
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                }
            });
        }, { threshold });
        
        elements.forEach(element => {
            elementObserver.observe(element);
        });
    };
    
    // 添加动画到内容块
    addAnimatedClass('.content-block', 'content-animated');
    addAnimatedClass('.highlight-box', 'highlight-animated');
    
    // 使服务卡片标题有动画效果
    const cardTitles = document.querySelectorAll('.service-card h2');
    cardTitles.forEach(title => {
        title.classList.add('title-animated');
    });
    
    // 动画辅助类
    document.querySelectorAll('.animated').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // FAQ交互
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // 关闭所有其他问题
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // 切换当前问题的状态
            if (isActive) {
                this.classList.remove('active');
                answer.classList.remove('active');
            } else {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}); 