// --- 전역 변수 및 DOM 요소 ---
const poolListContainer = document.getElementById('pool-list');
const backToTopBtn = document.getElementById('backToTopBtn');
const searchInput = document.getElementById('searchInput');
const regionFilterSelect = document.getElementById('regionFilter');
const depthFilterSelect = document.getElementById('depthFilter');
const themeToggleBtn = document.getElementById('themeToggleBtn'); 
const themeToggleIcon = themeToggleBtn.querySelector('i');
const noPoolResultsMessage = document.getElementById('noPoolResultsMessage');

const modal = document.getElementById('poolModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalPoolImage = document.getElementById('modalPoolImage');
const modalPoolName = document.getElementById('modalPoolName');
const modalPoolLocation = document.getElementById('modalPoolLocation');
const modalPoolMaxDepth = document.getElementById('modalPoolMaxDepth');
const modalPoolDescription = document.getElementById('modalPoolDescription');
const modalPoolOperatingHours = document.getElementById('modalPoolOperatingHours');
const modalPoolReservationLink = document.getElementById('modalPoolReservationLink');

const showPoolFinderViewBtn = document.getElementById('showPoolFinderViewBtn');
const showLogbookViewBtn = document.getElementById('showLogbookViewBtn');
const poolFinderView = document.getElementById('poolFinderView');
const logbookView = document.getElementById('logbookView');

// 닉네임 관련 DOM 요소
const logbookMainTitle = document.getElementById('logbookMainTitle');
const editNicknameBtn = document.getElementById('editNicknameBtn');
const nicknameEditArea = document.getElementById('nicknameEditArea');
const nicknameInput = document.getElementById('nicknameInput');
const saveNicknameBtn = document.getElementById('saveNicknameBtn');
const cancelNicknameBtn = document.getElementById('cancelNicknameBtn');

const freedivingLogForm = document.getElementById('freedivingLogForm');
const logFormTitle = document.getElementById('logFormTitle');
const logEntryIdInput = document.getElementById('logEntryId');
const logDateInput = document.getElementById('logDate');
const logLocationInput = document.getElementById('logLocation');
const logDisciplineSelect = document.getElementById('logDiscipline');
const logPerformanceInput = document.getElementById('logPerformance');
const logUnitInput = document.getElementById('logUnit');
const logTimeFormattedInput = document.getElementById('logTimeFormatted');
const logNotesTextarea = document.getElementById('logNotes');
const saveLogBtn = document.getElementById('saveLogBtn');
const cancelEditLogBtn = document.getElementById('cancelEditLogBtn');
const logListContainer = document.getElementById('logListContainer');
const noLogsMessage = document.getElementById('noLogsMessage');

// 그래프 관련 DOM 요소
const graphDisciplineFilter = document.getElementById('graphDisciplineFilter');
const logChartCanvas = document.getElementById('logChart');
const noGraphDataMessage = document.getElementById('noGraphDataMessage');
let logChartInstance = null; // 차트 인스턴스 저장 변수

// --- 데이터 정의 ---
let poolsData = [ 
    { id: 1, name: "K-26 (가평)", location: "경기도 가평군", regionCategory: "경기북부", maxDepth: "26m", description: "아시아 최초, 최대 수심 26m의 다이빙 전용 풀. 다양한 수심 체험과 전문 강습 가능. VWT(Vertical Water Tunnel) 시설 보유.", image: "https://placehold.co/600x400/002244/99ccff?text=K-26+Freediving", altText: "K-26 프리다이빙 풀", operatingHours: "평일 10:00 - 21:00 / 주말 09:00 - 19:00", reservationLink: "https://k-26.com/" },
    { id: 2, name: "딥스테이션 (용인)", location: "경기도 용인시", regionCategory: "경기남부", maxDepth: "36m", description: "최대 수심 36m, 국내에서 가장 깊은 실내 다이빙 풀 중 하나. 다양한 수중 구조물과 첨단 시설.", image: "https://placehold.co/600x400/003366/bbeeff?text=Deep+Station", altText: "딥스테이션 프리다이빙 풀", operatingHours: "매일 08:00 - 23:00", reservationLink: "https://deepstation.kr/" },
    { id: 4, name: "올림픽공원 다이빙풀 (서울 송파)", location: "서울시 송파구", regionCategory: "서울", maxDepth: "5m", description: "국제 규격의 다이빙 시설. 프리다이빙 강습 및 연습 대관 가능 (사전 확인 필수).", image: "https://placehold.co/600x400/0284c7/e0f2fe?text=Olympic+Park+Diving", altText: "올림픽공원 다이빙풀", operatingHours: "대관 및 강습 일정 확인 (문의: 02-424-0735)", reservationLink: "https://4240735.modoo.at/" },
    { id: 5, name: "수원월드컵경기장 다이빙풀 (수원)", location: "경기도 수원시 팔달구", regionCategory: "경기남부", maxDepth: "5m", description: "월드컵경기장 내 스포츠아일랜드에 위치. 프리다이빙 강습 및 연습 가능.", image: "https://placehold.co/600x400/075985/a5f3fc?text=Suwon+World+Cup+Diving", altText: "수원월드컵경기장 다이빙풀", operatingHours: "스포츠센터 운영 시간 확인 필요 (문의: 031-259-2154)", reservationLink: "https://www.worldcupdivingpool.com/" },
    { id: 6, name: "성남종합운동장 다이빙풀 (아쿠아라인)", location: "경기도 성남시 중원구", regionCategory: "경기남부", maxDepth: "5m", description: "성남종합운동장 내 위치한 다목적풀(아쿠아라인). 프리다이빙 강습 및 연습 활용.", image: "https://placehold.co/600x400/0891b2/67e8f9?text=Seongnam+Sports+Complex", altText: "성남종합운동장 다이빙풀", operatingHours: "운영 시간 확인 및 예약 필요 (문의: 031-759-3111)", reservationLink: "https://aqualine.modoo.at/" },
    { id: 7, name: "파라다이브 (시흥)", location: "경기도 시흥시 거북섬", regionCategory: "경기남부", maxDepth: "35m", description: "최대 수심 35m의 대형 다이빙풀. 다양한 수중 체험 가능. 서해안 최초, 최대 규모.", image: "https://placehold.co/600x400/0e7490/99f6e4?text=Paradive+Siheung", altText: "파라다이브 시흥", operatingHours: "평일 10:00 - 21:00 / 주말 09:00 - 20:00 (변동 가능, 확인 필수)", reservationLink: "https://paradive.co.kr/" },
    { id: 8, name: "수작코리아 (고양)", location: "경기도 고양시 덕양구", regionCategory: "경기북부", maxDepth: "7m", description: "수중 스튜디오 및 다이빙 교육 시설. 드라마, 영화 수중 촬영지로도 유명.", image: "https://placehold.co/600x400/155e75/5eead4?text=Suzak+Korea", altText: "수작코리아 고양", operatingHours: "예약 및 문의 필수 (031-968-7777)", reservationLink: "http://www.suzax.com/" },
    { id: 9, name: "아르피아 스포츠센터 다이빙풀 (용인)", location: "경기도 용인시 수지구", regionCategory: "경기남부", maxDepth: "5m", description: "용인시 아르피아 타워 내 위치. 프리다이빙 및 스쿠버다이빙 가능.", image: "https://placehold.co/600x400/164e63/34d399?text=Arpia+Sports+Center", altText: "아르피아 스포츠센터 다이빙풀", operatingHours: "운영 시간 확인 및 예약 필요 (문의: 031-263-6581)", reservationLink: "https://arpiascubapool.modoo.at/" },
    { id: 10, name: "오산 스포츠파크 다이빙풀 (오산)", location: "경기도 오산시", regionCategory: "경기남부", maxDepth: "5m", description: "오산시 운영 스포츠 시설 내 다이빙풀. (구 테마잠수풀 가능성, 현 TSN 테마잠수풀)", image: "https://placehold.co/600x400/065f46/6ee7b7?text=Osan+Sports+Park", altText: "오산 스포츠파크 다이빙풀", operatingHours: "운영 시간 문의 및 예약 필수 (문의: 031-375-8029)", reservationLink: "https://www.t-sports.kr/" },
    { id: 12, name: "뉴서울 다이빙풀 (광명)", location: "경기도 광명시 하안동", regionCategory: "경기남부", maxDepth: "5m", description: "소규모 다이빙풀. 개인 연습 및 강습에 활용.", image: "https://placehold.co/600x400/064e3b/5eead4?text=New+Seoul+Diving", altText: "뉴서울 다이빙풀", operatingHours: "운영 시간 문의 (02-892-4943)", reservationLink: "http://www.scubapool.com/" },
    { id: 13, name: "메르 프리다이빙 (고양)", location: "경기도 고양시 일산동구", regionCategory: "경기북부", maxDepth: "5m", description: "프리다이빙 교육 센터. 회원제 또는 예약제로 운영될 수 있음.", image: "https://placehold.co/600x400/134e4a/2dd4bf?text=Mer+Freediving", altText: "메르 프리다이빙", operatingHours: "운영 시간 문의 및 예약 필수", reservationLink: "https://merdive.co.kr/" },
    { id: 14, name: "씨네블루 (파주)", location: "경기도 파주시 탄현면", regionCategory: "경기북부", maxDepth: "문의 필요", description: "수중 촬영 스튜디오 겸 다이빙풀. 특수 목적 이용 가능성.", image: "https://placehold.co/600x400/115e59/14b8a6?text=Cineblue+Paju", altText: "씨네블루 파주", operatingHours: "운영 시간 문의 및 예약 필수", reservationLink: "http://www.cineblue.co.kr/" },
    { id: 15, name: "송도스포츠파크 잠수풀 (인천)", location: "인천광역시 연수구", regionCategory: "인천", maxDepth: "5m", description: "인천환경공단 송도스포츠파크 내 잠수풀. 예약제로 운영되며, 프리다이빙 및 스쿠버다이빙 연습 가능.", image: "https://placehold.co/600x400/06b6d4/ffffff?text=송도스포츠파크", altText: "송도스포츠파크 잠수풀", operatingHours: "09:00 - 18:00 (월요일 휴관, 변동 가능성 있으니 확인 필요)", reservationLink: "https://ssp.eco-i.or.kr/reservation/dive/diving.asp?mNo=MC030000000" }
];
let freedivingLogs = [];
let currentNickname = '';

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
    // 그래프가 이미 그려져 있다면 테마에 맞게 다시 그리기
    if (logChartInstance && graphDisciplineFilter.value) {
        updateLogChart(graphDisciplineFilter.value);
    }
}
themeToggleBtn.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
});
const savedTheme = localStorage.getItem('theme') || 'dark';
// applyTheme(savedTheme); // 초기화 시점으로 이동

