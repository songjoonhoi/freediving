document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 요소 ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    const findIdForm = document.getElementById('findIdForm');

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
    findIdForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('findIdName').value;
        const email = document.getElementById('findIdEmail').value;
        
        // 실제 앱에서는 여기서 서버와 통신하여 아이디를 찾습니다.
        console.log('아이디 찾기 정보:', { name, email });
        alert(`입력하신 정보로 아이디 찾기를 요청했습니다. 결과는 이메일로 안내됩니다.`);
        findIdForm.reset();
    });
}); 