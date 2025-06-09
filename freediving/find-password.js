document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 요소 ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    const findPasswordForm = document.getElementById('findPasswordForm');

    // --- 테마 관리 ---
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('light-theme');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        }
        localStorage.setItem('theme', theme);
    }

    themeToggleBtn.addEventListener('click', () => {
        applyTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // --- 폼 제출 핸들러 ---
    findPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('findPasswordEmail').value;
        
        // 실제 앱에서는 여기서 서버와 통신하여 재설정 링크를 보냅니다.
        console.log('비밀번호 재설정 요청 이메일:', email);
        alert(`${email} 주소로 비밀번호 재설정 링크를 발송했습니다.`);
        findPasswordForm.reset();
    });
}); 