// --- 닉네임 관리 ---
function loadNickname() {
    currentNickname = localStorage.getItem('freediverNickname') || '';
    updateLogbookTitle();
}

function saveNickname(newNickname) {
    currentNickname = newNickname.trim();
    if (currentNickname.length > 10) { 
        currentNickname = currentNickname.substring(0, 10);
    }
    localStorage.setItem('freediverNickname', currentNickname);
    updateLogbookTitle();
    // 닉네임 변경 시 그래프도 다시 그릴 수 있도록 처리 (만약 그래프에 닉네임이 표시된다면)
    if (graphDisciplineFilter.value) {
        updateLogChart(graphDisciplineFilter.value);
    }
}

function updateLogbookTitle() {
    if (currentNickname) {
        logbookMainTitle.textContent = `${currentNickname}님의 프리다이빙 기록`;
    } else {
        logbookMainTitle.textContent = '나의 프리다이빙 기록';
    }
}

editNicknameBtn.addEventListener('click', () => {
    nicknameInput.value = currentNickname;
    nicknameEditArea.style.display = 'flex';
    logbookMainTitle.style.display = 'none'; 
    editNicknameBtn.style.display = 'none'; 
});

saveNicknameBtn.addEventListener('click', () => {
    const newNickname = nicknameInput.value;
    if (newNickname.trim() === "") {
        console.log("닉네임은 비워둘 수 없습니다."); 
        return;
    }
    saveNickname(newNickname);
    nicknameEditArea.style.display = 'none';
    logbookMainTitle.style.display = 'block'; 
    editNicknameBtn.style.display = 'inline-flex'; 
});

