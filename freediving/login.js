document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 요소 ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    
    const showLoginBtn = document.getElementById('showLoginBtn');
    const showSignupBtn = document.getElementById('showSignupBtn');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');

    const signupCertInput = document.getElementById('signupCert');
    const fileNameSpan = document.getElementById('file-name');

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // --- 사용자 데이터 헬퍼 함수 ---
    const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
    const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));
    const setCurrentUser = (email) => sessionStorage.setItem('currentUser', email);

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


    // --- 폼 전환 로직 ---
    function switchAuthForm(formToShow) {
        if (formToShow === 'login') {
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
            showLoginBtn.classList.add('active');
            showSignupBtn.classList.remove('active');
        } else {
            loginFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'block';
            showLoginBtn.classList.remove('active');
            showSignupBtn.classList.add('active');
        }
    }

    showLoginBtn.addEventListener('click', () => switchAuthForm('login'));
    showSignupBtn.addEventListener('click', () => switchAuthForm('signup'));


    // --- 회원가입 파일 입력 로직 ---
    signupCertInput.addEventListener('change', () => {
        if (signupCertInput.files.length > 0) {
            fileNameSpan.textContent = signupCertInput.files[0].name;
            fileNameSpan.style.color = 'var(--input-text-color)';
        } else {
            fileNameSpan.textContent = '파일을 선택하세요...';
            fileNameSpan.style.color = 'var(--text-muted-color)';
        }
    });


    // --- 폼 제출 핸들러 ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const users = getUsers();

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            setCurrentUser(user.email);
            alert(`${user.nickname}님, 환영합니다!`);
            window.location.href = 'index.html';
        } else {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    });

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const nickname = document.getElementById('signupNickname').value;
        const password = document.getElementById('signupPassword').value;
        let users = getUsers();

        if (users.some(user => user.email === email)) {
            alert('이미 사용 중인 이메일입니다.');
            return;
        }

        const newUser = {
            email,
            nickname,
            password, // 실제 앱에서는 비밀번호를 암호화해야 합니다.
            logs: []
        };
        
        users.push(newUser);
        saveUsers(users);
        setCurrentUser(email);

        alert(`${nickname}님, 회원가입이 완료되었습니다!`);
        window.location.href = 'index.html';
    });
}); 