cancelNicknameBtn.addEventListener('click', () => {
    nicknameEditArea.style.display = 'none';
    logbookMainTitle.style.display = 'block'; 
    editNicknameBtn.style.display = 'inline-flex'; 
});


// --- 뷰 전환 로직 ---
function switchView(viewToShow) {
    poolFinderView.style.display = 'none';
    logbookView.style.display = 'none';
    showPoolFinderViewBtn.classList.remove('active');
    showLogbookViewBtn.classList.remove('active');

    if (viewToShow === 'poolFinder') {
        poolFinderView.style.display = 'block';
        showPoolFinderViewBtn.classList.add('active');
    } else if (viewToShow === 'logbook') {
        logbookView.style.display = 'block';
        showLogbookViewBtn.classList.add('active');
        loadNickname(); 
        loadAndRenderLogs(); 
        // 로그북 뷰로 전환 시, 선택된 종목이 있다면 그래프 업데이트
        if (graphDisciplineFilter.value) {
            updateLogChart(graphDisciplineFilter.value);
        } else {
            // 기본적으로 첫번째 유효한 종목으로 그래프를 그리거나, 안내 메시지 표시
            const firstValidDiscipline = freedivingLogs.length > 0 ? freedivingLogs[0].discipline : "";
            if (firstValidDiscipline && graphDisciplineFilter.querySelector(`option[value="${firstValidDiscipline}"]`)) {
                 graphDisciplineFilter.value = firstValidDiscipline;
                 updateLogChart(firstValidDiscipline);
            } else {
                noGraphDataMessage.style.display = 'block';
                logChartCanvas.style.display = 'none'; // 캔버스도 숨김
                if(logChartInstance) logChartInstance.destroy(); // 기존 차트 제거
            }
        }
    }
}
showPoolFinderViewBtn.addEventListener('click', () => switchView('poolFinder'));
showLogbookViewBtn.addEventListener('click', () => switchView('logbook'));


// --- 풀장 찾기 로직 (기존과 동일) ---
function getNumericDepth(depthString) { 
    if (typeof depthString !== 'string' || depthString.toLowerCase().includes('문의')) return 0;
    const match = depthString.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
}
function sortPools(poolsToSort) { 
    const topOrderNames = ["딥스테이션 (용인)", "K-26 (가평)", "올림픽공원 다이빙풀 (서울 송파)", "수작코리아 (고양)"];
    let topPoolsInOrder = []; 
    let otherPools = [];
    topOrderNames.forEach(name => { 
        const pool = poolsToSort.find(p => p.name === name); 
        if (pool) topPoolsInOrder.push(pool); 
    });
    otherPools = poolsToSort.filter(p => !topOrderNames.includes(p.name));
    otherPools.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    return [...topPoolsInOrder, ...otherPools];
}
function applyPoolFiltersAndSearch() { 
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionFilterSelect.value;
    const selectedDepthCategory = depthFilterSelect.value;
    let filteredPools = poolsData.filter(pool => {
        const nameMatch = pool.name.toLowerCase().includes(searchTerm);
        const locationMatch = pool.location.toLowerCase().includes(searchTerm);
        if (!(nameMatch || locationMatch)) return false;
        if (selectedRegion !== "all" && pool.regionCategory !== selectedRegion) return false;
        const depth = getNumericDepth(pool.maxDepth);
        if (selectedDepthCategory !== "all") {
            if (selectedDepthCategory === "5" && depth > 5) return false;
            if (selectedDepthCategory === "10" && (depth <= 5 || depth > 10)) return false;
            if (selectedDepthCategory === "20" && (depth <= 10 || depth > 20)) return false;
            if (selectedDepthCategory === "21" && depth <= 20) return false;
        }
        return true;
    });
    const sortedAndFilteredPools = sortPools(filteredPools);
    renderPools(sortedAndFilteredPools);
}
function renderPools(poolsToRender) { 
    poolListContainer.innerHTML = ''; 
    if (poolsToRender.length === 0) { 
        noPoolResultsMessage.style.display = 'block'; 
        return; 
    }
    noPoolResultsMessage.style.display = 'none';
    poolsToRender.forEach(pool => {
        const poolCard = document.createElement('div');
        poolCard.className = 'pool-card rounded-xl shadow-lg overflow-hidden p-6 cursor-pointer'; 
        poolCard.addEventListener('click', () => openPoolModal(pool)); 
        const cardContent = document.createElement('div');
        cardContent.className = 'pool-card-content';
        cardContent.innerHTML = `
            <img src="${pool.image}" alt="${pool.altText}" onerror="this.onerror=null; this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Available';" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-semibold header-title mb-2">${pool.name}</h3>
            <div class="text-sm mb-3 space-y-1" style="color: var(--text-color);">
                <p><i class="fas fa-map-marker-alt info-icon"></i>위치: ${pool.location}</p>
                <p><i class="fas fa-ruler-vertical info-icon"></i>최대 수심: ${pool.maxDepth}</p>
            </div>
            <hr class="section-divider">
            <p class="text-sm my-3 line-clamp-3" style="color: var(--text-color);">${pool.description}</p>
            <hr class="section-divider">
            <div class="my-3">
                <h4 class="text-md font-semibold mb-1" style="color: var(--header-subtitle-color);">운영 시간:</h4>
                <p class="text-sm" style="color: var(--text-color);">${pool.operatingHours}</p>
                <p class="disclaimer-text">참고: 각 풀의 최신 정보(운영 시간, 요금, 예약 방법 등)는 방문 전에 반드시 공식 채널을 통해 확인해 주시기 바랍니다.</p>
            </div>`;
        const actionButton = document.createElement('a');
        actionButton.href = pool.reservationLink; 
        actionButton.target = "_blank"; 
        actionButton.rel = "noopener noreferrer";
        actionButton.className = "action-button text-white font-bold py-2 px-4 rounded-lg shadow-md text-center";
        actionButton.innerHTML = `<i class="fas fa-external-link-alt external-link-icon"></i>예약 및 상세 정보`;
        actionButton.onclick = (e) => e.stopPropagation();
        poolCard.appendChild(cardContent); 
        poolCard.appendChild(actionButton); 
        poolListContainer.appendChild(poolCard);
    });
}
function openPoolModal(pool) { 
    modalPoolImage.src = pool.image; 
    modalPoolImage.alt = pool.altText;
    modalPoolName.textContent = pool.name; 
    modalPoolLocation.textContent = pool.location;
    modalPoolMaxDepth.textContent = pool.maxDepth; 
    modalPoolDescription.textContent = pool.description;
    modalPoolOperatingHours.textContent = pool.operatingHours; 
    modalPoolReservationLink.href = pool.reservationLink;
    modal.classList.add('active'); 
    document.body.style.overflow = 'hidden';
}
function closePoolModal() { 
    modal.classList.remove('active'); 
    document.body.style.overflow = '';
}
modalCloseBtn.addEventListener('click', closePoolModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closePoolModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('active')) closePoolModal(); });
searchInput.addEventListener('input', applyPoolFiltersAndSearch);
regionFilterSelect.addEventListener('change', applyPoolFiltersAndSearch);
depthFilterSelect.addEventListener('change', applyPoolFiltersAndSearch);


// --- 로그북 로직 ---
function saveLogsToLocalStorage() {
    localStorage.setItem('freedivingLogs', JSON.stringify(freedivingLogs));
    // 로그 저장 시 그래프 업데이트 (선택된 종목이 있다면)
    if (graphDisciplineFilter.value) {
        updateLogChart(graphDisciplineFilter.value);
    }
}

function loadLogsFromLocalStorage() {
    const storedLogs = localStorage.getItem('freedivingLogs');
    if (storedLogs) {
        freedivingLogs = JSON.parse(storedLogs);
    } else {
        freedivingLogs = [];
    }
}

function renderFreedivingLogs() {
    logListContainer.innerHTML = '';
    if (freedivingLogs.length === 0) {
        noLogsMessage.style.display = 'block';
        return;
    }
    noLogsMessage.style.display = 'none';

    const sortedLogs = [...freedivingLogs].sort((a,b) => new Date(b.date) - new Date(a.date));

    sortedLogs.forEach(log => {
        const logCard = document.createElement('div');
        logCard.className = 'log-card rounded-lg shadow-md p-4'; 
        const nicknamePrefix = currentNickname ? `${currentNickname}님 ` : '';
        logCard.innerHTML = `
            <div class="log-card-content">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="text-lg font-semibold header-title">${log.discipline} - ${log.location}</h3>
                        <p class="text-sm text-muted-color">${new Date(log.date).toLocaleDateString('ko-KR')}</p>
                    </div>
                    <div class="action-button-group flex gap-2">
                        <button class="btn-edit p-1 rounded" onclick="editLogEntry('${log.id}')" title="수정"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete p-1 rounded" onclick="deleteLogEntry('${log.id}')" title="삭제"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <p class="text-xl font-bold" style="color: var(--text-color);">
                   ${nicknamePrefix}기록: ${log.performance || ''} ${log.unit || ''} ${log.timeFormatted ? `(${log.timeFormatted})` : ''}
                </p>
                ${log.notes ? `<hr class="section-divider my-2"><p class="text-sm mt-1" style="color: var(--text-color); white-space: pre-wrap;">메모: ${log.notes}</p>` : ''}
            </div>
        `;
        logListContainer.appendChild(logCard);
    });
}

function resetLogForm() {
    freedivingLogForm.reset();
    logEntryIdInput.value = '';
    logFormTitle.textContent = '새 기록 추가';
    saveLogBtn.innerHTML = '<i class="fas fa-save"></i> 기록 저장';
    cancelEditLogBtn.style.display = 'none';
    logDateInput.valueAsDate = new Date(); 
}

freedivingLogForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const logData = {
        id: logEntryIdInput.value || 'log_' + Date.now(), 
        date: logDateInput.value,
        location: logLocationInput.value,
        discipline: logDisciplineSelect.value,
        performance: parseFloat(logPerformanceInput.value), // 숫자로 저장
        unit: logUnitInput.value,
        timeFormatted: logTimeFormattedInput.value || '',
        notes: logNotesTextarea.value,
    };

    if (!logData.date || !logData.location || !logData.discipline || isNaN(logData.performance)) {
        console.log("필수 입력 항목을 모두 채워주세요 (날짜, 장소, 종목, 기록)."); // alert 대신 console 사용
        return;
    }

    if (logEntryIdInput.value) { 
        const index = freedivingLogs.findIndex(log => log.id === logEntryIdInput.value);
        if (index > -1) {
            freedivingLogs[index] = logData;
        }
    } else { 
        freedivingLogs.push(logData);
    }
    
    saveLogsToLocalStorage(); // 이 함수 내부에서 그래프 업데이트 호출
    renderFreedivingLogs();
    resetLogForm();
});

cancelEditLogBtn.addEventListener('click', resetLogForm);

window.editLogEntry = function(logId) { 
    const logToEdit = freedivingLogs.find(log => log.id === logId);
    if (logToEdit) {
        logFormTitle.textContent = '기록 수정';
        logEntryIdInput.value = logToEdit.id;
        logDateInput.value = logToEdit.date;
        logLocationInput.value = logToEdit.location;
        logDisciplineSelect.value = logToEdit.discipline;
        logPerformanceInput.value = logToEdit.performance;
        logUnitInput.value = logToEdit.unit;
        logTimeFormattedInput.value = logToEdit.timeFormatted;
        logNotesTextarea.value = logToEdit.notes;
        saveLogBtn.innerHTML = '<i class="fas fa-check"></i> 수정 완료';
        cancelEditLogBtn.style.display = 'inline-block';
        // Scroll to form for better UX on mobile
        const logFormContainer = document.querySelector('.log-form-container');
        if (logFormContainer) {
            logFormContainer.scrollIntoView({ behavior: 'smooth' }); 
        }
    }
}

window.deleteLogEntry = function(logId) { 
    console.log(`삭제 시도: ${logId}. 실제 앱에서는 확인창을 사용하세요.`);
    freedivingLogs = freedivingLogs.filter(log => log.id !== logId);
    saveLogsToLocalStorage(); // 이 함수 내부에서 그래프 업데이트 호출
    renderFreedivingLogs();
    resetLogForm(); 
}

function loadAndRenderLogs() {
    loadLogsFromLocalStorage();
    renderFreedivingLogs();
}

// --- 그래프 로직 ---
function updateLogChart(discipline) {
    if (logChartInstance) {
        logChartInstance.destroy(); 
    }

    if (!discipline) {
        noGraphDataMessage.style.display = 'block';
        logChartCanvas.style.display = 'none';
        return;
    }

    const disciplineLogs = freedivingLogs
        .filter(log => log.discipline === discipline && !isNaN(parseFloat(log.performance)))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); 

    if (disciplineLogs.length < 2) { 
        noGraphDataMessage.style.display = 'block';
        logChartCanvas.style.display = 'none';
        return;
    }

    noGraphDataMessage.style.display = 'none';
    logChartCanvas.style.display = 'block';

    const labels = disciplineLogs.map(log => new Date(log.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }));
    const data = disciplineLogs.map(log => parseFloat(log.performance));
    
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const gridColor = currentTheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)';
    const ticksColor = currentTheme === 'light' ? '#374151' : '#e0f2fe'; 
    const pointBackgroundColor = currentTheme === 'light' ? '#2563eb' : '#60a5fa'; 
    const borderColor = pointBackgroundColor;


    logChartInstance = new Chart(logChartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${discipline} 기록 (${disciplineLogs[0]?.unit || '단위 없음'})`, 
                data: data,
                borderColor: borderColor,
                backgroundColor: borderColor, 
                tension: 0.1,
                fill: false,
                pointBackgroundColor: pointBackgroundColor,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false, 
                    grid: { color: gridColor },
                    ticks: { color: ticksColor, font: { family: "'Inter', sans-serif" } }
                },
                x: {
                    grid: { color: gridColor },
                    ticks: { color: ticksColor, font: { family: "'Inter', sans-serif" } }
                }
            },
            plugins: {
                legend: {
                    labels: { 
                        color: ticksColor,
                        font: { family: "'Inter', sans-serif", size: 14 }
                    }
                },
                tooltip: {
                    titleFont: { family: "'Inter', sans-serif" },
                    bodyFont: { family: "'Inter', sans-serif" },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label = label.split(' (')[0]; // 단위 부분 제외하고 종목 이름만 가져오기
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + ` ${disciplineLogs[context.dataIndex]?.unit || ''}`;
                            }
                            if (disciplineLogs[context.dataIndex]?.timeFormatted) {
                                label += ` (${disciplineLogs[context.dataIndex].timeFormatted})`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

graphDisciplineFilter.addEventListener('change', (event) => {
    updateLogChart(event.target.value);
});


// --- "맨 위로 가기" 버튼 (공통) ---
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};
backToTopBtn.onclick = function() { window.scrollTo({top: 0, behavior: 'smooth'}); };

// --- 초기화 ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(savedTheme); 
    loadNickname(); 
    switchView('poolFinder'); 
    applyPoolFiltersAndSearch(); 
    logDateInput.valueAsDate = new Date(); 
});

